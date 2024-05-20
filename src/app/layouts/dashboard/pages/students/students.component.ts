import { Component, OnInit } from '@angular/core';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentService } from './students.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { StudentActions } from './store/student.actions';
import { Observable, map } from 'rxjs';
import {
  selectIsloading,
  selectStudentError,
  selectStudentList,
} from './store/student.selectors';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'email',
    'role',
    'createdAt',
    'actions',
  ];

  // loading = false;
  students$: Observable<IStudent[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<Error>;

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentService,
    private store: Store
  ) {
    this.isLoading$ = this.store.select(selectIsloading);
    this.students$ = this.store.select(selectStudentList);
    this.error$ = this.store
      .select(selectStudentError)
      .pipe(map((err) => err as Error));
  }
  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadStudents());
  }
  createdStudent(student: IStudent): void {
    this.store.dispatch(StudentActions.createStudent({ payload: student }));
  }
  deleteStudentById(id: string): void {
    Swal.fire({
      icon: 'question',
      html: 'Estas seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(StudentActions.deleteStudentByID({ id }));
      }
    });
  }

  updateStudentById(id: string, data: IStudent): void {
    this.store.dispatch(StudentActions.updateStudentByID({ id, data }));
  }

  openDialog(editingStudent?: IStudent): void {
    this.matDialog
      .open(StudentDialogComponent, {
        data: editingStudent,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if (editingStudent) {
              this.updateStudentById(editingStudent.id, result);
            } else {
              result.createdAt = new Date();
              this.createdStudent(result);
            }
          }
        },
      });
  }

  
}

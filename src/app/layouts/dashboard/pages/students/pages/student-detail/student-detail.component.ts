import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../students.service';
import { Observable, finalize } from 'rxjs';
import { IStudent } from '../../models';
import { ClassesServices } from '../../../classes/classes.service';
import { IClass } from '../../../classes/models';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ClassActions } from '../../../classes/store/class.actions';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent {
  student$: Observable<IStudent | undefined>;
  loading = false;
  classes$: Observable<IClass[]>;
  displayedColumns: string[] = ['id', 'courseName', 'actions'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private classesService: ClassesServices,
    private store:Store
  ) {
    this.loading = true;

    this.classes$ = this.classesService.getClassesByStudentId(
      this.activatedRoute.snapshot.params['idStudent']
    );

    this.student$ = this.studentService
      .getStudentById(this.activatedRoute.snapshot.params['idStudent'])
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      );
  }
  deleteClassById(id: string): void {
    Swal.fire({
      icon: 'question',
      html: 'Estas seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(ClassActions.deleteClassByID({ id }));
      }
    });
  }
}

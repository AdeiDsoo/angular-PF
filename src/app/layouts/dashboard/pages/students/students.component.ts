import { Component, OnInit } from '@angular/core';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentService } from './students.service';
import Swal from 'sweetalert2';

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

  loading = false;
  students: IStudent[] = [];

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentService
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (value) => {
        this.students = value;
      },
      error: (err) => {
        Swal.fire('Error', 'Ocurrrio un error', 'error');
      },
      complete: () => {
        this.loading = false;
      },
    });
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
              this.students = this.students.map((student) =>
                student.id === editingStudent.id
                  ? { ...student, ...result }
                  : student
              );
            } else {
              result.createdAt = new Date();
              this.studentService.createdStudent(result).subscribe({
                next: (student) => {
                  this.students = [...this.students, student];
                },
              });
              // this.students = [...this.students, result];
            }
          }
        },
      });
  }

  onDeleteUser(id: string): void {
    if (confirm('Estas seguro de eliminar este usuario?')) {
      this.studentService.deletedStudent(id).subscribe({
        next: (deletedStudent) => {
          if (deletedStudent) {
            this.students = this.students.filter(
              (student) => student.id.toString() !== id
            );
          } else {
            console.error('No se pudo eliminar el estudiante con ID:', id);
          }
        },
        error: (err) => {
          console.error('Error al eliminar estudiante:', err);
        },
      });
    }
  }
}

import { Component } from '@angular/core';
import { IStudent } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  displayedColumns: string[] = [
    'id',
    'firstName',
  
    'email',
    'role',
    'createdAt',
    'actions',
  ];

  students: IStudent[] = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Lopez',
      email: 'jLopez@mail.com',
      role: 'USER',
      createdAt: new Date(),
    },
    {
      id: 2,
      firstName: 'Michi',
      lastName: 'Quimichi',
      email: 'mQuimichi@mail.com',
      role: 'ADMIN',
      createdAt: new Date(),
    },
    {
      id: 3,
      firstName: 'Luna',
      lastName: 'Cabañas',
      email: 'lCabañas@mail.com',
      role: 'USER',
      createdAt: new Date(),
    },
  ];
  constructor(private matDialog: MatDialog) {}
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
              result.id = this.students.length
                ? this.students[this.students.length - 1].id + 1
                : 1;
              result.createdAt = new Date();
              this.students = [...this.students, result];
            }
          }
        },
      });
  }

  onDeleteUser(id: number): void {
    if (confirm('Estas seguro de eliminar este usuario?')) {
      this.students = this.students.filter((u) => u.id != id);
    }
  }
}

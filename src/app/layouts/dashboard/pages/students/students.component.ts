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
    'lastName',
    'email',
    'createdAt',
  ];

  students: IStudent[] = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Lopez',
      email: 'jLopez@mail.com',
      createdAt: new Date(),
    },
    {
      id: 2,
      firstName: 'Michi',
      lastName: 'Quimichi',
      email: 'mQuimichi@mail.com',
      createdAt: new Date(),
    },
    {
      id: 3,
      firstName: 'Luna',
      lastName: 'Cabañas',
      email: 'lCabañas@mail.com',
      createdAt: new Date(),
    },
  ];

  constructor(private matDialog: MatDialog) {}
  openDialog(): void {
    this.matDialog.open(StudentDialogComponent);
  }
}

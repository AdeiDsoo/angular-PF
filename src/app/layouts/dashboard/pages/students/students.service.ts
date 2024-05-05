import { Injectable } from '@angular/core';
import { CreateStudentPayload, IStudent } from './models';
import { of, Observable, delay, throwError, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

// const STUDENTS_DB: IStudent[] = [
//   {
//     id: 1,
//     firstName: 'Sandia',
//     lastName: 'Lopez',
//     email: 'jLopez@mail.com',
//     role: 'USER',
//     createdAt: new Date(),
//   },
//   {
//     id: 2,
//     firstName: 'Michi',
//     lastName: 'Quimichi',
//     email: 'mQuimichi@mail.com',
//     role: 'ADMIN',
//     createdAt: new Date(),
//   },
//   {
//     id: 3,
//     firstName: 'Luna',
//     lastName: 'Cabañas',
//     email: 'lCabañas@mail.com',
//     role: 'USER',
//     createdAt: new Date(),
//   },
// ];

@Injectable({ providedIn: 'root' })
export class StudentService {
  constructor(private httpClient: HttpClient) {}
  getStudents(): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>(environment.baseAPIURL +'/students');
  }

  getStudentById(id: string): Observable<IStudent | undefined> {
  
    return this.httpClient.get<IStudent>(
      environment.baseAPIURL +'/students/' + id
    );
  }

  createdStudent(payload:CreateStudentPayload ):Observable<IStudent>{
    return this.httpClient.post<IStudent>(
      environment.baseAPIURL + '/students/', { ...payload } 
    );
  }

  deletedStudent(id:string):Observable<IStudent|undefined >{
    return this.httpClient.delete<IStudent>(
      environment.baseAPIURL + '/students/' + id
    );
  }

 
}

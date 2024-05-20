import { Injectable } from '@angular/core';
import { CreateStudentPayload, IStudent } from './models';
import { of, Observable, delay, throwError, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StudentService {
  constructor(private httpClient: HttpClient) {}
  getStudents(): Observable<IStudent[]> {
    return this.httpClient.get<IStudent[]>(
      environment.baseAPIURL + '/students'
    );
  }
  createdStudent(payload: CreateStudentPayload): Observable<IStudent> {
    return this.httpClient.post<IStudent>(
      environment.baseAPIURL + '/students',
      payload
    );
  }
  deleteStudentById(id: string): Observable<IStudent> {
    return this.httpClient.delete<IStudent>(
      environment.baseAPIURL + '/students/' + id
    );
  }
  updateStudentById(id: string, student: IStudent): Observable<IStudent> {
    return this.httpClient.put<IStudent>(
      `${environment.baseAPIURL}/students/${id}`,
      student
    );
  }
  // getStudentById(id: string): Observable<IStudent | undefined> {

  //   return this.httpClient.get<IStudent>(
  //     environment.baseAPIURL +'/students/' + id
  //   );
  // }

  // createdStudent(payload:CreateStudentPayload ):Observable<IStudent>{
  //   return this.httpClient.post<IStudent>(
  //     environment.baseAPIURL + '/students/', { ...payload }
  //   );
  // }

  // deletedStudent(id:string):Observable<IStudent|undefined >{
  //   return this.httpClient.delete<IStudent>(
  //     environment.baseAPIURL + '/students/' + id
  //   );
  // }
}

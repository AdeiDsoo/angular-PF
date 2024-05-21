import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { ICreateClassesData } from './models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { IClass } from './models/index';

@Injectable({ providedIn: 'root' })
export class ClassesServices {
  constructor(private httpClient: HttpClient) {}

  getClass(): Observable<IClass[]> {
    return this.httpClient.get<IClass[]>(
      environment.baseAPIURL + '/classes?_embed=student&_embed=course'
    );
  }

  getClassesByStudentId(sId: string): Observable<IClass[]> {
    return this.httpClient.get<IClass[]>(
      `${environment.baseAPIURL}/classes?studentId=${sId}&_embed=student&_embed=course`
    );
  }

  createClass(payload: ICreateClassesData): Observable<IClass> {
    if (!payload.course || !payload.students) {
      throw new Error('Course and Student must be provided');
    }

    let structureClass = {
      qty: payload.qty,
      courseId: payload.course.id,
      studentId: payload.students.id,
    };

    return this.httpClient.post<IClass>(
      environment.baseAPIURL + '/classes',
      structureClass
    );
  }
  deleteClass(id: string): Observable<IClass> {
    return this.httpClient.delete<IClass>(
      environment.baseAPIURL + '/classes/' + id
    );
  }

  updateClassById(id: string, classes: IClass): Observable<IClass> {
    return this.httpClient.put<IClass>(
      `${environment.baseAPIURL}/classes/${id}`,
      classes
    );
  }
  // updateClass(id: number, data: IClass) {
  //   return of(
  //     [].map((item) => {
  //       item.id === id ? { ...item, data } : item;
  //     })
  //   );
  // }
}

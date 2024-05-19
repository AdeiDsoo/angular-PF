import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { IClass, ICreateClassesData } from './models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

// const CLASS_DB: IClass[] = [
//   {
//     id: 5,
//     course: {
//       id: 3,
//       name: 'course mock 1',
//       price: 9999,
//       qty: 6,
//     },
//     students: {
//       id: "2",
//       firstName: 'Michi',
//       lastName: 'Quimichi',
//       email: 'mQuimichi@mail.com',
//       role: 'USER',
//       createdAt: new Date(),
//     },

//     qty: 5,
//   },
// ];

@Injectable({ providedIn: 'root' })
export class ClassesServices {
  constructor(private http: HttpClient) {}
  getClass(): Observable<IClass[]> {
    // return of(CLASS_DB).pipe(delay(1500));
    return this.http.get<IClass[]>(
      environment.baseAPIURL + '/classes?_embed=student&_embed=course'
    );
  }
  getClassesByStudentId(sId: string): Observable<IClass[]> {
    return this.http.get<IClass[]>(
      `${environment.baseAPIURL}/classes?studentId=${sId}&_embed=student&_embed=course`
    );
  }
  createClass(data: ICreateClassesData) {
    if (data.students && data.course && data.qty) {
      // const newClass: Partial<IClass> = {
      //   id: new Date().getTime(),
      //   students: data.students,
      //   course: data.course,
      //   qty: data.qty,
      // };
      // [].push([newClass]);
    }
    return of([]);
  }
  deleteClass(id: number) {
    return of([]);
  }
  // updateClass(id: number, data: IClass) {
  //   return of(
  //     [].map((item) => {
  //       item.id === id ? { ...item, data } : item;
  //     })
  //   );
  // }
}

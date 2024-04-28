import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { IClass, ICreateClassesData } from './models';

const CLASS_DB: IClass[] = [
  {
    id: 5,
    course: {
      id: 3,
      name: 'course mock 1',
      price: 9999,
      qty: 6,
    },
    students: {
      id: 2,
      firstName: 'Michi',
      lastName: 'Quimichi',
      email: 'mQuimichi@mail.com',
      role: 'USER',
      createdAt: new Date(),
    },

    qty: 5,
  },
];

@Injectable({ providedIn: 'root' })
export class ClassesServices {
  getClass(): Observable<IClass[]> {
    return of(CLASS_DB).pipe(delay(1500));
  }
  createClass(data: ICreateClassesData) {
    if (data.students && data.course && data.qty) {
      const newClass: IClass = {
        id: new Date().getTime(),
        students: data.students,
        course: data.course,
        qty: data.qty,
      };
      CLASS_DB.push(newClass);
    }
    return of(CLASS_DB);
  }
  deleteClass(id: number) {
    return of(CLASS_DB.filter((i) => i.id != id));
  }
  updateClass(id: number, data: IClass) {
    return of(
      CLASS_DB.map((item) => {
        item.id === id ? { ...item, data } : item;
      })
    );
  }
}

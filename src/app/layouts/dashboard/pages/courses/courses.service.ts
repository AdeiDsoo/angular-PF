import { Injectable } from '@angular/core';
import { ICourses } from './models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourse():ICourses[]{
    return [
      {
        id: "1",
        name: 'angular',
        price: 700,
        qty: 3,
      },
      {
        id: "2",
        name: 'react',
        price: 800,
        qty: 5,
      },
    ];
  }
}

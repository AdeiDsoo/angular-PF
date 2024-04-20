import { Component, Inject, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { ICourses } from './models';
import { API_URL, COURSES, RANDOM_NUMBER } from './courses.module';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  displayedColumns = ['id', 'name', 'price', 'qty', 'actions'];

  //courses: ICourses[] = [];

  constructor(
    private coursesService: CoursesService,
    @Inject(API_URL) private apiUrl: string,
    @Inject(RANDOM_NUMBER) private random_Number: number,
     @Inject(COURSES) public courses: ICourses[]
  ) {
  }

  ngOnInit(): void {
    this.courses = this.coursesService.getCourse();
  }
}

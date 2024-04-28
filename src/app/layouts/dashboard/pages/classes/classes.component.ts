import { Component, OnInit } from '@angular/core';
import { ClassesServices } from './classes.service';
import { IClass, IClassForm, ICreateClassesData } from './models';
import { FormControl, FormGroup } from '@angular/forms';
import { CoursesService } from '../courses/courses.service';
import { ICourses } from '../courses/models';
import { StudentService } from '../students/students.service';
import { IStudent } from '../students/models';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
})
export class ClassesComponent implements OnInit {
  allClass: IClass[] = [];
  courses: ICourses[] = [];
  students: IStudent[] = [];
  isLoading = false;

  classesForm = new FormGroup<IClassForm>({
    qty: new FormControl(1),
    course: new FormControl(null),
    students: new FormControl(null),
  });

  constructor(
    private classesServices: ClassesServices,
    private coursesService: CoursesService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadClasses();
    this.loadCourses();
    this.loadStudents();
  }

  createClass() {
    this.classesServices.createClass(this.classesForm.getRawValue()).subscribe({
      next: (value) => {
        console.log(value);
      },
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (value) => {
        this.students = value;
      },
    });
  }

  loadCourses() {
    this.courses = this.coursesService.getCourse();
  }

  loadClasses() {
    this.isLoading = true;
    this.classesServices.getClass().subscribe({
      next: (value) => {
        this.allClass = value;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}

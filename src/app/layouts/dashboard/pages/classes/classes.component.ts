import { Component,  OnInit } from '@angular/core';
import { ClassesServices } from './classes.service';
import { IClass, IClassForm } from './models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../courses/courses.service';
import { ICourses } from '../courses/models';
import { StudentService } from '../students/students.service';
import { IStudent } from '../students/models';
import { Store } from '@ngrx/store';
import {
  selectClassList,
  selectClassesError,
  selectLoadingClasses,
} from './store/class.selectors';
import { ClassActions } from './store/class.actions';
import { Observable, Subscription} from 'rxjs';
import { AuthService } from '../../../../core/services/auth.services';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
})
export class ClassesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'course',
    'qty',
    'studentName',
    'actions',
  ];

  courses: ICourses[] = [];
  students: IStudent[] = [];
  authStudent$: Observable<IStudent | null>;

  classesForm = new FormGroup<IClassForm>({
    qty: new FormControl(1, Validators.required),
    course: new FormControl<ICourses | null>(null, Validators.required),
    students: new FormControl<IStudent | null>(null, Validators.required),
  });

  classesSubscription?: Subscription;
  loadingClasses$: Observable<boolean>;
  error$: Observable<unknown>;
  classes$: Observable<IClass[]>;

  constructor(
    private classesServices: ClassesServices,
    private coursesService: CoursesService,
    private studentService: StudentService,
    private store: Store,
    private authService: AuthService
  ) {
    this.loadingClasses$ = this.store.select(selectLoadingClasses);
    this.classes$ = this.store.select(selectClassList);
    this.error$ = this.store.select(selectClassesError);
    this.authStudent$ = this.authService.authStudent$;

  }

  ngOnInit(): void {
    this.loadClasses();
    this.loadCourses();
    this.loadStudents();
  }
  
  createClass() {
    this.classesServices.createClass(this.classesForm.getRawValue()).subscribe({
      next: (value) => {
         this.createClassRedox(value);
      },
    });
  }

  createClassRedox(classes: IClass): void {
    this.store.dispatch(ClassActions.createClass({ payload: classes }));
  }

  // createClass() {
  //   const formValue = this.classesForm.getRawValue();
  //   if (formValue.course && formValue.students) {
  //     const structuredClass: IClass = {
  //       id: '',
  //       qty: formValue.qty || 0,
  //       courseId: formValue.course.id,
  //       studentId: formValue.students.id,
  //     };
  //     this.classesServices.createClass(structuredClass).subscribe({
  //       next: (value) => {
  //         this.createClassRedox(value);
  //       },
  //     });
  //   } else {
  //     console.error('Course or Students are missing in the form');
  //   }
  // }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (value) => {
        this.students = value;
      },
    });
  }

  loadCourses() {
    this.coursesService.getCourse().subscribe({
      next: (value) => (this.courses = value),
    });
  }

  loadClasses() {
    this.store.dispatch(ClassActions.loadClasss());
  }
}

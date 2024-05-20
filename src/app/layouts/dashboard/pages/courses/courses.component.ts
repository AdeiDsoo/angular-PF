import { Component, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { ICourses } from './models';
import { Store } from '@ngrx/store';
import { CourseActions } from './store/course.actions';
import {
  selectCoursesList,
  selectIsloading,
  selectCoursesError,
} from './store/course.selectors';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  displayedColumns = ['id', 'name', 'price', 'qty', 'actions'];
  courses$: Observable<ICourses[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<Error>;
  courses: ICourses[] = [];
  constructor(
    private coursesService: CoursesService,
    private store: Store,
    private matDialog: MatDialog
  ) {
    this.isLoading$ = this.store.select(selectIsloading);
    this.courses$ = this.store.select(selectCoursesList);
    this.error$ = this.store
      .select(selectCoursesError)
      .pipe(map((err) => err as Error));
  }
  ngOnInit(): void {
    this.store.dispatch(CourseActions.loadCourses());
  }
  createCourse(course: ICourses): void {
    this.store.dispatch(CourseActions.createCourse({ payload: course }));
  }
  deleteCourseById(id: string): void {
    Swal.fire({
      icon: 'question',
      html: 'Estas seguro?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(CourseActions.deleteCourseByID({ id }));
      }
    });
  }

  updateCourseById(id: string, data: ICourses): void {
    this.store.dispatch(
      CourseActions.updateCourseByID({ id, data })
    );
  }
  openDialog(editingCourse?: ICourses): void {
    this.matDialog
      .open(CoursesDialogComponent, {
        data: editingCourse,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            // console.log(editingCourse,'edittinggg')
            if (editingCourse) {
              this.updateCourseById(editingCourse.id, result);
            } else {
              result.createdAt = new Date();
              this.createCourse(result);
              // this.store.dispatch(CourseActions.loadCourses());
            }
          }
        },
      });
  }
}

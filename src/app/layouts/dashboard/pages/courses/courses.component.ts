import { Component, Inject, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { ICourses } from './models';
import { API_URL, COURSES, RANDOM_NUMBER } from './courses.module';
import { AlertsService } from '../../../../core/services/alerts.services';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  displayedColumns = ['id', 'name', 'price', 'qty', 'actions'];

  //courses: ICourses[] = [];

  constructor(
    private matDialog: MatDialog,
    private coursesService: CoursesService,
    @Inject(API_URL) private apiUrl: string,
    @Inject(RANDOM_NUMBER) private random_Number: number,
    @Inject(COURSES) public courses: ICourses[],
    public alertService: AlertsService
  ) {
    this.alertService.notifier$.subscribe({
      next: (message) => console.log(message),
    });
  }
  ngOnInit(): void {
    this.courses = this.coursesService.getCourse();
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
            if (editingCourse) {
              this.courses = this.courses.map((course) =>
                course.id === editingCourse.id
                  ? { ...course, ...result }
                  : course
              );
            } else {
              result.id = this.courses.length
                ? this.courses[this.courses.length - 1].id + 1
                : 1;
              result.createdAt = new Date();
              this.courses = [...this.courses, result];
            }
          }
        },
      });
  }

  onDeleteCourse(id: string): void {
    if (confirm('Estas seguro de eliminar este curso?')) {
      this.courses = this.courses.filter((c) => c.id != id);
    }
  }
}

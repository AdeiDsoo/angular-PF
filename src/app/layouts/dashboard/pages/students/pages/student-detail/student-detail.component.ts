import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../students.service';
import { Observable, finalize } from 'rxjs';
import { IStudent } from '../../models';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent {
  student$: Observable<IStudent | undefined>;
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {
     this.loading = true;

    this.student$ = this.studentService
      .getStudentById(
        this.activatedRoute.snapshot.params['idStudent']
      )
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      );
  }
}

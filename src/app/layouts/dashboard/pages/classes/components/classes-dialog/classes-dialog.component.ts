import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from '../../../courses/courses.service';
import { StudentService } from '../../../students/students.service';
import { IStudent } from '../../../students/models';
import { ICourses } from '../../../courses/models';
import { IClass } from '../../models';

@Component({
  selector: 'app-classes-dialog',
  templateUrl: './classes-dialog.component.html',
  styleUrls: ['./classes-dialog.component.scss'],
})
export class ClassDialogComponent implements OnInit {
  classForm: FormGroup;
  courses: ICourses[] = [];
  students: IStudent[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ClassDialogComponent>,
    private coursesService: CoursesService,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) private editingCourse?: IClass
  ) {
    this.classForm = this.formBuilder.group({
      courseId: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
      qty: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadCourses();
    this.loadStudents();

    if (this.editingCourse) {
      this.classForm.patchValue(this.editingCourse);
    }
  }

  get courseIdControl() {
    return this.classForm.get('courseId');
  }

  get studentIdControl() {
    return this.classForm.get('studentId');
  }

  get qtyControl() {
    return this.classForm.get('qty');
  }

  onSave(): void {
    if (this.classForm.invalid) {
      this.classForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.classForm.value);
    }
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (value) => {
        this.students = value;
      },
      error: (err) => {
        console.error('Error loading students', err);
      },
    });
  }

  loadCourses() {
    this.coursesService.getCourse().subscribe({
      next: (value) => {
        this.courses = value;
      },
      error: (err) => {
        console.error('Error loading courses', err);
      },
    });
  }
}

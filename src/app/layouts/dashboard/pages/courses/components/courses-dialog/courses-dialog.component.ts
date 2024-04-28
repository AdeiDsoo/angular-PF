import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourses } from '../../models';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrl: './courses-dialog.component.scss',
})
export class CoursesDialogComponent {
  courseForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingCourse?: ICourses
  ) {
    this.courseForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
        ],
      ],
      price: [
        '',
        [Validators.required,],
      ],
      qty: [
        '',
        [
          Validators.required,
          ],
      ],
    });
    if (editingCourse) {
      this.courseForm.patchValue(editingCourse);
    }
  }

  get nameControl() {
    return this.courseForm.get('name');
  }

  get priceControl() {
    return this.courseForm.get('price');
  }

  get qtyControl() {
    return this.courseForm.get('qty');
  }

  onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.courseForm.value);
    }
  }
}

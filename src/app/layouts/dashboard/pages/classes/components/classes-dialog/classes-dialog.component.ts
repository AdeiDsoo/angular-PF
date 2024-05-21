import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClass } from '../../models';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './classes-dialog.component.html',
  styleUrl: './classes-dialog.component.scss',
})
export class ClassDialogComponent {
  classForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingCourse?: IClass
  ) {
    this.classForm = this.formBuilder.group({
      courseId: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
      qty: ['', [Validators.required]],
    });
    if (editingCourse) {
      this.classForm.patchValue(editingCourse);
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
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormFieldValidationErrorsPipe } from './pipes/form-field-validation-errors.pipe';
import { JoinNameAndLastnamePipe } from './pipes/join-name-and-lastname.pipe';
import { HeadersDirective } from './directives/headers.directive';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    FormFieldValidationErrorsPipe,
    JoinNameAndLastnamePipe,
    HeadersDirective,
  ],
  imports: [CommonModule],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    FormFieldValidationErrorsPipe,
    JoinNameAndLastnamePipe,
    HeadersDirective,
    MatListModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
})
export class SharedModule {}

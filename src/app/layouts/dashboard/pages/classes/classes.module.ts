import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { ClassEffects } from './store/class.effects';
import { StoreModule } from '@ngrx/store';
import { classFeature } from './store/class.reducer';
import { ClassDialogComponent } from './components/classes-dialog/classes-dialog.component';

@NgModule({
  declarations: [ClassesComponent, ClassDialogComponent],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    SharedModule,
    StoreModule.forFeature(classFeature),
    EffectsModule.forFeature([ClassEffects]),
  ],
  exports: [ClassesComponent],
})
export class ClassesModule {}

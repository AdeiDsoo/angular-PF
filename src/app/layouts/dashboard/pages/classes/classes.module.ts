import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';

@NgModule({
  declarations: [ClassesComponent],
  imports: [CommonModule, ClassesRoutingModule],
  exports: [ClassesComponent],
})
export class ClassesModule {}

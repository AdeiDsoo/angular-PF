import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Class09RxjsComponent } from './class09-rxjs.component';
import { SharedModule } from '../../../../shared/shared.module';



@NgModule({
  declarations: [Class09RxjsComponent],
  imports: [CommonModule, SharedModule],
  exports: [Class09RxjsComponent],
})
export class Class09RxjsModule {}

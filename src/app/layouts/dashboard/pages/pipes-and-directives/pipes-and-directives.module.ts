import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesAndDirectivesRoutingModule } from './pipes-and-directives-routing.module';
import { PipesAndDirectivesComponent } from './pipes-and-directives.component';
import { MyCustomTextTransformPipe } from './my-custom-text-transform.pipe';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [PipesAndDirectivesComponent, MyCustomTextTransformPipe],
  imports: [CommonModule, PipesAndDirectivesRoutingModule, SharedModule],
  exports: [PipesAndDirectivesComponent],
})
export class PipesAndDirectivesModule {
 
}

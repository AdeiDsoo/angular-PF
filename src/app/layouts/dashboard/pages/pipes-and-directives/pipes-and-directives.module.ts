import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesAndDirectivesRoutingModule } from './pipes-and-directives-routing.module';
import { PipesAndDirectivesComponent } from './pipes-and-directives.component';
import { MyCustomTextTransformPipe } from './my-custom-text-transform.pipe';


@NgModule({
  declarations: [PipesAndDirectivesComponent, MyCustomTextTransformPipe],
  imports: [CommonModule, PipesAndDirectivesRoutingModule],
  exports: [PipesAndDirectivesComponent],
})
export class PipesAndDirectivesModule {
 
}

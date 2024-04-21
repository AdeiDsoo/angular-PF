import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StudentsModule } from './pages/students/students.module';
import { CoursesModule } from './pages/courses/courses.module';
import { ClassesModule } from './pages/classes/classes.module';
import { Class09RxjsModule } from './pages/class09-rxjs/class09-rxjs.module';
import { Class10RxjsModule } from './pages/class10-rxjs/class10-rxjs.module';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    StudentsModule,
    CoursesModule,
    ClassesModule,
    Class09RxjsModule,
    Class10RxjsModule,
    AuthModule,
    SharedModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}

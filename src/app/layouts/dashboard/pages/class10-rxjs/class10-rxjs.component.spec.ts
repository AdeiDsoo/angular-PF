import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class10RxjsComponent } from './class10-rxjs.component';

describe('Class10RxjsComponent', () => {
  let component: Class10RxjsComponent;
  let fixture: ComponentFixture<Class10RxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Class10RxjsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Class10RxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

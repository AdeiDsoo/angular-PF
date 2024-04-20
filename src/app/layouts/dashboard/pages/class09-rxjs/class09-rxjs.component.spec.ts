import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Class09RxjsComponent } from './class09-rxjs.component';

describe('Class09RxjsComponent', () => {
  let component: Class09RxjsComponent;
  let fixture: ComponentFixture<Class09RxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Class09RxjsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Class09RxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  filter,
  take,
  tap,
  map,
  Subject,
  BehaviorSubject,
  takeUntil,
} from 'rxjs';
import { IStudent } from '../students/models';

@Component({
  selector: 'app-class10-rxjs',
  templateUrl: './class10-rxjs.component.html',
  styleUrl: './class10-rxjs.component.scss',
})
export class Class10RxjsComponent implements OnInit, OnDestroy {
  //subject fuera del oninit
  changeUser$ = new Subject<boolean>();
  //behavior fuera del oninit y con valor inicial
  authUser$ = new BehaviorSubject<IStudent | null>(null);
  destroyedComponent$ = new Subject<boolean>();

  login(): void {
    this.changeUser$.next(true);
  }

  ngOnDestroy(): void {
    console.log('el componente se destruyo');
    
    this.destroyedComponent$.next(true)
  }
  ngOnInit(): void {
 

    this.changeUser$.subscribe({
      next: (value) => {
        // console.log(value);
        this.authUser$;
      },
      // error: (error) => {},
      // complete: () => {},
    });

    const getUser$ = new Observable<number>((observer) => {
      let counter = 0;

      setInterval(() => {
        counter++;
        observer.next(counter);
        // observer.complete();
      }, 1000);
    });

    getUser$.pipe(takeUntil(this.destroyedComponent$)).subscribe({
      next: (value) => {
        console.log(value, 'valuenext');
      },
    });

    this.changeUser$.subscribe({
      next: (value) => {
        this.authUser$.next({
          id: 1,
          createdAt: new Date(),
          email: 'student1@mail.com',
          firstName: 'student1',
          lastName: 'test',
          role: 'ADMIN',
        });
      },
    });

    this.authUser$.subscribe({
      next: (value) => {
        console.log(value);
      },
    });

    // const getUserSubscription = getUser$
    //   .pipe(
    //     tap(() => {
    //       console.log('Tap 1');
    //     }),
    //     map((value) => {
    //       console.log('map', value * 2);
    //     })
    //     // filter((value)=>{
    //     //   return value>5
    //     // }),
    //     // tap(()=>{
    //     //   console.log('Tap 2');

    //     // })
    //   )
    //   .subscribe({
    //     next: (value) => {
    //       console.log(value);
    //     },
    //     error: () => {},
    //     complete: () => {
    //       console.log('el observable se completo');
    //     },
    //   });
  }
}

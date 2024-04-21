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
  Subscription,
  of,
  delay,
  forkJoin,
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

  getUserSuscription?: Subscription;

  students: IStudent[] = [];
  roles: string[] = [];

  loader = false;

  getRoles(): Observable<string[]> {
    // this.loader=true
    return of(['ADMIN', 'STUDENT', 'TEACHER']).pipe(delay(1500));
    // .subscribe({
    //   next: (value) => {
    //     this.roles = value;
    //   },
    //   complete: () => {
    //     this.loader = false;
    //   },
    // });
  }

  getStudents(): Observable<IStudent[]> {
    const STUDENTS_DB: IStudent[] = [
      {
        id: 1,
        firstName: 'Luna',
        lastName: 'Lopez',
        email: 'lLopez@mail.com',
        role: 'USER',
        createdAt: new Date(),
      },
      {
        id: 2,
        firstName: 'Michi',
        lastName: 'Quimichi',
        email: 'mQuimichi@mail.com',
        role: 'ADMIN',
        createdAt: new Date(),
      },
    ];
    //  this.loader = true;
    return of(STUDENTS_DB).pipe(delay(3000));
    //  .subscribe({
    //     next:(value)=>{
    //       console.log(value);
    //       this.students=value

    //     },
    //     complete:()=>{
    //       this.loader=false
    //     }
    //   })
  }

  login(): void {
    this.changeUser$.next(true);
  }

  ngOnDestroy(): void {
    console.log('el componente se destruyo');

    this.destroyedComponent$.next(true);
    this.getUserSuscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.loader=true
    this.getStudents();
    this.getRoles();

    forkJoin([this.getRoles(), this.getStudents()]).subscribe({
      next: (value) => {
        console.log(value);
        this.students=value[1]
        this.roles=value[0]
      },
      complete: () => {
        this.loader = false;
      },
    });

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
        observer.complete();
      }, 1000);
    });

    this.getUserSuscription = getUser$
      // .pipe(takeUntil(this.destroyedComponent$))
      .subscribe({
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

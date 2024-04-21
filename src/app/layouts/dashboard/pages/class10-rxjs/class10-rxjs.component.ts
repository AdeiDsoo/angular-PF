import { Component, OnInit } from '@angular/core';
import { Observable, filter, take, tap, map } from 'rxjs';

@Component({
  selector: 'app-class10-rxjs',
  templateUrl: './class10-rxjs.component.html',
  styleUrl: './class10-rxjs.component.scss',
})
export class Class10RxjsComponent implements OnInit {
  ngOnInit(): void {
    const getUser$ = new Observable<number>((observer) => {
      let counter = 0;

      setInterval(() => {
        counter++;
        // observer.next(counter);
        // observer.complete()
      }, 1000);
    });
    const getUserSubscription = getUser$
      .pipe(
        tap(() => {
          console.log('Tap 1');
        }),
        map((value) => {
          console.log('map', value * 2);
        })
        // filter((value)=>{
        //   return value>5
        // }),
        // tap(()=>{
        //   console.log('Tap 2');

        // })
      )
      .subscribe({
        next: (value) => {
          console.log(value);
        },
        error: () => {},
        complete: () => {
          console.log('el observable se completo');
        },
      });
  }
}

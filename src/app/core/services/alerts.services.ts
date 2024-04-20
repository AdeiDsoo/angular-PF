import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertsService {
  //por convencion a los observables se les colocca el simbolo de dolar al final
    notifier$ = new BehaviorSubject<string | null>(null);
//   notifier$ = new Subject()

  //el subject extiende el observable notifica cuando queremos emitir el valor
  //behavior puede tener un valor inicial
}

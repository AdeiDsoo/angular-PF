import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertsService } from '../../../../core/services/alerts.services';

@Component({
  selector: 'app-class09-rxjs',
  templateUrl: './class09-rxjs.component.html',
  styleUrl: './class09-rxjs.component.scss',
})

//NOTA IMPORTANTE!!! a los observables yo tengo que especificarles cuando quiero que terminen pueden emitir varios eventos hasta que uno les especifique
//las promesas solo resuelven un valor los observalbes infinitos valores
export class Class09RxjsComponent {
  constructor(private alertService:AlertsService) {
    // this.runReloj();
    this.alertService.notifier$.next('Mensaje')
  }
  runReloj() {
    //los observables reciben callbacks
    const obs = new Observable((observer) => {
      // observer.error('error al obtener la fecha')
      let counter = 5;
      setInterval(() => {
        counter--;
        if (counter === 0) {
          observer.complete();
        }
        observer.next(new Date());
      }, 1000);
    });
    //para llamar al observable me suscribo a lo que el observable emite
    obs.subscribe({
      //equivale al then
      next: (resultado) => {
        console.log(resultado, 'next');
      },
      //equivale al catch
      error: (error) => {
        console.error(error);
      },
      //equivale al finaly
      complete: () => {
        console.log('dejo de emitir valores');
      },
    });
  }
}

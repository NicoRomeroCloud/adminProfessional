import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() { 
    
    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('Subs:', valor),
    //   err => console.warn('Error:', err),
    //   () => console.info('obs temrinardo')
    // );
    this.intervalSubs = this.retornaIntervalo()
    .subscribe(console.log)
   }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

   retornaIntervalo(): Observable<number>{

    return interval(100)
                      .pipe(
                        take(30),
                        map(valor => valor + 1),
                        filter(valor => (valor % 2 ===0) ? true: false ),
                       
                        
                      );
    
    
   }


   retornaObservable(): Observable<number>{
    let i = -1;    

    const obs$ = new Observable<number>( observer => {

      const inetervalo = setInterval(() =>{
        
        i++;
        observer.next(i);

        if (i===4) {
          clearInterval(inetervalo);
          observer.complete();
        }
        if (i===2) {
          i=0;
          // console.log('i === 2');
          observer.error('i llego a 2');
        }
      }, 1000);

    });

    return obs$;
   }

  
}

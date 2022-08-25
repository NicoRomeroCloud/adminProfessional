import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo : string;
  public tituloSuns$: Subscription;

  constructor( private router: Router, private route: ActivatedRoute ) {
    
    this.tituloSuns$ = this.getDataRuta()
                        .subscribe(({titulo}) => {
                        this.titulo = titulo;
                        document.title = `AdminPro - ${titulo}`;
    });

  }
  ngOnDestroy(): void {
    this.tituloSuns$.unsubscribe();
  }

  getDataRuta(){
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data),
    );
  }

}

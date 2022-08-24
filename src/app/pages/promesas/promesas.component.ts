import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });
    
    // const promersa = new Promise( (resolve, rejeact) => {

    // //   if (true) {
    // //     resolve('Hola mundo');
    // //   }else{
    // //     rejeact('algo salio mal');
    // //   }
    // // } );

    // // promersa.then((mensaje)=>{
    // //   console.log(mensaje);
    // // })
    // // .catch(error => console.log('error', error))
    // // console.log('Fin mundo');


  }

  getUsuarios(){

    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp=> resp.json())
      .then(body=> resolve(body.data ) )
    } )

    
    
  }

}

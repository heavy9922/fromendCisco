import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  open = false;
  openprestamo= false;
  agregarprestamo= false;
  close= true;

  constructor() {}

    ngOnit(){

    }

    mostrar (){
      this.open = true;
      this.openprestamo = false;
      this.close = false;
    }
  
    mostrarprestamo (){
      this.openprestamo = true;
      this.open = false;
      this.close = false;
    }

}

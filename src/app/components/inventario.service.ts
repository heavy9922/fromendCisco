import { Injectable } from '@angular/core';
import {Inventario} from './inventario';
import {Http} from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  url = "http://127.0.0.1:8000/api/inventario";
  data:Inventario[];

  constructor(private http:Http) { }

  read(){
    return this.http.get(`${this.url}`);
  }
  delete(id){
    return this.http.delete('http://127.0.0.1:8000/api/inventario/'+ id);
  }
}

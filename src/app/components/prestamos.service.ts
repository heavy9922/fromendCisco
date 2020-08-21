import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import  {Prestamos}  from './prestamos';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  url= "http://127.0.0.1:8000/api/prestamos";
  data: Prestamos[];

  constructor(private http:Http) { }

  read(){
    return this.http.get(`${this.url}`);
  }

  delete(id){
    return this.http.delete('http://127.0.0.1:8000/api/prestamos/'+ id);
  }
}

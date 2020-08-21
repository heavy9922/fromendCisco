import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalController } from '@ionic/angular';
import { AgregarPrestamoComponent } from '../agregar-prestamo/agregar-prestamo.component';
import {AgregarInventarioComponent} from '../agregar-inventario/agregar-inventario.component'
import { EditPrestamoComponent} from '../edit-prestamo/edit-prestamo.component';
// importamos la clase
import {Inventario} from 'src/app/components/inventario';
// importamos el servicio
import {InventarioService} from '../inventario.service';


@Component({
  selector: 'app-consulta-inventario',
  templateUrl: './consulta-inventario.component.html',
  styleUrls: ['./consulta-inventario.component.scss'],
})
export class ConsultaInventarioComponent implements OnInit {

  data: Inventario[];

  current_inventario: Inventario;
  
  open=false;

  displayedColumns: string[] = ['anadir', 'seccion', 'posicion', 'estado', 'producto', 
  'pdrPid', 'serial', 'codigoGet', 'canal', 'observaciones', 'editar', 'borrar'];

  dataSource = new MatTableDataSource();
  
  constructor(private service:InventarioService ,private modalCtrl: ModalController) {
    this.data=[];
   }

  ngOnInit() {
    this.service.read()
    .subscribe(res =>{
      this.data = res.json();
      this.current_inventario = new Inventario();
    });
    this.dataSource.paginator = this.paginator;
  }

  delete(id){
    this.service.delete(id)
    .subscribe(res=>{
      console.log('el mesaje fue eliminados');
      alert('el mesaje fue eliminados');
      this.ngOnInit();
    });
  }
  
  async formAddInv (){

    const modal = await this.modalCtrl.create({
      component: AgregarInventarioComponent,
      componentProps: {
        seccion: ''
      },
      cssClass:"modalvisual"
    });

    await modal.present();
  }

  async formAddLend (element){

    const modal = await this.modalCtrl.create({
      component: AgregarPrestamoComponent,
      componentProps: {
        pullDataTable: element
      },
      cssClass:"modalvisual"
    });
      
    await modal.present();
  }

  applyFilter(filterValue: string){
      this.dataSource.filter = filterValue.trim(). toLowerCase();
  }

  async formEdit (element){

    const modal = await this.modalCtrl.create({
      component: EditPrestamoComponent,
      componentProps: {
        editInv: element
      },
      cssClass:"modalvisual"
    });
    
    await modal.present();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

}

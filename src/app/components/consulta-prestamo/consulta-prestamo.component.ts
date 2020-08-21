import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EditConsultaPrestamoComponent } from '../edit-consulta-prestamo/edit-consulta-prestamo.component';
import { ModalController } from '@ionic/angular';

// importamos la clase
import { Prestamos } from 'src/app/components/prestamos';
// importamos el servicio
import { PrestamosService } from '../prestamos.service';




@Component({
  selector: 'app-consulta-prestamo',
  templateUrl: './consulta-prestamo.component.html',
  styleUrls: ['./consulta-prestamo.component.scss'],
})
export class ConsultaPrestamoComponent implements OnInit {

  data: Prestamos[];

  current_prestamos: Prestamos;

  constructor(private service:PrestamosService, private modalCtrl: ModalController) {
    this.data = [];
  }
  ngOnInit() {
    this.service.read()
      .subscribe(res => {
        this.data = res.json();
        this.current_prestamos = new Prestamos();
      });
    this.dataSource.paginator = this.paginator
  }
  delete(id) {
    this.service.delete(id)
      .subscribe(res => {
        console.log('el mesaje fue eliminados');
        alert('el mesaje fue eliminados');
        this.ngOnInit();
      });
  }
  edit() {

  }
  displayedColumns: string[] = ['codigoDelPrestamo', 'equipoPrestadoPid', 'serial', 'canal', 'fechaDelPrestamo', 'mes', 'devolucionEstimada', 'devolucionReal', 'devuelto', 'estadoReal', 'diasTranscurridos', 'observaciones', 'editar', 'borrar'];
  dataSource = new MatTableDataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

 
  async formEditLend(element) {

    const modal = await this.modalCtrl.create({
      component: EditConsultaPrestamoComponent,
      componentProps: {
        pullDataTable: element
      },
      cssClass: "modalvisual"
    });

    await modal.present();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

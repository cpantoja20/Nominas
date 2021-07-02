import { Component, OnInit } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos/prestamos.service';
import { Prestamos } from '../models/prestamos';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {
  prestamosreg: Prestamos[];
  prestamos: Prestamos;

  constructor(private prestamosService: PrestamosService) { }

 

  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { PrestamosService } from 'src/app/services/prestamos/prestamos.service';
import { Prestamos } from '../models/prestamos';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {
  prestamo: Prestamos[];
  prestamos: Prestamos = {
    idempleado:null,
    estadoPrestamo:null,
    fechadePrestamo:null,
    valorPrestamo:null
  };
  buscar: number;
  persona: Persona[];
  personas:Persona[];
  id:number;

  constructor(private prestamosService: PrestamosService, private personaService: PersonaService) { }
  ver: boolean;
  ver2: boolean;
  ngOnInit(): void {
    this.ver=true;
    this.ver2= false;
  }
  add(){
    this.personaService.Buscar(this.buscar).subscribe(result => {
      this.persona = result;
      if(result!=null){
        alert('ENCONTRADO');
        this.ver=false;
        this.ver2= true;
        this.buscarPrestamos();
      }else{
        alert('PERSONA NO EXISTE');
        this.ver=true;
        this.ver2=false;
      }
    });
  }
  buscarPrestamos(){
    this.personaService.get().subscribe(p=>{
      this.personas = p;
      this.prestamosService.get().subscribe(p=>{
        this.prestamo =p;
        for (const key in this.personas) {
          for (const key2 in this.prestamo) {
            if (this.personas[key].identificacion==this.prestamo[key2].idempleado){
              this.personas[key].fechaingreso = this.prestamo[key2].fechadePrestamo;
              this.personas[key].vrNeto = parseInt(this.prestamo[key2].valorPrestamo);
              if(this.prestamo[key2].estadoPrestamo =='ACTIVO'){
                this.personas[key].Firma = 'PENDIENTE';
              }else{
                this.personas[key].Firma = 'PAGADO'
              } 
              //this.personas[key].Firma = this.prestamo[key2].estadoPrestamo;   
            }
            }
          }
      });
    });
  }
  realizarPrestamo(){
    this.prestamos.estadoPrestamo = 'ACTIVO';
    this.prestamos.idempleado = this.buscar;
    var vaor = this.prestamos.valorPrestamo.toString();
    this.prestamos.valorPrestamo =vaor;
    console.log(this.prestamos);
    /*this.prestamosService.get().subscribe(p=>{
      this.prestamo =p;
      console.log(this.prestamo);
    })*/
     this.prestamosService.post(this.prestamos).subscribe(p => {
      if (p != null) {
        alert('Prestamos creados!');
        this.prestamos = p;
      }
    });
  }
}


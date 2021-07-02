import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from '../models/persona';
import { Pagos } from '../models/pagos/pagos';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  persona: Persona[];
  buscar: Number;
  pago: Pagos = {
    IdPersona: null,
    FechaInicio: null,
    FechaFinal: null,
    diaslab: null,
    totalDias:null,
    vrDia:null,
    vrNeto:null    
  };

  id:number;
  
  constructor(private personaService: PersonaService) { }
  ver: boolean;
  ver2: boolean;
  ngOnInit() {

    this.ver = true;
    this.ver2 = false;    

  }
  encontrar(){
    console.log(this.buscar);
    this.personaService.Buscar(this.buscar).subscribe(result => {
      this.persona = result;
 //     this.id = this.persona.identificacion;
      console.log(this.persona);
      if (this.persona != null) {
        this.ver = false;
        this.ver2 = true;
        alert('Empleado Encontrado');
      } else {
        this.ver = true;
        this.ver2 = false;
        alert('Empleado No Encontrado');
      }
    });
  }
  reset(){
    this.persona = null;
    if (this.persona != null) {
      this.ver = false;
      this.ver2 = true;
    } else {
      this.ver = true;
      this.ver2 = false;
    }
    alert("Pago Cancelado");
  }
  RealizarPago(id :number){

    this.pago.IdPersona = id;
    console.log(this.pago);
    this.personaService.postPagos(this.pago).subscribe(p => {
      if (p != null) {
        alert('Pago Realizado!');
        this.pago = p;
      }
    }); 
  }
}

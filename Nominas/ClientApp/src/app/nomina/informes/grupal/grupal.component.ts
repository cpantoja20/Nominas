import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { Pagos } from '../../models/pagos/pagos';
import { Persona } from '../../models/persona';

@Component({
  selector: 'app-grupal',
  templateUrl: './grupal.component.html',
  styleUrls: ['./grupal.component.css']
})
export class GrupalComponent implements OnInit {
  personas: Persona[];
  persona: Persona[];
  pagos: Pagos[];
  hola: string;
  tipoContrato: string;
  fechainicio: Date;
  fechafinal: Date;
  searchText: string;
  constructor(private personaService: PersonaService) { }
  ngOnInit() {
  }
  buscar() {

    console.log(this.searchText);
    this.personaService.get().subscribe(result => {
      this.personas = result;
      var num: string;
      let id = 0;
      for (const persona in this.personas) {
        if (this.personas[persona].tipoContrato == this.searchText) {
          num = persona;
          id = this.personas[persona].identificacion;
          this.personaService.getGrupal().subscribe(result => {
            this.pagos = result;
            if (this.personas[persona].tipoContrato == "Aprendizaje") {
              this.personas[persona].vrNeto = 500;
            } else if (this.personas[persona].tipoContrato == "ObraLabor") {
              this.personas[persona].vrNeto = 1000;
            } else if (this.personas[persona].tipoContrato == "Ocasional") {
              this.personas[persona].vrNeto = 1500;
            } else if (this.personas[persona].tipoContrato == "PrestacionServicios") {
              this.personas[persona].vrNeto = 2000;
            } else if (this.personas[persona].tipoContrato == "Fijo") {
              this.personas[persona].vrNeto = 2500;
            } else if (this.personas[persona].tipoContrato == "Indefinido") {
              this.personas[persona].vrNeto = 3000;
            }
            var sum = this.personas[persona].vrNeto / 30;
            this.personas[persona].vrDia = sum;
            this.personas[persona].Firma = 'Correcto';
            var pos;
            for (const key2 in this.pagos) {
              for (const key in this.personas) {
               if (this.personas[key].identificacion == this.pagos[key2].idPersona) {
                  var fechaini = new Date(this.pagos[key2].fechaInicio);
                  var fechafin = new Date(this.pagos[key2].fechaFinal);
                  var diasdif = fechafin.getTime() - fechaini.getTime();
                  var contdias = Math.round(diasdif / (1000 * 60 * 60 * 24));
                  this.personas[key].diaslab = contdias;
                  this.personas[key].pago = this.personas[key].diaslab*this.personas[persona].vrDia;
                }else{

                }
              }
            }
            console.log(this.personas);
            console.log(this.pagos);
          });
        } else if (this.searchText == 'Todos') {
          this.personaService.getGrupal().subscribe(result => {
            this.pagos = result;
            if (this.personas[persona].tipoContrato == "Aprendizaje") {
              this.personas[persona].vrNeto = 500;
            } else if (this.personas[persona].tipoContrato == "ObraLabor") {
              this.personas[persona].vrNeto = 1000;
            } else if (this.personas[persona].tipoContrato == "Ocasional") {
              this.personas[persona].vrNeto = 1500;
            } else if (this.personas[persona].tipoContrato == "PrestacionServicios") {
              this.personas[persona].vrNeto = 2000;
            } else if (this.personas[persona].tipoContrato == "Fijo") {
              this.personas[persona].vrNeto = 2500;
            } else if (this.personas[persona].tipoContrato == "Indefinido") {
              this.personas[persona].vrNeto = 3000;
            }
            var sum = this.personas[persona].vrNeto / 30;
            this.personas[persona].vrDia = sum;
            this.personas[persona].Firma = 'Correcto';
            for (const key in this.personas) {
              for (const key2 in this.pagos) {
                if (this.personas[key].identificacion == this.pagos[key2].idPersona) {
                  var fechaini = new Date(this.pagos[key2].fechaInicio);
                  var fechafin = new Date(this.pagos[key2].fechaFinal);
                  var diasdif = fechafin.getTime() - fechaini.getTime();
                  var contdias = Math.round(diasdif / (1000 * 60 * 60 * 24));
                  this.personas[key].diaslab = contdias;
                  this.personas[key].pago = this.personas[key].diaslab*this.personas[key].vrDia;
                }
              }
            }
            console.log(this.pagos);
          });
        } else {
          delete this.personas[persona];
        }

      }
    });
  }
}

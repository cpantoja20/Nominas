import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from '../../models/persona';
import { Pagos } from '../../models/pagos/pagos';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {
  persona: Persona[];
  buscar: Number;
  pagos: Pagos[];
  pago: Pagos = {
    fechaFinal:null,
    fechaInicio:null,
    idPersona:null,
    diaslab: null,
    totalDias: null,
    vrDia: null,
    vrNeto: null
  };

  id: number;

  constructor(private personaService: PersonaService) { }
  ver: boolean;
  ver2: boolean;
  ngOnInit() {

    this.ver = true;
    this.ver2 = false;

  }
  encontrar() {
    console.log(this.buscar);
    this.personaService.Buscar(this.buscar).subscribe(result => {
      this.persona = result;
      console.log(this.persona);
      if (this.persona != null) {
        this.ver = false;
        this.ver2 = true;
        this.personaService.getGrupal().subscribe(result => {
          this.pagos = result;
          var valormes = 0;
          var tipoContrato;
          for (const key in this.persona) {
            tipoContrato = this.persona[key].tipoContrato;
          }
          if (tipoContrato  == "Aprendizaje") {
            valormes = 500;
          } else if (tipoContrato  == "ObraLabor") {
            valormes = 1000;
          } else if (tipoContrato  == "Ocasional") {
            valormes = 1500;
          } else if (tipoContrato  == "PrestacionServicios") {
            valormes = 2000;
          } else if (tipoContrato  == "Fijo") {
            valormes = 2500;
          } else if (tipoContrato  == "Indefinido") {
            valormes = 3000;
          }
          for (const key in this.pagos) {
            if (this.pagos[key].idPersona == this.buscar) {
              var fechaini = new Date(this.pagos[key].fechaInicio);
              var fechafin = new Date(this.pagos[key].fechaFinal);
              var diasdif = fechafin.getTime() - fechaini.getTime();
              var contdias = Math.round(diasdif / (1000 * 60 * 60 * 24));
              this.pagos[key].diaslab = contdias;
              this.pagos[key].vrNeto = valormes;
              this.pagos[key].vrDia = valormes / 30; 
              this.pagos[key].totalDias = contdias * (valormes / 30);
            } else {
              delete this.pagos[key];
            }
            //******** */ arreglale los problemas de compilacion 
          }
        });
        alert('Empleado Encontrado');
      } else {
        this.ver = true;
        this.ver2 = false;
        alert('Empleado No Encontrado');
      }
    });
  }
  reset() {
    this.persona = null;
    if (this.persona != null) {
      this.ver = false;
      this.ver2 = true;
    } else {
      this.ver = true;
      this.ver2 = false;
    }
    this.pagos = null;
    this.persona = null;
    this.buscar = null;
  }

}

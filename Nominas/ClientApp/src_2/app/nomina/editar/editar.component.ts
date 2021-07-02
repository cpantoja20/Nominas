import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  persona: Persona[];
  buscar: Number;
  fechaIngreso :Date;
  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
   // this.persona.identificacion =0;
  }
  encontrar():void {
    console.log(this.buscar);
    this.personaService.Buscar(this.buscar).subscribe(result => {
      this.persona = result;
      //const convertAge = new Date(this.persona.fechaIngreso);
      console.log(this.persona);
      this.fechaIngreso = new Date("2021-04-12");//convertAge;
      console.log(this.fechaIngreso);
    });
  }
  actualizar(){
    //eso lo solucionamos despues estoy cansado windy
  }

}

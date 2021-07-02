import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  personas: Persona[];
  persona: Persona;
  buscar: Number;
  fechaIngreso :Date;
  constructor(private personaService: PersonaService) { }
  ver: boolean;
  ver2: boolean;
  estado:boolean;
  ngOnInit() {
    this.ver = true;
    this.ver2 = false;   
  }
  encontrar():void {
    console.log(this.buscar);
    var estad;
    this.personaService.Buscar(this.buscar).subscribe(result => {
      this.personas = result;        
      if(result !=null){
        alert('Encontrado');
        this.ver =false;
        this.ver2 = true;
      }else{
        alert('Personal No existe');
        this.ver =true;
        this.ver2 = false;
      }
    });
    for (const key in this.personas) {
      estad = this.personas[key].estado;
    }
  }
  actualizar(personas:Persona){
    this.persona = personas;
    console.log(this.persona);
    this.personaService.put(this.persona).subscribe(p=>{
      if(p!=null){
        alert('Datos Actualizados');
      }
    })
  }

}

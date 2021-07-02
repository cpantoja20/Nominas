import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { SignalRService } from 'src/app/services/signal-r.service';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-dardebaja',
  templateUrl: './dardebaja.component.html',
  styleUrls: ['./dardebaja.component.css']
})
export class DardebajaComponent implements OnInit {

  personas: Persona[];
  persona:Persona;
  buscar : number;
  constructor(private personaService: PersonaService, private signalRService: SignalRService) { }
  ver: boolean;
  ver2: boolean;
  ngOnInit() {
    this.ver = true;
    this.ver2 = false;    
  }
  buscarPersona(){
    this.personaService.Buscar(this.buscar).subscribe(p=>
      {
        this.personas =p;
        if(p!=null)
        {
          alert('Encontrado');
          this.ver = false;
          this.ver2 = true;  

        }else{
          alert('No existe');
          this.ver = true;
          this.ver2 = false;   
        }
      });
  }
  echar(personas:Persona){
    this.persona = personas;
    this.persona.estado ='INACTIVO';
    console.log(this.persona);
    this.personaService.put(this.persona).subscribe(p=>{
      if(p!=null){
        alert('Correto');
      }
    })
  }

}

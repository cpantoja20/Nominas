import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { SignalRService } from 'src/app/services/signal-r.service';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-persona-consulta',
  templateUrl: './persona-consulta.component.html',
  styleUrls: ['./persona-consulta.component.css']
})
export class PersonaConsultaComponent implements OnInit {

  personas: Persona[];
  constructor(private personaService: PersonaService, private signalRService: SignalRService) { }
  ngOnInit() {
    this.personaService.get().subscribe(result => {
      this.personas = result;

      ///Se suscribe al servicio de signal r y cuando se regustr una nueva persona se agregará el registro nuevo al array personas
      this.signalRService.personaReceived.subscribe((persona: Persona) => {
        this.personas.push(persona);
      });

      for (const persona in this.personas) {
        const convertAge = new Date(this.personas[persona].fechadenacimiento);
        console.log(convertAge);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        console.log(Math.floor((timeDiff / (1000 * 3600 * 24)) / 365));
        this.personas[persona].edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      }
      console.log(this.personas);
    });
  }

}

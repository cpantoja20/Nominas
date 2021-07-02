import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-persona-registro',
  templateUrl: './persona-registro.component.html',
  styleUrls: ['./persona-registro.component.css']
})
export class PersonaRegistroComponent implements OnInit {

  formGroup: FormGroup;
  persona: Persona;

  constructor(private personaService: PersonaService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.persona = new Persona();
    this.buildForm();
  }

  private buildForm() {
    this.persona = new Persona();
    this.persona.identificacion ;
    this.persona.nombres = '';
    this.persona.apellidos = '';
    this.persona.sexo = '';
    this.persona.fechadenacimiento 
    this.persona.fechaingreso 
    this.persona.tipoContrato = '';
    this.formGroup = this.formBuilder.group({
      identificacion: [this.persona.identificacion, Validators.required],
      nombres: [this.persona.nombres, Validators.required],
      apellidos: [this.persona.apellidos, Validators.required],
      sexo: [this.persona.sexo, Validators.required],
      fechadenacimiento: [this.persona.fechadenacimiento, Validators.required],
      fechaingreso : [this.persona.fechaingreso, Validators.required],
      tipoContrato: [this.persona.tipoContrato, Validators.required],
    });
  }

  add() {
    this.persona = this.formGroup.value
    console.log(this.persona);
    const convertAge = new Date(this.persona.fechadenacimiento);
    console.log(convertAge);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    console.log(Math.floor((timeDiff / (1000 * 3600 * 24)) / 365));
    this.persona.edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    console.log(this.persona.edad);
    //this.persona = this.formGroup.value
    this.personaService.post(this.persona,this.persona.edad).subscribe(p => {
      if (p != null) {
        alert('Persona creada!');
        this.persona = p;
      }
    });
  }

  get control() {
    return this.formGroup.controls;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.add();
  }


}

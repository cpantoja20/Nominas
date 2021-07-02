import { Pipe, PipeTransform } from '@angular/core';
import { Persona } from '../nomina/models/persona';

@Pipe({
  name: 'pipefiltroPersona'
})
export class PipefiltroPersonaPipe implements PipeTransform {

  transform(persona: Persona[], searchText: string): any {
    if (searchText == null) return persona;
    return persona.filter(p => p.nombres.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

}
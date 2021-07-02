import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../nomina/models/persona';
import { Pagos } from '../nomina/models/pagos/pagos';
import { HandleHttpErrorService } from '../@base/handleHttpError/handle-http-error.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  get(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.baseUrl + 'api/Persona')
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Persona[]>('Consulta Persona', null))
      );
  }
  getGrupal(): Observable<Pagos[]> {
    return this.http.get<Pagos[]>(this.baseUrl + 'api/Pagos')
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Pagos[]>('Consulta Pagos', null))
      );
  }
  post(persona: Persona , edad): Observable<Persona> {
    console.log(edad);
    console.log(this.baseUrl + 'api/Persona', persona);
    persona.estado ='ACTIVO';
    return this.http.post<Persona>(this.baseUrl + 'api/Persona', persona)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Persona>('Registrar Persona', null))
      );
  }
  //Juardar pagos
  postPagos(pagos:Pagos) : Observable<Pagos>{
    console.log(pagos);
    return this.http.post<Pagos>(this.baseUrl + 'api/Pagos', pagos)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Pagos>('Registrar Pago', null))
      );
  }
  Buscar(identificacion){ 
    return this.http.get<Persona[]>(this.baseUrl + 'api/Persona/'+ identificacion)
    .pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<Persona[]>('Consulta Persona', null))
    );
  }
  put(persona: Persona){
    return this.http.put<Persona>(this.baseUrl + 'api/Persona', persona)
    .pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<Persona>('Editar Persona', null))
    );
  }
}
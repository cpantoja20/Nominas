import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { HandleHttpErrorService } from 'src/app/@base/handleHttpError/handle-http-error.service';
import { Prestamos } from 'src/app/nomina/models/Prestamos';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }
  get(): Observable<Prestamos[]> {
    return this.http.get<Prestamos[]>(this.baseUrl + 'api/Prestamos')
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Prestamos[]>('Consulta Prestamos', null))
      );
  }
  Buscar(identificacion){ 
    return this.http.get<Prestamos[]>(this.baseUrl + 'api/Prestamos/'+ identificacion)
    .pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<Prestamos[]>('Consulta Prestamos', null))
    );
  }
  post(prestamos: Prestamos): Observable<Prestamos> {
    console.log(prestamos);
    return this.http.post<Prestamos>(this.baseUrl + 'api/Prestamos', prestamos)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Prestamos>('Registrar Prestamos', null))
      );
  }
}

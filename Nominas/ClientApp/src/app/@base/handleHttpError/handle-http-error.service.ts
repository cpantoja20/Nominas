import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AlertModalComponent } from '../alertModel/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorService {

  constructor(private modalService: NgbModal, private router: Router) { }
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status == "500") {
        this.mostrarError500(error);
      }
      else if (error.status == "400") {
        this.mostrarError400(error);
      }
      else if (error.status == "401") {
        this.mostrarError(error);
      }

      return of(result as T);
    };
  }
  public log(message: string) {
    console.log(message);
  }
  private mostrarError(error: any): void {
    console.error(error);
  }
  private mostrarError500(error: any): void {
    console.error(error);
  }

  private mostrarError400(error: any): void {

    console.error(error);
    let contadorValidaciones: number = 0;
    let mensajeValidaciones: string =
      `Señor(a) usuario(a), se han presentado algunos errores de validación, por favor revíselos y vuelva a realizar la operación.<br/><br/>`;

    for (const prop in error.error.errors) {
      contadorValidaciones++;
      mensajeValidaciones += `<strong>${contadorValidaciones}. ${prop}:</strong>`;

      error.error.errors[prop].forEach(element => {
        mensajeValidaciones += `<br/> - ${element}`;
      });

      mensajeValidaciones += `<br/>`;
    }

    const modalRef = this.modalService.open(AlertModalComponent);
    modalRef.componentInstance.title = 'Mensaje de Error';
    modalRef.componentInstance.message = mensajeValidaciones;

  }

}



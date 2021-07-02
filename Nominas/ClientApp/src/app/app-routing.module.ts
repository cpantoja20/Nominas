import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PersonaConsultaComponent } from './nomina/persona-consulta/persona-consulta.component';
import { PersonaRegistroComponent } from './nomina/persona-registro/persona-registro.component';
import { PrestamoComponent } from './nomina/prestamo/prestamo.component';
import { PagoComponent } from './nomina/pago/pago.component';
import { DardebajaComponent } from './nomina/dardebaja/dardebaja.component';
import { EditarComponent } from './nomina/editar/editar.component';
import { IndividualComponent } from './nomina/informes/individual/individual.component';
import { GrupalComponent } from './nomina/informes/grupal/grupal.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'personaConsulta',
    component: PersonaConsultaComponent
  },
  {
    path: 'personaRegistro',
    component: PersonaRegistroComponent, /*canActivate: [AuthGuard]*/
  },

  { path: 'login', 
  component: LoginComponent
  },

  {
    path: 'prestamo',
    component: PrestamoComponent
  },
  {
    path: 'pago',
    component: PagoComponent
  },
  {
    path: 'dardebaja',
    component: DardebajaComponent
  },
  {
    path: 'editar',
    component: EditarComponent
  },
  {
    path: 'individual',
    component: IndividualComponent
  },
  {
    path: 'grupal',
    component: GrupalComponent
  }
 
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { PersonaConsultaComponent } from './nomina/persona-consulta/persona-consulta.component';
import { PersonaRegistroComponent } from './nomina/persona-registro/persona-registro.component';
import { PrestamoComponent } from './nomina/prestamo/prestamo.component';
import { PagoComponent } from './nomina/pago/pago.component';
import { DardebajaComponent } from './nomina/dardebaja/dardebaja.component';
import { EditarComponent } from './nomina/editar/editar.component';
import { AppRoutingModule } from './app-routing.module';
import { IndividualComponent } from './nomina/informes/individual/individual.component';
import { GrupalComponent } from './nomina/informes/grupal/grupal.component';
import { LoginComponent } from './login/login.component';
import { AlertModalComponent } from './@base/alertModel/alert-modal/alert-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipefiltroPersonaPipe } from './pipe/pipefiltro-persona.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PersonaConsultaComponent,
    PersonaRegistroComponent,
    PrestamoComponent,
    PagoComponent,
    DardebajaComponent,
    EditarComponent,
    IndividualComponent,
    GrupalComponent,
    LoginComponent,
    AlertModalComponent,
    PipefiltroPersonaPipe
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ]),
    AppRoutingModule,
    NgbModule
  ],
  entryComponents : [AlertModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

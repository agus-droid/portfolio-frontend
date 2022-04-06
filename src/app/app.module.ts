import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { UsersService } from './services/user.service';
import { HabilidadComponent } from './components/habilidad/habilidad.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { InterceptorService } from './services/interceptor.service';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { EducacionesComponent } from './components/educaciones/educaciones.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciasComponent } from './components/experiencias/experiencias.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HabilidadComponent,
    HabilidadesComponent,
    ProyectoComponent,
    ProyectosComponent,
    EducacionesComponent,
    EducacionComponent,
    ExperienciasComponent,
    ExperienciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    UsersService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

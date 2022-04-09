import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Acerca } from '../models/acerca';

@Injectable({
  providedIn: 'root'
})
export class AcercaService {

  private API_URL = `${environment.baseURL}/acerca`;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Acerca[]> {
    return this.http.get<Acerca[]>(this.API_URL);
  }

  fetchImage(imageCode: string): Observable<Blob> {
    let url = `${environment.baseURL}/image/` + imageCode;
    return this.http.get(url, { responseType: 'blob' });
  }

  updateNombre(id: number, nombre: string): Observable<Acerca> {
    const params = new HttpParams().set('nombre', nombre)
    return this.http.put<Acerca>(`${environment.baseURL}/nombre/editar/${id}`, params);
  }

  updateTitulo(id: number, titulo: string): Observable<Acerca> {
    const params = new HttpParams().set('titulo', titulo)
    return this.http.put<Acerca>(`${environment.baseURL}/titulo/editar/${id}`, params);
  }

  updateResumen(id: number, resumen: string): Observable<Acerca> {
    const params = new HttpParams().set('resumen', resumen)
    return this.http.put<Acerca>(`${environment.baseURL}/resumen/editar/${id}`, params);
  }

  updateFoto(id: number, formData: FormData): Observable<Acerca> {
    return this.http.put<Acerca>(`${environment.baseURL}/foto/editar/${id}`, formData);
  }

  updateBanner(id: number, formData: FormData): Observable<Acerca> {
    return this.http.put<Acerca>(`${environment.baseURL}/banner/editar/${id}`, formData);
  }

}

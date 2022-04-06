import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private API_URL = `${environment.baseURL}/educacion`;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.API_URL);
  }

  fetchImage(imageCode: string): Observable<Blob> {
    let url = `${environment.baseURL}/image/` + imageCode;
    return this.http.get(url, { responseType: 'blob' });
  }

  delete(educacion: Educacion): any {
    return this.http.delete(`${this.API_URL}/borrar/${educacion.id}`);
  }

  add(formData: FormData): any {
    return this.http.post(`${this.API_URL}/nueva`, formData);
  }

  update(formData: FormData, educacion: Educacion): any {
    return this.http.put(`${this.API_URL}/editar/${educacion.id}`, formData);
  }

}

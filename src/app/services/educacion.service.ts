import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private API_URL = `${environment.baseURL}/educacion`;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get<any[]>(this.API_URL);
  }

  fetchImage(imageCode: string): Observable<Blob> {
    let url = `${environment.baseURL}/image/` + imageCode;
    return this.http.get(url, { responseType: 'blob' });
  }
}

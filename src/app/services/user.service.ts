import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../models/user";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root"
})
export class UsersService {
  currentUserSubject: BehaviorSubject<any>;
  private BASE_URL = environment.baseURL;
  constructor(
    private http: HttpClient,
    ) {
    console.log("El servicio esta funcionando");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("currentUser")||'{}'));
  }
  login(user: User): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/login`, user).pipe(map(data => {
      sessionStorage.setItem("currentUser", JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }));
  }
  get UsuarioAutenticado(){
    return this.currentUserSubject.value;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }
}

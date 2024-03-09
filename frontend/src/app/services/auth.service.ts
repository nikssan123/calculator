import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, firstValueFrom, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: add types
  private user: BehaviorSubject<any> = new BehaviorSubject({});
  globalUser = this.user.asObservable();
  constructor(private http: HttpClient) { }

  // TODO: fix types
  login(user: any) {
    return this.callApi("http://localhost:8000/api/auth/login", {
      password: user.password,
      email: user.email
    });
  }

  register(user: any) {
    return this.callApi("http://localhost:8000/api/auth/register", {
      password: user.password,
      email: user.email,
      username: user.username
    });
  }

  callApi(url: string, data: any){
    // Promise => const res:any = await firstValueFrom(this.http.post("http://localhost:8000/api/auth/login", data))
    return this.http.post(url, data)
      .pipe(
        map((res:any) => {
          this.setToken(res.token);
          this.user.next(res)
          return res;
        }),
        catchError((e: any, caught: Observable<any>) => {
          console.log(e);
          return of();
        })
      );
  }

  private setToken(token: any) {
    localStorage.setItem("token", token);
  }

  logOut(){
    localStorage.removeItem("token");
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem("token");
  }
}

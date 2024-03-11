import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, of } from "rxjs";
import { UserResponse, User } from "../types";
import { Location } from "@angular/common";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    URL = "http://localhost:8000/api/auth/";
    user: BehaviorSubject<UserResponse | {}> = new BehaviorSubject({});

    constructor(private http: HttpClient, private location: Location) {}

    login(user: Pick<User, "email" | "password">) {
        return this.callApi(this.URL + "login", {
            password: user.password,
            email: user.email,
        });
    }

    register(user: User) {
        return this.callApi(this.URL + "register", {
            password: user.password,
            email: user.email,
            username: user.username,
        });
    }

    tryLocalSignin() {
        if (this.isLoggedIn()) {
            const token = localStorage.getItem("token");
            const id = localStorage.getItem("userId");
            this.user.next({
                id,
                token,
            });
        }
    }

    callApi(url: string, data: any) {
        // Promise => const res:any = await firstValueFrom(this.http.post("http://localhost:8000/api/auth/login", data))
        return this.http.post<UserResponse>(url, data).pipe(
            map((res: UserResponse) => {
                this.setToken(res);
                this.user.next(res);
                return res;
            })
        );
    }

    private setToken(res: UserResponse) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.id);
    }

    logOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        this.user.next({});
        this.location.back();
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem("token");
    }

    setUser(user: UserResponse) {
        this.user.next(user);
    }

    getUser(): UserResponse {
        return this.user.value as UserResponse;
    }
}

import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { User, UserResponse } from "../types";

describe("AuthService", () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ Location ],
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should call login API and set token on successful login", () => {
        const userData: Pick<User, "email" | "password"> = {
            email: "test@test.com",
            password: "password",
        };
        const mockUserResponse: UserResponse = {
            id: "userId",
            token: "token",
            email: "test@test.com",
            username: "test",
        };

        service.login(userData).subscribe(res => {
            expect(res).toEqual(mockUserResponse);
            expect(localStorage.getItem("token")).toEqual("token");
            expect(localStorage.getItem("userId")).toEqual("userId");
            expect(service.user.value).toEqual(mockUserResponse);
        });

        const req = httpMock.expectOne("http://localhost:8000/api/auth/login");
        expect(req.request.method).toBe("POST");
        req.flush(mockUserResponse);
    });

    it("should call login API and set token on successful login", () => {
        const userData: Pick<User, "email" | "password"> = {
            email: "test@test.com",
            password: "password",
        };
        const mockUserResponse: UserResponse = {
            id: "userId",
            token: "token",
            email: "test@test.com",
            username: "test",
        };

        service.login(userData).subscribe(res => {
            expect(res).toEqual(mockUserResponse);
            expect(localStorage.getItem("token")).toEqual("token");
            expect(localStorage.getItem("userId")).toEqual("userId");
            expect(service.user.value).toEqual(mockUserResponse);
        });

        const req = httpMock.expectOne("http://localhost:8000/api/auth/login");
        expect(req.request.method).toBe("POST");
        req.flush(mockUserResponse);
    });

    it("should call login API and set token on successful register", () => {
        const userData: User = {
            email: "test@test.com",
            password: "password",
            username: "test",
        };
        const mockUserResponse: UserResponse = {
            id: "userId",
            token: "token",
            email: "test@test.com",
            username: "test",
        };

        service.register(userData).subscribe(res => {
            expect(res).toEqual(mockUserResponse);
            expect(localStorage.getItem("token")).toEqual("token");
            expect(localStorage.getItem("userId")).toEqual("userId");
            expect(service.user.value).toEqual(mockUserResponse);
        });

        const req = httpMock.expectOne("http://localhost:8000/api/auth/register");
        expect(req.request.method).toBe("POST");
        req.flush(mockUserResponse);
    });

    it("should remove tokens and navigate back on logout", () => {
        localStorage.setItem("token", "token");
        localStorage.setItem("userId", "userId");
        service.user.next({ id: "userId", token: "token", email: "test@test.com" });

        service.logOut();

        expect(localStorage.getItem("token")).toBeNull();
        expect(localStorage.getItem("userId")).toBeNull();
        expect(service.user.value).toEqual({});
    });
});

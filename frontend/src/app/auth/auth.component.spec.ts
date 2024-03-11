import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthComponent } from "./auth.component";
import { AuthService } from "../services/auth.service";
import { of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { UserResponse } from "../types";

describe("AuthComponent", () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let mockAuthService = {
        isLoggedIn: () => true,
        login: () => {},
        setUser: () => {},
        register: () =>
            of({ id: "123", token: "123", email: "test", username: "132" } as UserResponse),
    };

    let mockRoute = {
        snapshot: {
            url: [
                {
                    path: "register",
                },
            ],
        },
    };

    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ AuthComponent ],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
                {
                    provide: ActivatedRoute,
                    useValue: mockRoute,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AuthComponent);
        router = TestBed.inject(Router);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should initialize form with required fields", () => {
        expect(component.form.get("email")).toBeTruthy();
        expect(component.form.get("password")).toBeTruthy();
        expect(component.form.get("username")).toBeTruthy();
    });

    it("should show error when form is invalid on registration", () => {
        component.onSubmit(new Event("submit"));
        expect(component.error.invalid).toBeTruthy();
    });

    it("should call service register and navigate on successful registration", () => {
        component.form.setValue({ email: "test@gmail.com", password: "123", username: "testuser" });
        const mockRegister = spyOn(mockAuthService, "register").and.returnValues(
            of({
                username: "123",
                token: "123",
                id: "123",
                email: "123",
            })
        );
        const mockSetUser = spyOn(mockAuthService, "setUser").and.stub();
        const mockRouter = spyOn(router, "navigateByUrl").and.stub();

        component.onSubmit(new Event("submit"));

        expect(mockRegister).toHaveBeenCalled();
        expect(mockSetUser).toHaveBeenCalled();
        expect(mockRouter).toHaveBeenCalledWith("");
    });

    it("should show error on failed registration", () => {
        spyOn(component, "goToLogin").and.stub();
        try {
            spyOn(mockAuthService, "register").and.returnValue(
                of({}).pipe(_ => {
                    throw new Error();
                })
            );
        } catch (e) {
            expect(e).toBeDefined();
            expect(component.goToLogin).not.toHaveBeenCalled();
        }
    });
});

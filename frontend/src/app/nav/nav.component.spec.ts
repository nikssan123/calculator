import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NavComponent } from "./nav.component";
import { of } from "rxjs";
import { User, UserResponse } from "../types";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from "@angular/router";

describe("NavComponent", () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;
    let mockAuthService = {
        user: of({ id: "123", token: "123", email: "test", username: "132" }),
        logOut: () => {},
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

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ NavComponent ],
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

        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should initialize isLoggedIn and user properties", () => {
        const user = { id: "123", token: "123", email: "test", username: "132" };

        const userSpy = {
            ...jasmine.createSpyObj("AuthService", [ {} ]),
            user: of(user),
        };

        expect(component.user).toEqual(user);
        expect(component.isLoggedIn).toBeTruthy();
    });

    it("should call authService logOut on logout", () => {
        spyOn(mockAuthService, "logOut").and.stub();
        component.logout();
        expect(mockAuthService.logOut).toHaveBeenCalled();
    });
});

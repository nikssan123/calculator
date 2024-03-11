import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { AuthService } from "./services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

describe("AppComponent", () => {
    let fixture: ComponentFixture<AppComponent>;
    let mockAuthService = {
        tryLocalSignin: () => {},
        user: of({ id: "123", token: "123", email: "test", username: "132" }),
    };

    let mockRoute = {
        snapshot: {
            url: [
                {
                    path: "/",
                },
            ],
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ AppComponent ],
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

        fixture = TestBed.createComponent(AppComponent);
    });

    it("should create the app", () => {
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it("should call tryLocalSignin on initialization", () => {
        const mockLocalSignin = spyOn(mockAuthService, "tryLocalSignin").and.stub();

        fixture.detectChanges();

        expect(mockLocalSignin).toHaveBeenCalled();
    });
});

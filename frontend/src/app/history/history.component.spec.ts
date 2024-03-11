import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HistoryComponent } from "./history.component";
import { of } from "rxjs";
import { HistoryService } from "../services/history.service";
import { AuthService } from "../services/auth.service";

describe("HistoryComponent", () => {
    let component: HistoryComponent;
    let fixture: ComponentFixture<HistoryComponent>;
    let mockHistoryService = {
        getEquations: (id: string) => of([ "1 + 2", "2 + 3" ]),
    };
    let mockAuthService = {
        getUser: () => ({
            id: "123",
        }),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ HistoryComponent ],
            providers: [
                {
                    provide: HistoryService,
                    useValue: mockHistoryService,
                },
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should fetch equations from history service on init", () => {
        const equations = [ "2 + 2 = 4", "3 * 4 = 12" ];

        const mockGetEquations = spyOn(mockHistoryService, "getEquations").and.returnValue(
            of(equations)
        );

        component.ngOnInit();

        expect(mockGetEquations).toHaveBeenCalledWith("123");
        expect(component.equations).toEqual(equations);
    });
});

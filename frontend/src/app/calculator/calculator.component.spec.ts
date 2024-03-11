import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CalculatorComponent } from "./calculator.component";
import { Actions } from "../constants";
import { HistoryService } from "../services/history.service";
import { AuthService } from "../services/auth.service";
import { of } from "rxjs";

describe("CalculatorComponent", () => {
    let component: CalculatorComponent;
    let fixture: ComponentFixture<CalculatorComponent>;
    let mockHistoryService = {
        saveEquation: (id: string, equation: string) => of(),
    };
    let mockAuthService = {
        getUser: () => ({
            id: "123",
        }),
        isLoggedIn: () => true,
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ CalculatorComponent ],
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

        fixture = TestBed.createComponent(CalculatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should update current value when picking numbers", () => {
        component.pickNumber("1");
        expect(component.currValue).toEqual("1");
    });

    it("should update current value based on action - Add", () => {
        component.pickNumber("5");
        component.action(null, Actions.ADD);
        component.pickNumber("5");
        component.action(null, Actions.ADD);

        expect(component.currValue).toEqual("10");
    });

    it("should update current value based on action - Substract", () => {
        component.pickNumber("5");
        component.action(null, Actions.SUB);
        component.pickNumber("5");
        component.action(null, Actions.SUB);

        expect(component.currValue).toEqual("0");
    });

    it("should update current value based on action - Multiplication", () => {
        component.pickNumber("5");
        component.action(null, Actions.MULT);
        component.pickNumber("5");
        component.action(null, Actions.MULT);

        expect(component.currValue).toEqual("25");
    });

    it("should update current value based on action - Division", () => {
        component.pickNumber("25");
        component.action(null, Actions.DIV);
        component.pickNumber("5");
        component.action(null, Actions.DIV);

        expect(component.currValue).toEqual("5");
    });

    it("should handle division by zero", () => {
        component.pickNumber("5");
        component.action(null, Actions.DIV);
        component.pickNumber("0");
        component.action(null, Actions.DIV);
        expect(component.currValue).toEqual("NaN");
    });

    it("should save equation when logged in", () => {
        const mockSaveEquation = spyOn(mockHistoryService, "saveEquation").and.returnValues(of());
        const mockGetUser = spyOn(mockAuthService, "getUser").and.returnValue({ id: "123" });
        component.pickNumber("5");
        component.action(null, Actions.SUB);
        component.pickNumber("0");
        component.action(null, Actions.CALC);

        expect(mockGetUser).toHaveBeenCalledTimes(1);
        expect(mockSaveEquation).toHaveBeenCalledOnceWith("123", "5 - 0 = 5");
    });

    it("should not save equation when not logged in", () => {
        const mockSaveEquation = spyOn(mockHistoryService, "saveEquation").and.stub();
        const mockIsLoggedIn = spyOn(mockAuthService, "isLoggedIn").and.returnValue(false);
        component.pickNumber("5");
        component.action(null, Actions.SUB);
        component.pickNumber("0");
        component.action(null, Actions.CALC);

        expect(mockIsLoggedIn).toHaveBeenCalledTimes(1);
        expect(mockSaveEquation).not.toHaveBeenCalled();
    });
});

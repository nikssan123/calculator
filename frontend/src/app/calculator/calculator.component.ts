import { Component } from "@angular/core";
import { Actions } from "../constants";
import { HistoryService } from "../services/history.service";
import { AuthService } from "../services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-calculator",
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: "./calculator.component.html",
    styleUrl: "./calculator.component.css",
})
export class CalculatorComponent {
    currValue: string = "0";
    private prevValue: number = null;
    private isActionPressed = false;
    private lastAction = "";
    equation = "";
    Actions = Actions;
    private lastElement: HTMLElement;

    constructor(private historyService: HistoryService, private authService: AuthService) {}

    pickNumber(num: string) {
        // this.currValue = num;
        if (this.currValue === "0") {
            this.currValue = num.toString();
        } else if (this.isActionPressed) {
            this.currValue = num.toString();
            this.isActionPressed = false;
        } else {
            this.currValue = `${this.currValue}${num}`;
        }
    }

    action(event: any, action: string) {
        this.toggleActiveClass(event.target);
        switch (action) {
            case Actions.DIV:
                this.handleAction(Actions.DIV);
                break;
            case Actions.MULT:
                this.handleAction(Actions.MULT);
                break;
            case Actions.ADD:
                this.handleAction(Actions.ADD);
                break;
            case Actions.SUB:
                this.handleAction(Actions.SUB);
                break;
            case "del":
                this.currValue = "0";
                this.prevValue = null;
                this.lastAction = "";
                this.isActionPressed = false;
                break;
            case Actions.CALC:
                this.equation += ` ${this.lastAction} ${this.currValue}`;
                const result = this.calculate(this.lastAction);
                this.saveEquation(result);
                this.prevValue = null;
                this.equation = "";
                break;
            default:
                console.log("Not supported");
                break;
        }
    }

    private toggleActiveClass(target: HTMLElement) {
        if (this.lastElement) {
            this.lastElement.classList.toggle("active");
        }

        target.classList.toggle("active");
        this.lastElement = target;
    }

    private calculate(action: string): string {
        switch (action) {
            case Actions.ADD:
                return (this.currValue = (parseFloat(this.currValue) + this.prevValue).toString());
            case Actions.SUB:
                return (this.currValue = (this.prevValue - parseFloat(this.currValue)).toString());
            case Actions.MULT:
                return (this.currValue = (parseFloat(this.currValue) * this.prevValue).toString());
            case Actions.DIV:
                return (this.currValue = (this.prevValue / parseFloat(this.currValue)).toString());
            default:
                return "Not supported";
        }
    }

    private handleAction(action: string) {
        if (this.isActionPressed) {
            return;
        }
        this.isActionPressed = true;

        if (this.prevValue === null) {
            this.prevValue = parseFloat(this.currValue);
            this.equation += this.prevValue;
            this.lastAction = action;
            return;
        }

        this.equation += ` ${this.lastAction} ${this.currValue}`;
        this.prevValue = parseFloat(this.calculate(this.lastAction));
        this.lastAction = action;
    }

    private saveEquation(result: string) {
        if (this.authService.isLoggedIn()) {
            const userId = this.authService.getUser()["id"];
            this.historyService
                .saveEquation(userId, (this.equation += ` = ${result}`))
                .subscribe(() => {
                    console.log("successful save");
                });
        }

        return;
    }
}

import { Component } from '@angular/core';
import { Actions } from "../constants";
import { HistoryService } from '../services/history.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  	currValue:string = "0";
	private prevValue: number = null;
	private isActionPressed = false;
	private lastAction = "";
	equation = "";
	Actions = Actions;

	constructor(private historyService: HistoryService, private authService: AuthService) {}

	pickNumber(num: string) {
		// this.currValue = num;
		if(this.currValue === '0'){
			this.currValue = num.toString();
		}else if(this.isActionPressed){
			this.currValue = num.toString();
			this.isActionPressed = false;
		}else{
			this.currValue = `${this.currValue}${num}`;
		}
	}
	// TODO: cases -> ENUM
	action(action: string) {
		switch(action){
			// TODO: fix a bug - calculate last action not current one
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
				this.currValue = "0"
				this.prevValue = null;
				this.lastAction = "";
				this.isActionPressed = false;
				break;
			case Actions.CALC:
				this.equation += ` ${this.lastAction} ${this.currValue}`
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

	private calculate(action:string): string {
		switch(action){
			case Actions.ADD:
				return this.currValue = (parseFloat(this.currValue) + this.prevValue).toString();
			case Actions.SUB:
				return this.currValue = (this.prevValue - parseFloat(this.currValue)).toString();
			case Actions.MULT:
				return this.currValue = (parseFloat(this.currValue) * this.prevValue).toString();
			case Actions.DIV:
				return this.currValue = (this.prevValue / parseFloat(this.currValue)).toString();
			default:
				return "Not supported";
		}
	}

	private handleAction(action: string){
		if(this.isActionPressed){
			return;
		}
		this.isActionPressed = true;

		if(this.prevValue === null){
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
		if(this.authService.isLoggedIn()){
			const userId = this.authService.getUser()["id"];
			this.historyService.saveEquation(userId, this.equation += ` = ${result}` ).subscribe(() => {
				console.log("successful save");
			});
		}

		return;
	}
}

import { Component, OnInit } from "@angular/core";
import { EquationComponent } from "./equation/equation.component";
import { HistoryService } from "../services/history.service";
import { AuthService } from "../services/auth.service";

@Component({
    selector: "app-history",
    standalone: true,
    imports: [ EquationComponent ],
    templateUrl: "./history.component.html",
    styleUrl: "./history.component.css",
})
export class HistoryComponent implements OnInit {
    equations: any;
    constructor(private historyService: HistoryService, private authService: AuthService) {}

    ngOnInit(): void {
        const userId = this.authService.getUser()["id"];

        this.historyService.getEquations(userId).subscribe(res => {
            this.equations = res;
        });
    }
}

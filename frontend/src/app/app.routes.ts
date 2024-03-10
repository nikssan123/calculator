import { Routes } from '@angular/router';
import { CalculatorComponent } from "./calculator/calculator.component";
import { AuthComponent } from "./auth/auth.component"
import { HistoryComponent } from './history/history.component';
import { AuthGuard } from './services/AuthGuard';

export const routes: Routes = [
    { path: '', component: CalculatorComponent },
    { path: 'login', component: AuthComponent },
    { path: 'register', component: AuthComponent },
    { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
];

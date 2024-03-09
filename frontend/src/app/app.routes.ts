import { Routes } from '@angular/router';
import { CalculatorComponent } from "./calculator/calculator.component";
import { AuthComponent } from "./auth/auth.component"

export const routes: Routes = [
    { path: '', component: CalculatorComponent },
    { path: 'login', component: AuthComponent },
    { path: 'register', component: AuthComponent }
];

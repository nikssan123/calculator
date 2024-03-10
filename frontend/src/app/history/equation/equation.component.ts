import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-equation',
  standalone: true,
  imports: [],
  templateUrl: './equation.component.html',
  styleUrl: './equation.component.css'
})
export class EquationComponent {
  @Input() equations = ["1 + 2 + 5", "2 + 3"];

  // equations = []
}

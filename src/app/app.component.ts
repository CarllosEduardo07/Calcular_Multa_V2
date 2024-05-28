import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculadoraContratosComponent } from './components/calculadora-contratos/calculadora-contratos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalculadoraContratosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calcular_multa_v2';
}

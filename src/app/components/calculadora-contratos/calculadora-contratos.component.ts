import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'calculadora-contratos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculadora-contratos.component.html',
  styleUrl: './calculadora-contratos.component.css',
})
export class CalculadoraContratosComponent {
  vtb_valor_multa: any;
  mes_fidelidade: number = 12;
  mes_restante: string = '';
  diasRestante: any;
  valorDiasDoMes: number = 30;
  resultado_Calculo_Mes: string = ''




  calcular() {
    const mr_mes_restante = parseInt(this.mes_restante);
    const valor_multa_Contrato = (this.vtb_valor_multa / this.mes_fidelidade) * mr_mes_restante;
  
    console.log(valor_multa_Contrato);
    
    
    
    
    this.resultado_Calculo_Mes = `
      <span>Resultado da Fórmula</span>
      <p> M = ${this.vtb_valor_multa} &#247; ${this.mes_fidelidade} * ${mr_mes_restante} = ${valor_multa_Contrato}
      </p>`;
  }
}

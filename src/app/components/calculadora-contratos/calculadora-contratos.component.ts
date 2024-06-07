import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'calculadora-contratos',
  standalone: true,
  imports: [FormsModule, FeedbackComponent],
  templateUrl: './calculadora-contratos.component.html',
  styleUrl: './calculadora-contratos.component.css',
})
export class CalculadoraContratosComponent {
  input_Vtb_Valor_Multa: any;
  mes_fidelidade: number = 12;
  input_Mes_restante: string = '';
  input_Dias_Restante: string = '';
  valorDiasDoMes: number = 30;
  resultado_Calculo_Mes: string = '';
  resultado_Calculo_Dias: string = '';
  resultado_Valor_Total_Multa: string = '';
  texto: string = '';

  formatarValor(valor:number){
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  validacao(){
    if (this.input_Vtb_Valor_Multa === undefined) {
      throw alert('Digite o valor do beneficio do cliente');
    } else if (this.input_Mes_restante === '') {
      throw alert('Selecione a quantidade de meses para encerrar o Contrato');
    }else if (this.input_Dias_Restante === '') {
      throw alert('Selecione algum dia');
    }
  }

  calcular() {
    this.validacao()
    // calculo de mes
    const vtb_valor_multa = this.input_Vtb_Valor_Multa;
    const mr_mes_restante = parseInt(this.input_Mes_restante);
    const valor_multa_Mes = (vtb_valor_multa / this.mes_fidelidade) * mr_mes_restante;

    this.resultado_Calculo_Mes = `
      <span class="my-10 font-bold">Resultado da Fórmula:</span>
      <p> M = (${vtb_valor_multa} &#247; ${this.mes_fidelidade}) &#215; ${mr_mes_restante}</p>
      <p> M = ${this.formatarValor(valor_multa_Mes)}</p>`;

    //calculo de dias
    const dias_restantes = parseInt(this.input_Dias_Restante);
    const valor_multa_dias = (dias_restantes / this.valorDiasDoMes) * (vtb_valor_multa / this.mes_fidelidade);

    this.resultado_Calculo_Dias = `
    <span class="my-10 font-bold">Resultado da Fórmula:</span>
    <p> M = (${dias_restantes} &#247; ${this.valorDiasDoMes}) &#215; (${vtb_valor_multa} &#247; ${this.mes_fidelidade})</p>
    <p> M = (${(dias_restantes / this.valorDiasDoMes).toFixed(5)}) &#215; (${(vtb_valor_multa / this.mes_fidelidade).toFixed(2)})</p>
    <p> M = ${this.formatarValor(valor_multa_dias)}</p>`;

    this.resultado_Valor_Total_Multa = `<span class="font-semibold">Valor total da multa = ${this.formatarValor(valor_multa_Mes + valor_multa_dias)}</span>`;

    if (dias_restantes != 0) {
      this.texto = `Gerar multa no valor de <strong>${this.formatarValor(valor_multa_Mes + valor_multa_dias)}</strong>, falta <strong>${mr_mes_restante} meses</strong> e <strong>${dias_restantes} dias</strong> para encerrar a fidelidade.`;
    } else {
      this.texto = `Gerar multa no valor de <strong>${this.formatarValor(valor_multa_Mes + valor_multa_dias)}</strong>, falta <strong>${mr_mes_restante} meses</strong> para encerrar a fidelidade.`;
    }
  }
}

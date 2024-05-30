import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { differenceInDays, differenceInMonths } from 'date-fns';

@Component({
  selector: 'diferenca-entre-datas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './diferenca-entre-datas.component.html',
  styleUrl: './diferenca-entre-datas.component.css',
})
export class DiferencaEntreDatasComponent {
  inputDataInicial: string = '';
  inputDataFinal: string = '';
  dataInicial: any;
  dataFinal: any;

  calcular_diferenca_entre_datas() {
    const [anoInicial, mesInicial, diaInicial] = this.inputDataInicial.split('-').map(Number);
    const [anoFinal, mesFinal, diaFinal] = this.inputDataFinal.split('-').map(Number);

    this.dataInicial = new Date(anoInicial, mesInicial - 1, diaInicial);
    this.dataFinal = new Date(anoFinal, mesFinal - 1, diaFinal);


    const diferenca_Dias = differenceInDays(this.dataFinal, this.dataInicial);
    const diferenca_Mes = differenceInMonths(this.dataFinal, this.dataInicial);

    console.log(new Date(2024, 4, 31));

    console.log('dias', diferenca_Dias);
    console.log('meses', diferenca_Mes);
  }

  constructor() {}
}

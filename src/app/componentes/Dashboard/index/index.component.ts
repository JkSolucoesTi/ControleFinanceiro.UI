import { Component, OnInit, ViewChild } from '@angular/core';
import { DashBoardService } from 'src/app/services/dash-board.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  qtdCartoes!:number;
  ganhoTotal!:number;
  despesaTotal!:number;
  saldo!:number;
  anoAtual:number = new Date().getFullYear();
  anoInicial:number = this.anoAtual - 10;
  anos!:number[];

  usuarioId:any = localStorage.getItem("usuarioId");

  public lineChartData!: ChartConfiguration['data'];
 
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },
    plugins: {
      legend: { display: true },      
      }
  };

  labels!:any[];
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private dashboardService : DashBoardService) { }

  ngOnInit(): void {
    this.dashboardService.PegarDadosCardsDashboard(this.usuarioId).subscribe(resultado =>{
      this.qtdCartoes = resultado.qtdCartoes;
      this.ganhoTotal = resultado.ganhoTotal;
      this.despesaTotal = resultado.despesaTotal;
      this.saldo = resultado.saldo;
    });

    this.anos = this.CarregarAnos(this.anoInicial,this.anoAtual);
    this.dashboardService.PegarDadosAnuaisPeloUsuarioId(this.usuarioId,this.anoAtual).subscribe(resultado =>{
     this.lineChartData = [
        {
        data: this.RetornarValoresGanhos(resultado.meses,resultado.ganhos),
        label: 'Ganho de R$',
        fill:false,
        borderColor:'#27ae60',
        backgroundColor:'#27ae60',
        pointBackgroundColor:'#27ae60',
        pointHoverBackgroundColor:'#27ae60',
        pointHoverBorderColor:'#27ae60'
        }
        ,
        {
          data: this.RetornarValoresDespesa(resultado.meses,resultado.despesas),
          label: 'Despesa de R$',
          fill:false,
          borderColor:'#c0392b',
          backgroundColor:'#c0392b',
          pointBackgroundColor:'#c0392b',
          pointHoverBackgroundColor:'#c0392b',
          pointHoverBorderColor:'#c0392b'
          }
      ],
      this.labels = this.RetornarMeses(resultado.meses);
    })
  }

  CarregarAnos(anoInicial: number, anoAtual: number): number[] {
    const anos = [];

    while(anoInicial <= anoAtual){
      anos.push(anoInicial);
      anoInicial = anoInicial + 1;
    }

    return anos;
  }

  RetornarMeses(dadosMeses:any):string[]{
    const meses = [];
    let indice = 0;
    const qtdMeses = dadosMeses.length;
    
    while(indice < qtdMeses){
      meses.push(dadosMeses[indice].nome);
      indice = indice + 1;
    }

    return meses;
  }

  RetornarValoresGanhos(dadosMeses:any,dadosGanhos:any):number[]{
    const valores = [];
    let indiceMeses = 0;
    let indiceGanhos = 0;
    const qtdMeses = dadosMeses.length;
    const qtdGanhos = dadosGanhos.length;

    while(indiceMeses <= qtdMeses -1){
      if(indiceMeses <= qtdGanhos -1){
        if(dadosGanhos[indiceGanhos].mesId === dadosMeses[indiceMeses].mesId){
          valores.push(dadosGanhos[indiceGanhos].valores);
          indiceGanhos = indiceGanhos + 1;
          indiceMeses = indiceMeses + 1;
        }
        else{
          valores.push(0);
          indiceMeses = indiceMeses + 1;
        }
      }
      else{
        valores.push(0);
        indiceMeses = indiceMeses + 1;
      }
    }

    return valores;
  }

  RetornarValoresDespesa(dadosMeses:any,dadosDespesa:any):number[]{
    const valores = [];
    let indiceMeses = 0;
    let indiceDespesa = 0;
    const qtdMeses = dadosMeses.length;
    const qtdDespesa = dadosDespesa.length;

    while(indiceMeses <= qtdMeses -1){
      if(indiceMeses <= qtdDespesa -1){
        if(dadosDespesa[indiceDespesa].mesId === dadosMeses[indiceMeses].mesId){
          valores.push(dadosDespesa[indiceDespesa].valores);
          indiceDespesa = indiceDespesa + 1;
          indiceMeses = indiceMeses + 1;
        }
        else{
          valores.push(0);
          indiceMeses = indiceMeses + 1;
        }
      }
      else{
        valores.push(0);
        indiceMeses = indiceMeses + 1;
      }
    }
    return valores;
  }

  CarregarDados(anoSelecionado : number):void{
    this.dashboardService.PegarDadosAnuaisPeloUsuarioId(this.usuarioId,anoSelecionado).subscribe(resultado =>{
      this.labels = this.RetornarMeses(resultado.meses);
      this.lineChartData.datasets = [
        {
        data: this.RetornarValoresGanhos(resultado.meses,resultado.ganhos),
        label: 'Ganho de R$',
        fill:false,
        borderColor:'#27ae60',
        backgroundColor:'#27ae60',
        pointBackgroundColor:'#27ae60',
        pointHoverBackgroundColor:'#27ae60',
        pointHoverBorderColor:'#27ae60'
        },
        {
          data: this.RetornarValoresDespesa(resultado.meses,resultado.despesas),
          label: 'Despesa de R$',
          fill:false,
          borderColor:'#c0392b',
          backgroundColor:'#c0392b',
          pointBackgroundColor:'#c0392b',
          pointHoverBackgroundColor:'#c0392b',
          pointHoverBorderColor:'#c0392b'
          }
      ]
    })
  }

}

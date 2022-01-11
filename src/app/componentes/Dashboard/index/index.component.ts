import { Component, OnInit } from '@angular/core';
import { DashBoardService } from 'src/app/services/dash-board.service';

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

  constructor(private dashboardService : DashBoardService) { }

  ngOnInit(): void {

    this.dashboardService.PegarDadosCardsDashboard(this.usuarioId).subscribe(resultado =>{
      this.qtdCartoes = resultado.qtdCartoes;
      this.ganhoTotal = resultado.ganhoTotal;
      this.despesaTotal = resultado.despesaTotal;
      this.saldo = resultado.saldo;
    });

    this.anos = this.CarregarAnos(this.anoInicial,this.anoAtual);
  }
  CarregarAnos(anoInicial: number, anoAtual: number): number[] {
    const anos = [];

    while(anoInicial <= anoAtual){
      anos.push(anoInicial);
      anoInicial = anoInicial + 1;
    }

    return anos;
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DespesasService } from 'src/app/services/despesas.service';

@Component({
  selector: 'app-listagem-despesas',
  templateUrl: './listagem-despesas.component.html',
  styleUrls: ['./listagem-despesas.component.css']
})
export class ListagemDespesasComponent implements OnInit {

  despesas = new MatTableDataSource<any>();
  displayedColumns!:string[];
  usuarioId: any = localStorage.getItem("usuarioId");

  @ViewChild(MatPaginator, {static:true})
  paginator!:MatPaginator

  @ViewChild(MatSort,{static:true})
  sort!:MatSort


  constructor(private despesasService:DespesasService) { }

  ngOnInit(): void {

    this.despesasService.PegarDespesasPeloUsuarioId(this.usuarioId).subscribe(resultado =>{
      this.despesas.data = resultado;
      console.log(resultado)
      this.despesas.paginator = this.paginator;
      this.despesas.sort = this.sort;
    });

    this.displayedColumns = this.ExibirColunas();


  }
  ExibirColunas(): string[] {
    return ['numero','descricao','categoria','data','acoes'];
  }

}

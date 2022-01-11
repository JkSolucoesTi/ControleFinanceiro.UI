import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
  autoCompleteInput = new FormControl();
  opcoesCategoria:string[] =[];
  nomesCategoria!:Observable<string[]>;

  @ViewChild(MatPaginator, {static:true})
  paginator!:MatPaginator

  @ViewChild(MatSort,{static:true})
  sort!:MatSort


  constructor(private despesasService:DespesasService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.despesasService.PegarDespesasPeloUsuarioId(this.usuarioId).subscribe(resultado =>{
      this.despesas.data = resultado;

      resultado.forEach((despesa) =>{
        this.opcoesCategoria.push(despesa.categoria.nome);
      });

      console.log(resultado)
      this.despesas.paginator = this.paginator;
      this.despesas.sort = this.sort;
    });

    this.displayedColumns = this.ExibirColunas();

    this.nomesCategoria  = this.autoCompleteInput.valueChanges.pipe(startWith(''), map(nome => this.FiltrarCategorias(nome)));
  }
  FiltrarCategorias(nomeCategoria : string) : string[]  {
    if(nomeCategoria.trim().length >= 4){
      this.despesasService.FiltrarDespesas(nomeCategoria.toLowerCase()).subscribe(resultado =>{
        this.despesas.data = resultado;
      })
    }
    else{

      if(nomeCategoria === ''){
        this.despesasService.PegarDespesasPeloUsuarioId(this.usuarioId).subscribe(resultado => {
          this.despesas.data = resultado;
        })
      }
    }

    return this.opcoesCategoria.filter(despesa => despesa.toLowerCase().includes(nomeCategoria.toLowerCase()))
  }
  ExibirColunas(): string[] {
    return ['numero','descricao','categoria','data','acoes'];
  }

  AbrirDialog(despesaId:number,valor:string):void{
    this.dialog.open(DialogExclusaoDespesasComponent,{
      data : {
        despesaId : despesaId,
        valor : valor
      }
    })
    .afterClosed().subscribe(resultado => {
      if(resultado === true){
        this.despesasService.PegarDespesasPeloUsuarioId(this.usuarioId).subscribe(registros =>{
          this.despesas.data = registros;
          this.despesas.paginator = this.paginator;          
        })
        this.displayedColumns = this.ExibirColunas();
      }
    })
  }
}

@Component({
  selector:"app-dialog-exclusao-despesa",
  templateUrl:"dialog-exclusao-despesa.componet.html"
})
export class DialogExclusaoDespesasComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any ,
  private despesaService: DespesasService,
  private snackBar: MatSnackBar
  ){}

  ExcluirDespesa(despesaId : number){

    this.despesaService.ExcluirDespesa(despesaId).subscribe(resultado =>{
      this.snackBar.open(resultado.mensagem,"Exclusão",{
        duration: 2000,
        horizontalPosition:'right',
        verticalPosition: 'top'
      });
    });
  }

}
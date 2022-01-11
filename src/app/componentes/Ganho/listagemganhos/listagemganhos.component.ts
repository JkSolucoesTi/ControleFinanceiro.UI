import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GanhosService } from 'src/app/services/ganhos.service';

@Component({
  selector: 'app-listagemganhos',
  templateUrl: './listagemganhos.component.html',
  styleUrls: ['./listagemganhos.component.css']
})
export class ListagemganhosComponent implements OnInit {

  ganhos = new MatTableDataSource<any>();
  usuarioId: any = localStorage.getItem('usuarioId');

  @ViewChild(MatPaginator, {static:true})
  paginator!:MatPaginator;

  @ViewChild(MatSort, {static:true})
  sort!:MatSort;

  displayedColumns!:string[];

  autoCompleteInput = new FormControl();
  opcoesCategoria : string[] =[];
  nomesCategorias!: Observable<string[]>;

  constructor(private ganhosService:GanhosService , private matDialog:MatDialog) { }

  ngOnInit(): void {
    this.ganhosService.PegarGanhosPeloUsuarioId(this.usuarioId).subscribe(resultado =>{

     resultado.forEach(ganho =>{
       this.opcoesCategoria.push(ganho.categoria.nome)
     })

      this.ganhos.data = resultado;
      this.ganhos.paginator = this.paginator;
      this.ganhos.sort = this.sort;
    });

    this.displayedColumns = this.ExibirColunas();
    this.nomesCategorias = this.autoCompleteInput.valueChanges.pipe(startWith(''),map(nome => this.FitrarCategorias(nome)));

  }

  ExibirColunas():string[]{
    return ['descricao','categoria','valor','data','acoes']
  }

  FitrarCategorias(nome: string): string[] {
   
    if(nome.trim().length >= 4){
      this.ganhosService.FiltrarGanhos(nome.toLowerCase()).subscribe(resultado =>{
        this.ganhos.data = resultado;
      })
    }else{
      if(nome === ''){
        this.ganhosService.PegarGanhosPeloUsuarioId(this.usuarioId).subscribe(resultado =>{
          this.ganhos.data = resultado;
        })
      }
    }

    return this.opcoesCategoria.filter(nome => nome.toLowerCase().includes(nome.toLowerCase()));
  }

  AbrirDialog(ganhoId : string,valor : string):void{
    this.matDialog.open(DialogExclusaoGanhosComponent,{
      data:{
        ganhoId:ganhoId,
        valor:valor
      }
    }).afterClosed().subscribe(resultado => {
      if(resultado === true){
        this.ganhosService.PegarGanhosPeloUsuarioId(this.usuarioId).subscribe(registros =>{
          this.ganhos.data = registros;
          this.paginator = this.paginator;          
        });

        this.displayedColumns = this.ExibirColunas();
      }
    })
  }

}

@Component({
  selector:"app-dialog-exclusao-ganhos",
  templateUrl:"dialog-exclusao-ganhos.component.html"
})
export class DialogExclusaoGanhosComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private ganhoServices:GanhosService,
  private snackBar:MatSnackBar){
  }

  ExcluirGanho(ganhoId:string):void{
    this.ganhoServices.ExcluirGanho(ganhoId).subscribe(resultado =>{
      this.snackBar.open(resultado.mensagem,"Excluir",{
        duration:2000,
        horizontalPosition:'right',
        verticalPosition:'top'
      })
    })
  }

}
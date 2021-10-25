import { map, startWith } from 'rxjs/operators';
import { FuncoesService } from './../../../services/funcoes.service';
import { funcao } from './../../../models/funcao';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA , MatDialog} from '@angular/material/dialog';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-listagem-funcoes',
  templateUrl: './listagem-funcoes.component.html',
  styleUrls: ['./listagem-funcoes.component.css']
})
export class ListagemFuncoesComponent implements OnInit {

  funcoes = new MatTableDataSource<any>();
  /*funcoes!:funcao[];*/
  displayedColumns!:string[];

  /*O view child acessa um parametro do componente pai , no caso será o mattabledatasource */
  @ViewChild(MatPaginator,{static:true})
  paginator!:MatPaginator;

  @ViewChild(MatSort,{static:true})
  sort!:MatSort;

  autoCompleteInput = new FormControl();
  opcoesFuncoes: string[]=[];
  nomesFuncoes!: Observable<string[]>;

  testeObs!: Observable<string>;

  constructor(private funcaoService : FuncoesService,
              private matSnackBar : MatSnackBar,
              private dialog : MatDialog
              ) { }

  ngOnInit(): void {
    this.funcaoService.PegarTodos().subscribe(
      (resultado)=>{
        resultado.forEach(f =>{
          this.opcoesFuncoes.push(f.name);
        });
        /*this.funcoes = resultado;*/
        this.funcoes.data = resultado;
        this.funcoes.sort = this.sort;
        this.funcoes.paginator = this.paginator;
      }
    )

    this.displayedColumns = this.ExibirColunas();
   /* this.nomesFuncoes = this.autoCompleteInput.valueChanges.pipe(startWith(''),
    map(nome => this.FiltrarNomes(nome)))
    console.log(this.nomesFuncoes);
    */
    this.testeObs = this.autoCompleteInput.valueChanges;
    this.testeObs.subscribe(resultado => {
      this.FiltrarNomes(resultado)
    });
  }

  ExibirColunas():string[]
  {
    return ['Id','Name','Descricao','Acoes'];
  }

  FiltrarNomes(nome:string):string[]
  {
    if(nome.trim().length >= 4)
    {
      this.funcaoService.FiltrarFuncao(nome.toLowerCase()).subscribe(resultado =>{
        this.funcoes.data= resultado;
      })
    }
    else{
      if(nome ===''){
        this.funcaoService.PegarTodos().subscribe(resultado => {
          this.funcoes.data = resultado;
        })
      }
    }

    return this.opcoesFuncoes
    .filter(funcao => funcao.toLowerCase()
    .includes(nome.toLowerCase()))
  }

  FiltrarNomesEstudando(nome:string){
    console.log(nome);
  }

  AbrirDialog(funcaoId:string, nomeFuncao:string): void{
    this.dialog.open(DialogExclusaoFuncoesComponent,{
      data:{
        funcaoId : funcaoId,
        nomeFuncao : nomeFuncao
      }
    }).afterClosed().subscribe(resultado => {
      if(resultado === true){
        this.funcaoService.PegarTodos().subscribe((dados) =>{
          this.funcoes.data = dados;
          this.funcoes.paginator = this.paginator;
        });
        this.displayedColumns = this.ExibirColunas();
      }
    });
  }
}

@Component({
  selector:'app-dialog-exclusao-funcoes',
  templateUrl:'dialog-exclusao-funcoes.component.html'
})

export class DialogExclusaoFuncoesComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any ,
              private funcoesService:FuncoesService,
              private snackBar: MatSnackBar){
  }

  ExcluirFuncao(id : string):void{
    this.funcoesService.ExcluirFuncao(id).subscribe(resultado => {
      this.snackBar.open("Função excluída","Exclusão",{
        duration: 2000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
    })
  }
}

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CadastroService } from './../../services/cadastro.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cadastro } from 'src/app/models/Cadastro';


@Component({
  selector: 'app-listagem-cadastro',
  templateUrl: './listagem-cadastro.component.html',
  styleUrls: ['./listagem-cadastro.component.css']
})
export class ListagemCadastroComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  displayColumns : string[] =[];

  @ViewChild(MatPaginator,{static:true}) paginator!:MatPaginator;

  length = 10;
  pageSize = 3;
  pageSizeOptions: number[]=[5,10,15,20]

  constructor(private httpClient : CadastroService ,
              private router : Router ,
              private snackBar : MatSnackBar ,
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.httpClient.PegarTodos().subscribe(resultado => {
      this.dataSource.data = resultado;
      this.dataSource.paginator = this.paginator;
    })
    this.displayColumns = this.ExibirColunas();
  }

  ExibirColunas():string[]
  {
    return ['Nome','Endereço','Numero','CEP','Bairro','Sexo',"DataNascimento","Acoes"];
  }

  openDialog(cadastroId : any , nome:any , endereco:any){
    this.dialog.open(DialogElementsExampleDialog ,{
      /*Informações que serão injetadas no DialogElements */
      data:{
        cadastroId:cadastroId,
        nome : nome,
        endereco : endereco
      }
      }).afterClosed().subscribe(resultado =>{
      if(resultado === true){
        /*ação da tela de listagem de cadastros */
        this.httpClient.PegarTodos().subscribe((data) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        });
        this.displayColumns = this.ExibirColunas();
      }
    })
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.component.html',
})
export class DialogElementsExampleDialog {
/*É injetado no construtor o MAT_DIALOG_DATA para pegar pegar informações da tela */
  constructor(@Inject (MAT_DIALOG_DATA) public data:any,
              private cadastroService : CadastroService,
              private snackBar: MatSnackBar){

  }

  ExcluirCategoria(cadastroId:any): void{

    this.cadastroService.ExcluirCadastro(cadastroId).subscribe(resultado =>{
      this.snackBar.open("resultado.mensagem","Excluir",{
        duration: 2000,
        horizontalPosition:'right',
        verticalPosition:'top'
      })
    })

  }

}

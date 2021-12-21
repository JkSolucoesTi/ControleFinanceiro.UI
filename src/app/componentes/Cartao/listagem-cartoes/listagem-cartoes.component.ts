import {MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CartoesService } from 'src/app/services/cartoes.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-listagem-cartoes',
  templateUrl: './listagem-cartoes.component.html',
  styleUrls: ['./listagem-cartoes.component.css']
})
export class ListagemCartoesComponent implements OnInit {

cartoes = new MatTableDataSource<any>();
displayedColumns: string[]=[];
usuarioId: any = localStorage.getItem('usuarioId');

@ViewChild(MatPaginator,{static:true})
paginator!:MatPaginator;

@ViewChild(MatSort,{static:true})
sort!:MatSort;

autocompleteInput = new FormControl();
opcoesNumeros: string[]=[];
numeroCartoes!: Observable<string[]>;

  constructor(private cartoesService:CartoesService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.cartoesService.PegarCartoesPeloUsuarioId(this.usuarioId).subscribe(resultado => {
      resultado.forEach(numero => {
        this.opcoesNumeros.push(numero.numero);
      });

      this.cartoes.data = resultado;
      this.cartoes.paginator = this.paginator;
      this.cartoes.sort = this.sort;

      this.displayedColumns = this.ExibirColunas();
      this.numeroCartoes = this.autocompleteInput
                          .valueChanges.pipe(
                          startWith(''),
                          map(numero => this.FiltrarCartoes(numero))
                          );
    })
  }
  
ExibirColunas():string[]{
  return ['nome','bandeira','numero','limite','acoes'];
}

FiltrarCartoes(numero:string):string[]{
  if(numero.trim().length > 4){
    this.cartoesService.FiltrarCartoes(numero).subscribe(resultado => {
      this.cartoes.data = resultado;      
    })
  }
  else{
    if(numero ===''){
      this.cartoesService.PegarCartoesPeloUsuarioId(this.usuarioId).subscribe(resultado => {
        this.cartoes.data = resultado;
      })
    }
  }

  return this.opcoesNumeros.filter(nc => nc.toLowerCase().includes(numero.toLowerCase()));
}

AbrirDialog(cartaoId:any,cartaoNumero:any){
  console.log(cartaoId,cartaoNumero);
  this.dialog.open(DialogExcluirCartaoComponent ,{
    data : {
      cartaoId:cartaoId,
      cartaoNumero:cartaoNumero
    }
  }).afterClosed().subscribe(resultado => {
    if(resultado ===true){
      this.cartoesService.PegarCartoesPeloUsuarioId(this.usuarioId).subscribe(resultado => {
      this.cartoes.data = resultado;
      this.cartoes.paginator = this.paginator;
      this.cartoes.sort = this.sort;
      });
      this.displayedColumns = this.ExibirColunas();
    }
  })
}

}


@Component({
  selector:"app-excluir-cartao",
  templateUrl:"dialog-exclusao-cartao.component.html"
})

export class DialogExcluirCartaoComponent{

  constructor(@Inject (MAT_DIALOG_DATA) public data: any ,
              private cartoesService : CartoesService ,
              private snackBar : MatSnackBar){

  }

  ExcluirCartao(cartaoId:any){
    this.cartoesService.ExcluirCartao(cartaoId).subscribe(resultado => {
    this.snackBar.open("Exclusão realizada com sucesso","Excluir",{
      duration:2000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })
    })
  }

}
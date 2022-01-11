import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cartao } from 'src/app/models/Cartao';
import { Categoria } from 'src/app/models/Categoria';
import { Despesa } from 'src/app/models/Despesa';
import { Mes } from 'src/app/models/Mes';
import { CartoesService } from 'src/app/services/cartoes.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { DespesasService } from 'src/app/services/despesas.service';
import { MesService } from 'src/app/services/mes.service';

@Component({
  selector: 'app-atualizar-despesa',
  templateUrl: './atualizar-despesa.component.html',
  styleUrls: []
})
export class AtualizarDespesaComponent implements OnInit {

  despesa!: Observable<Despesa>
  valorDespesa!:number;
  formulario:any;
  cartoes!:Cartao[];
  categorias!:Categoria[];
  meses!:Mes[];
  erros!:string[];
  despesaId!:number;
  usuarioId: any = localStorage.getItem("usuarioId");

  constructor(private despesaService:DespesasService,
              private categoriaService:CategoriasService,
              private mesesService:MesService,
              private cartoesService:CartoesService,
              private route: ActivatedRoute,
              private router:Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.despesaId = this.route.snapshot.params.despesaId;
    console.log(this.despesaId);
    
    this.cartoesService.PegarCartoesPeloUsuarioId(this.usuarioId).subscribe(resultado =>{
      this.cartoes = resultado;
    });

    this.categoriaService.FiltrarCategoriasDepesas().subscribe(resultado => {
      this.categorias = resultado;
    })

    this.mesesService.PegarTodos().subscribe(resultado => {
      this.meses = resultado;
      console.log(this.meses);
    });

    this.despesaService.PegarDespesaPeloId(this.despesaId).subscribe(resultado =>{
      console.log(resultado);
      this.valorDespesa = resultado.valor;
      

      this.formulario = new FormGroup({
        despesaId : new FormControl(resultado.despesaId),
        cartaoId : new FormControl(resultado.cartaoId,[Validators.required]),
        descricao : new FormControl(resultado.descricao,[Validators.required,Validators.maxLength(50),Validators.minLength(1)]),
        categoriaId : new FormControl(resultado.categoriaId,[Validators.required]),
        valor : new FormControl(resultado.valor,[Validators.required]),
        dia : new FormControl(resultado.dia,[Validators.required]),
        mesId : new FormControl(resultado.mesId,[Validators.required]),
        ano : new FormControl(resultado.ano,[Validators.required]),
        usuarioId : new FormControl(resultado.usuarioId)
      })
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  VoltarListagem():void{
    this.router.navigate(['/despesa/listagemdespesas']);
  }

  EnviarFormulario(){
    this.erros = [];
    const despesa = this.formulario.value;

    this.despesaService.AtualizarDespesa(this.despesaId,despesa).subscribe(resultado =>{
      this.router.navigate(['/despesa/listagemdespesas']);
      this.snackBar.open(resultado.mensagem,"Atualizar",{
        duration: 2000,
        horizontalPosition : 'right',
        verticalPosition : 'top'
      });    
    },err => {
      if(err.status === 400){
        for(const campo in err.error.errors){
          if(err.error.errors.hasOwnProperty(campo)){
            this.erros.push(err.erros.errors[campo]);
          }
        }
      }
    }
    );
  }
}

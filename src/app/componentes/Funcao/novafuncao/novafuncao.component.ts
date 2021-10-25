import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuncoesService } from './../../../services/funcoes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-novafuncao',
  templateUrl: './novafuncao.component.html',
  styleUrls: ['../listagem-funcoes/listagem-funcoes.component.css']
})
export class NovafuncaoComponent implements OnInit {

  formulario:any;
  erros!:string[];

  constructor(private funcoesService: FuncoesService,
              private router:Router,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.formulario = new FormGroup({
      Nome : new FormControl(null,[Validators.required,Validators.maxLength(50)]),
      Descricao : new FormControl(null,[Validators.required,Validators.maxLength(50)])
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  EnviarFormulario():void
  {
    const funcao = this.formulario.value;
    this.erros=[];
    this.funcoesService.NovaFuncao(funcao).subscribe(
      resultado =>{
        this.router.navigate(['/funcoes/listagemfuncoes']);
        this.snackBar.open(resultado.mensagem,'Sucesso',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        });
      },
      erro => {
         if(erro.status ===400){
           for(const campo in erro.error.errors){
             if(erro.error.erros.hasOwnProperty(campo)){
               this.erros.push(erro.error.errors['campo']);
             }
           }
         }
      }
    )

  }

  VerificarItens(){
    const valores = this.formulario.get
  }

  VoltarListagem(){
    this.router.navigate(['/funcoes/listagemfuncoes']);
  }

}

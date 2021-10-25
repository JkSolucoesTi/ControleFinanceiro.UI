import { funcao } from './../../../models/funcao';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncoesService } from './../../../services/funcoes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autualizar-funcao',
  templateUrl: './autualizar-funcao.component.html',
  styleUrls: ['./autualizar-funcao.component.css']
})
export class AutualizarFuncaoComponent implements OnInit {

  funcaoId!:string;
  nomeFuncao!:string;
  formulario!:any;
  erros!:string[];


  constructor(private serviceFuncao:FuncoesService,
              private router:Router,
              private route: ActivatedRoute,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.funcaoId = this.route.snapshot.params.funcaoId;
    this.serviceFuncao.PegarPeloId(this.funcaoId).subscribe(resultado =>{
      this.nomeFuncao = resultado.name;

      this.formulario = new FormGroup({
        id : new FormControl(resultado.id,[]),
        name : new FormControl(resultado.name,[Validators.required,Validators.maxLength(50)]),
        descricao : new FormControl(resultado.descricao,[Validators.required,Validators.maxLength(50)])
      })
    })
    }

    get propriedade(){
      return this.formulario.controls;
    }

    EnviarFormulario(){
      this.erros=[];
      const funcao = this.formulario.value;
      this.serviceFuncao.AtualizarFuncao(this.funcaoId,funcao).subscribe(resultado =>{
        this.router.navigate(['/funcoes/listagemfuncoes']);
        this.snackBar.open(resultado.mensagem,'Atualizado',{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        });
      },
      erro =>{
        if(erro === 400){
          for(const campo in erro.erros.errors){
            if(erro.erros.errors.hasOwnProperty(campo)){
              this.erros.push(erro.error.erros[campo])
            }
          }
        }
      })
    }

    VoltarListagem(){
      this.router.navigate(["/funcoes/listagemfuncoes"]);
    }
}

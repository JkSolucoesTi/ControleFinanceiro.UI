import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartoesService } from './../../../services/cartoes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novo-cartao',
  templateUrl: './novo-cartao.component.html',
  styleUrls: ['./listagem-cartoes/listagem-cartoes.component.css']
})
export class NovoCartaoComponent implements OnInit {

  formulario: any;
  erros:string[]=[];
  usuarioId:any = localStorage.getItem('usuarioId');

  constructor(private cartoesService : CartoesService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.formulario = new FormGroup({
      nome : new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(20)]),
      bandeira : new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(15)]),
      numero : new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(20)]),
      limite : new FormControl('',[Validators.required]),
      usuarioId : new FormControl(this.usuarioId)
    });
  }

  get propriedade(){
    return this.formulario.controls;
  }

  VoltarListagem():void{
    this.router.navigate(['cartoes/listagemcartoes']);
  }

  EnviarFormulario():void
  {
    this.erros=[];
    const cartao = this.formulario.value;
    this.cartoesService.NovoCartao(cartao).subscribe(resultado =>{
      this.router.navigate(['cartoes/listagemcartoes']);
      this.snackBar.open(resultado.mensagem,"Cartão",{
        duration:2000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      });
    },(erro)=>{
      if(erro.status === 400){
        for(const campo in erro.error.errors){
          if(erro.error.errors.hasOwnProperty(campo)){
            this.erros.push(erro.error.errors[campo])
          }
        }
      }
    }
    );
  }

}

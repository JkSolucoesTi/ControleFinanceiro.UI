import { Router } from '@angular/router';
import { SexoService } from './../../../services/sexo.service';
import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, Validators} from '@angular/forms';
import { CadastroService } from './../../../services/cadastro.service';
import { Sexo } from 'src/app/models/Sexo';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-cadastro-ieq',
  templateUrl: './cadastro-ieq.component.html',
  styleUrls: ['./cadastro-ieq.component.css']
})
export class CadastroIEQComponent implements OnInit {

  sexo!:Sexo[];
  formulario!: any;

  constructor(private cadastroSevice : CadastroService ,
              private sexoService : SexoService ,
              private _snackBar : MatSnackBar,
              private router:Router)
  {
    this.formulario = new FormGroup({
      nome: new FormControl(null,[Validators.required,Validators.maxLength(50)]),
      endereco: new FormControl(null,[Validators.required,Validators.maxLength(50)]),
      numero: new FormControl(null,[Validators.required,Validators.maxLength(10)]),
      cep: new FormControl(null,[Validators.required,Validators.maxLength(8)]),
      bairro: new FormControl(null,[Validators.required,Validators.maxLength(50)]),
      sexoId : new FormControl(null,[Validators.required]),
      dataNascimento : new FormControl(null,[Validators.required])
    });

  }

  ngOnInit(): void {
   this.sexoService.PegarTodos().subscribe(resultado => {
     /*Variavel recebendo as informações*/
      this.sexo = resultado;
    },erro => {
      this._snackBar.open('Desculpe o servidor não respondeu ' + erro, '',{
        duration: 2000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom'
      })
    })
  }


  get propriedade(){
    return this.formulario.controls;
  }

  Enviar(){
    const cadastro = this.formulario.value;
    console.log(cadastro);
    this.cadastroSevice.NovoCadastro(cadastro).subscribe(
      resultado =>
      {
        this.router.navigate(['/juninho/listagemCadastroKids']);
        this._snackBar.open('Cadastro realizado com sucesso', 'Sucesso',{
          duration: 2000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom'
        })
      } , erro =>{
        this._snackBar.open('Desculpe o servidor não respondeu ' + erro, '',{
          horizontalPosition: 'start',
          verticalPosition: 'bottom'
      })
    });
  }

  Voltar(){
    this.router.navigateByUrl('/juninho/listagemCadastroKids');
  }

}

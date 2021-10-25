import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CadastroService } from './../../../services/cadastro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Sexo } from 'src/app/models/Sexo';
import { SexoService } from 'src/app/services/sexo.service';

@Component({
  selector: 'app-atualizar-cadastro',
  templateUrl: './atualizar-cadastro.component.html',
  styleUrls: ['./atualizar-cadastro.component.css']
})
export class AtualizarCadastroComponent implements OnInit {

  cadastroId!:number;
  nomeCadastro!:any;
  formulario:any;
  sexo!:Sexo[];
  sexoSelecionado:any;

  constructor(private cadastroService :CadastroService,
              private sexoService : SexoService,
              private router : Router,
              private activedRoute : ActivatedRoute,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.cadastroId = this.activedRoute.snapshot.params.cadastroId;
    this.cadastroService.PegarPorId(this.cadastroId).subscribe(resultado =>{
      console.log(resultado);
      this.formulario =  new FormGroup({
        cadastroId :     new FormControl(resultado.cadastroId),
        nome :           new FormControl(resultado.nome),
        endereco :       new FormControl(resultado.endereco),
        numero :         new FormControl(resultado.numero,[Validators.required]),
        cep :            new FormControl(resultado.cep,[Validators.required]),
        bairro :         new FormControl(resultado.bairro,[Validators.required]),
        sexoId :         new FormControl(resultado.sexo.sexoId,[Validators.required]),
        dataNascimento : new FormControl(resultado.dataNascimento,[Validators.required]),
      })
    });

    this.sexoService.PegarTodos().subscribe(resultado =>{
    this.sexo = resultado;
   });
}

get propriedade(){
  return this.formulario.controls;
}
EnviarFormulario(){
  const cadastro = this.formulario.value;
  this.cadastroService.AtualizarCadastro(this.cadastroId,cadastro).subscribe(
    resultado =>{
      console.log(resultado);
      this.router.navigate(["/juninho/listagemCadastroKids"]);
      this.snackBar.open("Cadastro atualizado com sucesso","Atualizar",{
        duration:2000,
        horizontalPosition:'right',
        verticalPosition:'bottom'
      })
    }
  )

}

Voltar()
{
  this.router.navigateByUrl("/juninho/listagemCadastroKids")
}

openDialog(){

}

}

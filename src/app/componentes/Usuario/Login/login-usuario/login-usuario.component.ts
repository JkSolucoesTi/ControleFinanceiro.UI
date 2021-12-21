import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from './../../../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  formulario!:any;
  erros!:string[];

  constructor(private usuarioService:UsuariosService,
              private router: Router) { }

  ngOnInit(): void {
    this.erros=[];
    this.formulario = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email,Validators.minLength(10),Validators.maxLength(50)]),
      senha : new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(50)])
    })
  }

  get propriedades(){
    return this.formulario.controls;
  }

EnviarFormulario():void{
  this.erros = [];
  const dadosLogin = this.formulario.value;
  this.usuarioService.LogarUsuario(dadosLogin).subscribe(resultado =>{
    const usuarioLogado = resultado.emailUsuarioLogado;
    const usuarioId = resultado.usuarioId;
    const tokenUsuarioLogado = resultado.tokenUsuarioLogado;
    localStorage.setItem("emailUsuarioLogado",usuarioLogado);
    localStorage.setItem("usuarioId",usuarioId);
    localStorage.setItem("tokenUsuarioLogado",tokenUsuarioLogado);

    this.router.navigate(['cartoes/listagemcartoes']);
  },
  erro => {
    if(erro.status === 400){
      for(const campos in erro.error.errors){
        if(erro.error.errors.hasOwnProperty(campos)){
          this.erros.push(erro.error.errors[campos])
        }
      }
    }
    else{
      this.erros.push(erro.error);
    }
  });
}

}

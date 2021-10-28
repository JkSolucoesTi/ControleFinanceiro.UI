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

  constructor(private usuarioService : UsuariosService,
              private router: Router) { }

  ngOnInit(): void {
    this.erros = [];
    this.formulario = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)]),
      senha : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
    })
  }

  get propriedades(){
    return this.formulario.control;
  }

}

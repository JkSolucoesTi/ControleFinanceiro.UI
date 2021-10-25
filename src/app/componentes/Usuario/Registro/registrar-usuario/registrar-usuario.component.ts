import { DadosRegistro } from './../../../../models/DadosRegistro';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from './../../../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

formulario!:any;
foto!: File;
erros!: string[];
  constructor(private usuarioService:UsuariosService,
              private router:Router ,
              private snackBar: MatSnackBar ) {
               }

  ngOnInit(): void {
    this.erros = [];
    this.formulario = new FormGroup({
      nomeusuario : new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(50)]),
      cpf: new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(20)]),
      profissao: new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(30)]),
      foto : new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)]),
      senha: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(50)])
    })
  }

get propriedade(){
  return this.formulario.controls;
}

SelecionarFoto(fileInput:any):void{
  this.foto = fileInput.target.files[0] as File;
  console.log(this.foto);
  const reader = new FileReader();
  reader.onload = function(e: any){
    document.getElementById('foto')?.removeAttribute('hidden');
    document.getElementById('foto')?.setAttribute('src',e.target.result);
    console.log(e.target.result);
  }
  reader.readAsDataURL(this.foto);

}

EnviarFormulario():void{
  const usuario = this.formulario.value;
  const formData :FormData = new FormData();
  if(this.foto != null){
    formData.append('file',this.foto,this.foto.name);
  }

  this.usuarioService.SalvarFoto(formData).subscribe(resultado => {
    const dadosRegistros : DadosRegistro = new DadosRegistro();
    dadosRegistros.nomeusuario = usuario.nomeusuario;
    dadosRegistros.profissao = usuario.profissao;
    dadosRegistros.cpf = usuario.cpf;
    dadosRegistros.foto = resultado.foto;
    dadosRegistros.senha = usuario.senha;
    dadosRegistros.email = usuario.email;
    console.log(usuario);

    this.usuarioService.RegistrarUsuario(usuario).subscribe(dados =>{
      this.router.navigate(['categorias/listagemcategorias']);
    });

  });
}
}

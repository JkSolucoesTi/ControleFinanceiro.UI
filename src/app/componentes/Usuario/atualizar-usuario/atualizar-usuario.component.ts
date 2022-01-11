import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AtualizarUsuario } from 'src/app/models/AtualizarUsuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-atualizar-usuario',
  templateUrl: './atualizar-usuario.component.html',
  styleUrls: ['./atualizar-usuario.component.css']
})
export class AtualizarUsuarioComponent implements OnInit {

  formulario:any;
  usuarioId: any = localStorage.getItem('usuarioId');
  emailUsuario!:string;
  urlFoto!: SafeResourceUrl;
  foto!: File;
  fotoAnterior!: File;
  erros!:string[];

  constructor(private router: Router,
    private usuarioService: UsuariosService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.usuarioService.RetornarFotoUsuario(this.usuarioId).subscribe(resultado=>{
      this.fotoAnterior = resultado.imagem;
      this.urlFoto = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + resultado.imagem);
    });

    this.usuarioService.PegarUsuarioPeloId(this.usuarioId).subscribe(resultado => {
      this.emailUsuario = resultado.email;

      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        username: new FormControl(resultado.userName,[Validators.required,Validators.minLength(6),Validators.maxLength(30)]),
        email: new FormControl(resultado.email,[Validators.required,Validators.minLength(10),Validators.maxLength(50),Validators.email]),
        cpf : new FormControl(resultado.cpf,[Validators.required,Validators.minLength(1),Validators.maxLength(20)]),
        profissao: new FormControl(resultado.profissao,[Validators.required,Validators.minLength(10,),Validators.maxLength(30)]),
        foto : new FormControl('')
      })
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  SelecionarFoto(fileInput:any):void{
      this.foto = fileInput.target.files[0] as File;

      const reader = new FileReader();
      reader.onload = function(e:any){
        document.getElementById('foto')?.removeAttribute('hidden');
        document.getElementById('foto')?.setAttribute('src',e.target.result);    
      }     
      reader.readAsDataURL(this.foto);        
  }

  Voltar(){
    this.router.navigate(['/cartoes/listagemcartoes']);
  }

  EnviarFormulario(){
    const dados = this.formulario.value;
    console.log(dados)

    if(this.foto != null){
      const formData: FormData = new FormData();
      formData.append('file',this.foto,this.foto.name);

      this.usuarioService.SalvarFoto(formData).subscribe(resultado =>{
        const atualizarUsuarioViewModel: AtualizarUsuario = new AtualizarUsuario();
        atualizarUsuarioViewModel.id = dados.id;
        atualizarUsuarioViewModel.userName = dados.username;
        atualizarUsuarioViewModel.cpf = dados.cpf;
        atualizarUsuarioViewModel.email = dados.email;
        atualizarUsuarioViewModel.profissao = dados.profissao;
        atualizarUsuarioViewModel.foto = resultado.foto;

        this.usuarioService.AtualizarUsuario(atualizarUsuarioViewModel).subscribe(resposta =>{
          this.router.navigate(['/cartoes/listagemcartoes'])
          this.snackBar.open(resposta.mensagem,"Atualização",{
            duration: 2000,
            horizontalPosition:'right',
            verticalPosition: 'top'
          });
        }, err =>{
          if(err.status === 400){
            for(const campo in err.error.errors){
              if(err.error.errors.hasOwnProperty(campo)){
                this.erros.push(err.error.errors[campo])
              }
            }
          }
        }
        );
      }, err =>{
        if(err === 500){
          this.erros.push("Erro ao tentar salvar a foto")
        }
      })
    }else{

      const atualizarUsuarioViewModel: AtualizarUsuario = new AtualizarUsuario();
      atualizarUsuarioViewModel.id = dados.id;
      atualizarUsuarioViewModel.userName = dados.username;
      atualizarUsuarioViewModel.cpf = dados.cpf;
      atualizarUsuarioViewModel.email = dados.email;
      atualizarUsuarioViewModel.profissao = dados.profissao;
      atualizarUsuarioViewModel.foto = this.fotoAnterior;

        this.usuarioService.AtualizarUsuario(atualizarUsuarioViewModel).subscribe(resposta =>{
          this.router.navigate(['/cartoes/listagemcartoes'])
          this.snackBar.open(resposta.mensagem,"Atualização",{
            duration: 2000,
            horizontalPosition:'right',
            verticalPosition: 'top'
          });
        }, err =>{
          if(err.status === 400){
            for(const campo in err.error.errors){
              if(err.error.errors.hasOwnProperty(campo)){
                this.erros.push(err.error.errors[campo])
              }
            }
          }
        }
      )
    }
  }
}

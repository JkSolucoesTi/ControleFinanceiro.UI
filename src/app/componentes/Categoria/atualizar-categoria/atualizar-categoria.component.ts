import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TiposService } from 'src/app/services/tipos.service';
import { CategoriasService } from './../../../services/categorias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { Tipo } from 'src/app/models/Tipo';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-atualizar-categoria',
  templateUrl: './atualizar-categoria.component.html',
  styleUrls: ['../listagem-categoria/listagem-categoria.component.css']
})
export class AtualizarCategoriaComponent implements OnInit {

  erros!:string[];
  nomeCategoria!: string;
  categoriaId!: number;
  categoria!: Observable<Categoria>;
  tipos!: Tipo[];
  formulario: any;

  constructor(private router: Router ,
              private route : ActivatedRoute,
              private categoriaService : CategoriasService,
              private tipoService: TiposService,
              private snackBar : MatSnackBar
              ) { }

  ngOnInit(): void {
    this.erros =[];
    this.categoriaId = this.route.snapshot.params.categoriaId;
    this.tipoService.PegarTodos().subscribe(resultado => {
      this.tipos = resultado;
    });

    this.categoriaService.PegarCategoriaPeloId(this.categoriaId).subscribe(resultado =>{
      this.nomeCategoria = resultado.nome;
      this.formulario = new FormGroup({
        categoriaId : new FormControl(resultado.categoriaId),
        nome : new FormControl(resultado.nome ,[Validators.required, Validators.maxLength(50)]),
        icone : new FormControl(resultado.icone , [Validators.required, Validators.maxLength(50)]),
        tipoId : new FormControl(resultado.tipoId , [Validators.required])
      })
    });

  }

  get propriedade(){
    return this.formulario.controls;
  }

  VoltarListagem() :void{
    this.router.navigate(['categorias/listagemcategorias']);
  }

  EnviarFormulario():void{
    const categoria = this.formulario.value;
    this.erros =[];
    this.categoriaService.AtualizarCategoria(this.categoriaId,categoria)
    .subscribe(resultado =>{
      this.router.navigate(['categorias/listagemcategorias']);
        this.snackBar.open(resultado.mensagem,'Inserir',{
        horizontalPosition : 'right',
        verticalPosition: 'top'
      } )
    },
    erro => {
      if(erro.status === 400){
        for(const campos in erro.error.errors){
          if(erro.error.errors.hasOwnProperty(campos)){
            this.erros.push(erro.error.errors[campos])
          }
        }
      }
    });
  }

}

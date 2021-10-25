import { CategoriasService } from './../../../services/categorias.service';
import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/Tipo';
import { TiposService } from 'src/app/services/tipos.service';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar ,MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['../listagem-categoria/listagem-categoria.component.css']
})
export class NovaCategoriaComponent implements OnInit {

  erros!: string[];
  formulario!: any;
  tipos!: Tipo[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private tiposService : TiposService ,
              private categoriaService : CategoriasService ,
              private router : Router ,
              private snackBar : MatSnackBar) { }

  get propriedade(){
    return this.formulario.controls;
  }

  ngOnInit(): void {
    this.erros = [];
    this.tiposService.PegarTodos().subscribe(
      resultado => {
        this.tipos = resultado;
      }
    );

    this.formulario = new FormGroup({
      nome: new FormControl(null, [Validators.required , Validators.maxLength(50)]),
      icone: new FormControl(null, [Validators.required , Validators.maxLength(15)]),
      tipoId: new FormControl(null,[Validators.required]),
    })
  }

  EnviarFormulario(): void{
    this.erros =[];
    const categoria = this.formulario.value;
    console.log(categoria);
    this.categoriaService.NovaCategoria(categoria).subscribe(
      (resultado) =>{
        this.router.navigate(['categorias/listagemcategorias']);
        this.snackBar.open(resultado.nome,'Nova Categoria',{
        horizontalPosition : this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
      },
      (err) =>{
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

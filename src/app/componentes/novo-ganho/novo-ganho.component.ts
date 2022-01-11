import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { Mes } from 'src/app/models/Mes';
import { CategoriasService } from 'src/app/services/categorias.service';
import { GanhosService } from 'src/app/services/ganhos.service';
import { MesService } from 'src/app/services/mes.service';

@Component({
  selector: 'app-novo-ganho',
  templateUrl: './novo-ganho.component.html',
  styleUrls: ['./novo-ganho.component.css']
})
export class NovoGanhoComponent implements OnInit {

  formulario:any;
  categorias!:Categoria[];
  meses!:Mes[];
  usuarioId:any =localStorage.getItem("usuarioId");
  erros!:string[];


  constructor(private router:Router
              ,private ganhoService:GanhosService
              ,private categoriaService:CategoriasService
              ,private mesesService:MesService
              ,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.categoriaService.FiltrarCategoriasGanhos().subscribe(resultado => {
      this.categorias = resultado;
    });

    this.mesesService.PegarTodos().subscribe(resultado => {
      this.meses = resultado;
    });

    this.formulario = new FormGroup({
      descricao: new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(50)]),
      categoriaId : new FormControl('',Validators.required),
      valor : new FormControl('',Validators.required),
      dia : new FormControl('',Validators.required),
      mesId : new FormControl('',Validators.required),
      ano : new FormControl('', Validators.required),
      usuarioId : new FormControl(this.usuarioId)    
    })
  }

get propriedade(){
  return this.formulario.controls;
}


VoltarListagem(){
  return this.router.navigate(['ganho/listagemganho']);
}

EnviarFormulario(){
  const ganho = this.formulario.value;
  this.ganhoService.NovoGanho(ganho).subscribe(resultado =>{
    this.router.navigate(['ganho/listagemganho']);
    this.snackBar.open(resultado.mensagem,"Inserir",{
      duration:2000,
      horizontalPosition:'right',
      verticalPosition:'top'
    });
  },err =>{
    if(err.status === 400)
    {
      for(const campos in err.error.errors){
        if(err.error.errors.hasOwnProperty(campos)){
          this.erros.push(err.error.errors[campos])
        }
      }
    }
  }
  );
}


}

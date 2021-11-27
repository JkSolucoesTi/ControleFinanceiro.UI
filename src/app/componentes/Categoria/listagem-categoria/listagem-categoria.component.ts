import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriasService } from './../../../services/categorias.service';
import { Component, Inject, OnInit , ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialog} from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-listagem-categoria',
  templateUrl: './listagem-categoria.component.html',
  styleUrls: ['./listagem-categoria.component.css']
})
export class ListagemCategoriaComponent implements OnInit {
  public categorias = new MatTableDataSource<any>();
  displayedColumns!: string[];

  /*este atributo vai servir para a digitação da busca*/
  autoCompleteInput = new FormControl();
  /*este atribudo vai servir para receber as opções do serviço categoriaService*/
  /*este atributo recebe todas as categorias ao carregar a tela*/
  opcoesCategorias: string[]=[]
  /*este atributo vai servir para mostrar as opções retornadas*/
  /*este atributo é inicializado sem nenhuma categoria ao carregar a tela */
  nomesCategorias!:Observable<string[]>;


  @ViewChild(MatPaginator,{static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;


  constructor(private categoriasService : CategoriasService , private dialog : MatDialog) { }

  ngOnInit(): void {
    this.categoriasService.PegarTodos().subscribe((resultado) =>{
      console.log(resultado);
      resultado.forEach( (cateoria) => {
        this.opcoesCategorias.push(cateoria.nome);
      });
          this.categorias.data = resultado
          this.categorias.paginator = this.paginator
          this.categorias.sort = this.sort
      });

      this.displayedColumns = this.ExibirColunas();
      this.nomesCategorias = this.autoCompleteInput
      .valueChanges.pipe(
        startWith(''),
        map(nome => this.FiltrarNomes(nome))
        );
  }

  ExibirColunas(): string[]{

    return ['nome','icone','tipo','acoes']

  }

  AbrirDialog(categoriaId:any, nome:any){
    this.dialog.open(DialogExclusaoCategoriaComponent,{
      data:{
        categoriaId : categoriaId,
        nome : nome
      }
    }).afterClosed().subscribe(resultado => {
      if(resultado === true){
        this.categoriasService.PegarTodos().subscribe((dados) => {
          this.categorias.data = dados;
          this.categorias.paginator = this.paginator;
        });
        this.displayedColumns = this.ExibirColunas();
      }
    });

  }

  FiltrarNomes(nome:string): string[]
  {
    if(nome.trim().length >= 4)
    {
      this.categoriasService.FiltrarCategoria(nome.toLowerCase()).subscribe(resultado => {
        this.categorias.data = resultado;
      })
    }
    else{
      if(nome === ''){
        this.categoriasService.PegarTodos().subscribe(resultado => {
          this.categorias.data = resultado;
        })
      }
    }
    console.log(this.opcoesCategorias);
    return this.opcoesCategorias.filter((categoria) =>
      categoria.toLowerCase().includes(nome.toLowerCase())
    );
  }
}

@Component({
  selector: 'app-dialog-exclusao-categorias',
  templateUrl: 'dialog-exclusao-categoria.component.html'
})
export class DialogExclusaoCategoriaComponent{
  constructor( @Inject (MAT_DIALOG_DATA) public d: any,
  private categoriasService : CategoriasService ,
  private snackBar : MatSnackBar ){
  }

  ExcluirCategoria(categoriaId:any):void{
    this.categoriasService.ExcluirCategoria(categoriaId).subscribe(resultado =>{
      this.snackBar.open(resultado.mensagem, 'Excluir' ,{
        horizontalPosition:'right',
        verticalPosition:'top'
      })

    })
  }

}

import { AtualizarCadastroComponent } from './Juninho/atualizar-cadastro/atualizar-cadastro/atualizar-cadastro.component';
import { AutualizarFuncaoComponent } from './componentes/Funcao/autualizar-funcao/autualizar-funcao.component';
import { NovafuncaoComponent } from './componentes/Funcao/novafuncao/novafuncao.component';
import { AtualizarCategoriaComponent } from './componentes/Categoria/atualizar-categoria/atualizar-categoria.component';
import { NovaCategoriaComponent } from './componentes/Categoria/nova-categoria/nova-categoria.component';
import { CadastroIEQComponent } from './Juninho/Cadastro/cadastro-ieq/cadastro-ieq.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemCategoriaComponent } from './componentes/Categoria/listagem-categoria/listagem-categoria.component';
import { ListagemFuncoesComponent } from './componentes/Funcao/listagem-funcoes/listagem-funcoes.component';
import { ListagemCadastroComponent } from './Juninho/listagem-cadastro/listagem-cadastro.component';
import { RegistrarUsuarioComponent } from './componentes/Usuario/Registro/registrar-usuario/registrar-usuario.component';


const routes: Routes = [
  {
    path:"categorias/listagemcategorias", component:ListagemCategoriaComponent
  },
  {
    path:"categorias/novacategoria" , component:NovaCategoriaComponent
  },
  {
    path:"categorias/atualizarcategoria/:categoriaId" , component:AtualizarCategoriaComponent
  },
  {
    path:"juninho/CadastroKids",component:CadastroIEQComponent
  },
  {
    path:"juninho/listagemCadastroKids",component:ListagemCadastroComponent
  },
  {
    path:"funcoes/listagemfuncoes",component:ListagemFuncoesComponent
  },
  {
    path:"funcoes/novafuncao",component:NovafuncaoComponent
  },
  {
    path:"funcoes/atualizarfuncao/:funcaoId" , component:AutualizarFuncaoComponent
  },
  {
    path:"juninho/atualizarcadastro/:cadastroId" , component:AtualizarCadastroComponent
  },
  {
    path:"usuario/registrarusuario", component:RegistrarUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

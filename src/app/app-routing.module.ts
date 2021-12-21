import { DashboardComponent } from './componentes/Dashboard/dashboard/dashboard.component';
import { AtualizarCadastroComponent } from './Juninho/atualizar-cadastro/atualizar-cadastro/atualizar-cadastro.component';
import { AutualizarFuncaoComponent } from './componentes/Funcao/autualizar-funcao/autualizar-funcao.component';
import { NovafuncaoComponent } from './componentes/Funcao/novafuncao/novafuncao.component';
import { AtualizarCategoriaComponent } from './componentes/Categoria/atualizar-categoria/atualizar-categoria.component';
import { NovaCategoriaComponent } from './componentes/Categoria/nova-categoria/nova-categoria.component';
import { CadastroIEQComponent } from './Juninho/Cadastro/cadastro-ieq/cadastro-ieq.component';
import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemCategoriaComponent } from './componentes/Categoria/listagem-categoria/listagem-categoria.component';
import { ListagemFuncoesComponent } from './componentes/Funcao/listagem-funcoes/listagem-funcoes.component';
import { ListagemCadastroComponent } from './Juninho/listagem-cadastro/listagem-cadastro.component';
import { RegistrarUsuarioComponent } from './componentes/Usuario/Registro/registrar-usuario/registrar-usuario.component';
import { LoginUsuarioComponent } from './componentes/Usuario/Login/login-usuario/login-usuario.component';
import {AuthGuardService} from './services/auth-guard.service';
import { NovoCartaoComponent } from './componentes/Cartao/novo-cartao/novo-cartao.component';
import { ListagemCartoesComponent } from './componentes/Cartao/listagem-cartoes/listagem-cartoes.component';
import { AtualizarCartaoComponent } from './componentes/Cartao/atualizar-cartao/atualizar-cartao.component';
import { NovaDespesaComponent } from './componentes/Despesa/nova-despesa/nova-despesa.component';
import { ListagemDespesasComponent } from './componentes/Despesa/listagem-despesas/listagem-despesas.component';
import { AtualizarDespesaComponent } from './componentes/Despesa/atualizar-despesa/atualizar-despesa.component';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent,
    canActivate:[AuthGuardService],
    children:[
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
        path:"funcoes/listagemfuncoes",component:ListagemFuncoesComponent
      },
      {
        path:"funcoes/novafuncao",component:NovafuncaoComponent
      },
      {
        path:"funcoes/atualizarfuncao/:funcaoId" , component:AutualizarFuncaoComponent
      }
      ,
      {
        path:"cartoes/novocartao", component:NovoCartaoComponent
      }
      ,
      {
        path:"cartoes/listagemcartoes", component:ListagemCartoesComponent
      }
      ,
      {
        path:"cartoes/atualizarcartao/:id", component:AtualizarCartaoComponent
      }
      ,
      {
        path:"despesa/novadespesa", component:NovaDespesaComponent
      }
      ,
      {
        path:"despesa/listagemdespesas" , component:ListagemDespesasComponent
      }
      ,
      {
        path:"juninho/CadastroKids",component:CadastroIEQComponent
      },
      {
        path:"despesa/atualizardespesa/:id" , component:AtualizarDespesaComponent
      }
      ,
      {
        path:"juninho/listagemCadastroKids",component:ListagemCadastroComponent
      },
      {
        path:"juninho/atualizarcadastro/:cadastroId" , component:AtualizarCadastroComponent
      },
    ]
  }
  ,
  {
    path:"usuario/registrarusuario", component:RegistrarUsuarioComponent
  },
  {
    path:"usuario/loginusuario" , component:LoginUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

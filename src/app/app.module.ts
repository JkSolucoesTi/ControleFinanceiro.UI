import { CartoesService } from './services/cartoes.service';
import { JwtModule } from '@auth0/angular-jwt';
import { FuncoesService } from './services/funcoes.service';
import { CadastroService } from './services/cadastro.service';
import { SexoService } from './services/sexo.service';

import { MesService } from './services/mes.service';
import { DespesasService } from './services/despesas.service';



import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TiposService } from './services/tipos.service';
import { CategoriasService} from './services/categorias.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { NovaCategoriaComponent } from './componentes/Categoria/nova-categoria/nova-categoria.component';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { AtualizarCategoriaComponent } from './componentes/Categoria/atualizar-categoria/atualizar-categoria.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CadastroIEQComponent } from './Juninho/Cadastro/cadastro-ieq/cadastro-ieq.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgxMaskModule } from 'ngx-mask';
import { FlexLayoutModule} from '@angular/flex-layout';

import { LoginUsuarioComponent } from './componentes/Usuario/Login/login-usuario/login-usuario.component';
import { DashboardComponent } from './componentes/Dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './componentes/Dashboard/header/header.component';
import { ListagemCategoriaComponent , DialogExclusaoCategoriaComponent } from './componentes/Categoria/listagem-categoria/listagem-categoria.component';
import { ListagemFuncoesComponent , DialogExclusaoFuncoesComponent } from './componentes/Funcao/listagem-funcoes/listagem-funcoes.component';
import { NovafuncaoComponent } from './componentes/Funcao/novafuncao/novafuncao.component';
import { AutualizarFuncaoComponent } from './componentes/Funcao/autualizar-funcao/autualizar-funcao.component';
import { ListagemCadastroComponent , DialogElementsExampleDialog} from './Juninho/listagem-cadastro/listagem-cadastro.component';
import { AtualizarCadastroComponent } from './Juninho/atualizar-cadastro/atualizar-cadastro/atualizar-cadastro.component';
import { RegistrarUsuarioComponent } from './componentes/Usuario/Registro/registrar-usuario/registrar-usuario.component';
import { AuthGuardService} from './services/auth-guard.service';
import { NovoCartaoComponent } from './componentes/Cartao/novo-cartao/novo-cartao.component';
import { AtualizarCartaoComponent } from './componentes/Cartao/atualizar-cartao/atualizar-cartao.component';
import { ListagemCartoesComponent, DialogExcluirCartaoComponent} from './componentes/Cartao/listagem-cartoes/listagem-cartoes.component';
import { NovaDespesaComponent } from './componentes/Despesa/nova-despesa/nova-despesa.component';
import { ListagemDespesasComponent , DialogExclusaoDespesasComponent } from './componentes/Despesa/listagem-despesas/listagem-despesas.component';
import { AtualizarDespesaComponent } from './componentes/Despesa/atualizar-despesa/atualizar-despesa.component';
import { NovoGanhoComponent } from './componentes/novo-ganho/novo-ganho.component';
import { ListagemganhosComponent , DialogExclusaoGanhosComponent } from './componentes/Ganho/listagemganhos/listagemganhos.component';
import { AtualizarGanhoComponent } from './componentes/Ganho/atualizar-ganho/atualizar-ganho.component';
import { AtualizarUsuarioComponent } from './componentes/Usuario/atualizar-usuario/atualizar-usuario.component';
import { DashBoardService } from './services/dash-board.service';
import { UsuariosService } from './services/usuarios.service';
import { GanhosService } from './services/ganhos.service';
import { IndexComponent } from './componentes/Dashboard/index/index.component';

export function PegarTokenUsuario(){
  return localStorage.getItem("tokenUsuarioLogado");
}

@NgModule({
  declarations: [
    AppComponent,
    ListagemCategoriaComponent,
    NovaCategoriaComponent,
    AtualizarCategoriaComponent,
    CadastroIEQComponent,
    ListagemFuncoesComponent,
    NovafuncaoComponent,
    AutualizarFuncaoComponent,
    DialogExclusaoCategoriaComponent,
    DialogExclusaoFuncoesComponent,
    ListagemCadastroComponent,
    AtualizarCadastroComponent,
    DialogElementsExampleDialog,
    RegistrarUsuarioComponent,
    LoginUsuarioComponent,
    DashboardComponent,
    HeaderComponent,
    NovoCartaoComponent,
    ListagemCartoesComponent,
    AtualizarCartaoComponent,
    DialogExcluirCartaoComponent,
    NovaDespesaComponent,
    ListagemDespesasComponent,
    AtualizarDespesaComponent,
    DialogExclusaoDespesasComponent,
    NovoGanhoComponent,
    ListagemganhosComponent,
    AtualizarGanhoComponent,
    DialogExclusaoGanhosComponent,
    AtualizarUsuarioComponent,
    IndexComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot(),
    JwtModule.forRoot({
      config:{
        tokenGetter: PegarTokenUsuario,
        allowedDomains:['localhost:5000','localhost:4200','localhost:44371'],
        disallowedRoutes:[]
      }
    })
  ],
  /*Conjunto de objetos que serão inicializados por injeção de dependencia*/
  providers: [
    CadastroService,
    SexoService,
    TiposService,
    CategoriasService,
    CartoesService,
    FuncoesService,
    AuthGuardService,
    MesService,
    DespesasService,
    DashBoardService,
    UsuariosService,
    GanhosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

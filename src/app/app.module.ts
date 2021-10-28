import { FuncoesService } from './services/funcoes.service';
import { CadastroService } from './services/cadastro.service';
import { SexoService } from './services/sexo.service';
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
import { ListagemCategoriaComponent , DialogExclusaoCategoriaComponent } from './componentes/Categoria/listagem-categoria/listagem-categoria.component';
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
import { ListagemFuncoesComponent , DialogExclusaoFuncoesComponent } from './componentes/Funcao/listagem-funcoes/listagem-funcoes.component';
import { NovafuncaoComponent } from './componentes/Funcao/novafuncao/novafuncao.component';
import { AutualizarFuncaoComponent } from './componentes/Funcao/autualizar-funcao/autualizar-funcao.component';
import { ListagemCadastroComponent , DialogElementsExampleDialog} from './Juninho/listagem-cadastro/listagem-cadastro.component';
import { AtualizarCadastroComponent } from './Juninho/atualizar-cadastro/atualizar-cadastro/atualizar-cadastro.component';
import { RegistrarUsuarioComponent } from './componentes/Usuario/Registro/registrar-usuario/registrar-usuario.component';
import { FlexLayoutModule} from '@angular/flex-layout';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LoginUsuarioComponent } from './componentes/usuario/login/login-usuario/login-usuario.component'

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
    LoginUsuarioComponent
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
    FlexLayoutModule,
    NgxMaskModule.forRoot()
  ],
  /*Conjunto de objetos que serão inicializados por injeção de dependencia*/
  providers: [
    CadastroService,
    SexoService,
    TiposService,
    CategoriasService,
    FuncoesService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

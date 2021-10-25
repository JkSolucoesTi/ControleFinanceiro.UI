import { Sexo } from './Sexo';

export class Cadastro{
    cadastroId!:number;
    nome!:string;
    endereco!:string;
    numero!:string;
    cep!:string;
    bairro!:string;
    sexo!:Sexo;
    dataNascimento!:string;
}

import { Document } from "mongoose";
import { IJogador } from "src/modules/jogadores/interface/jogador.interface";

export interface ICategoria extends Document{
    readonly categoria:string;
    descricao: string;
    eventos:Array<Event>;
    jogadores:Array<IJogador>
}

export interface Event{
    nome:string;
    operacao:string;
    valor:number;
}
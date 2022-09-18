import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import { IJogador } from '../interface/jogador.interface';
import {v4 as uuidv4 } from 'uuid'

@Injectable()
export class JogadoresService {
    private readonly logger = new Logger(JogadoresService.name);
    private jogador:IJogador[]= [];

    public async criarAtualizarJogador(criarJogadorDto:CriarJogadorDto):Promise<IJogador>{
        const {email} = criarJogadorDto
        const jogadorEncontrado = await this.findByEmail(email);
        if (jogadorEncontrado) {
          this.atualizarjogador(jogadorEncontrado,criarJogadorDto)
          return jogadorEncontrado
        }
        return this.criar(criarJogadorDto)
    }

    private async criar(criarJogadorDto:CriarJogadorDto):Promise<IJogador>{
        const {email,nome,telefoneCelular} = criarJogadorDto;
        const _id = uuidv4()
        this.jogador.push(
            {
                _id:_id,
                email:email,
                nome:nome,
                posicaoRanking:"",
                ranking:"",
                telefone:telefoneCelular,
                urlFotojogador:""
        }
        )
        const jogadorId = this.jogador.map(jogador => jogador._id)
        const position = jogadorId.indexOf(_id)
        return this.jogador[position]

    }

    public async findByEmail(email:string):Promise<IJogador | undefined>{
        const emailsJogadores = this.jogador.map(jogador => jogador.email)
        const position = emailsJogadores.indexOf(email)

        if (this.jogador[position]) {
            return this.jogador[position]
        }
        return undefined;
    }

    private atualizarjogador(jogadorEncontrado:IJogador,criarJogadorDto:CriarJogadorDto):void{
        const {email,nome,telefoneCelular} = criarJogadorDto

        jogadorEncontrado.nome = nome

    }

    public async findAll():Promise<IJogador[]>{
        return this.jogador
    }

    public async remove(email:string):Promise<void>{
        const jogador = await this.findByEmail(email)
        if(!jogador){
            throw new Error("Nenhum jogador encontrado");
        }

        const jogadoresEmails = this.jogador.map(jogador => jogador.email)
        const posicao = jogadoresEmails.indexOf(email)

        this.jogador = this.jogador.slice(posicao,1)
    }
}

import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import { IJogador } from '../interface/jogador.interface';
import {v4 as uuidv4 } from 'uuid'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import AppError from 'src/shared/error/AppError';

@Injectable()
export class JogadoresService {
    constructor(
    @InjectModel('jogador') 
    private readonly jogadorModule: Model<IJogador>){}
    private readonly logger = new Logger(JogadoresService.name);


    public async criarAtualizarJogador(criarJogadorDto:CriarJogadorDto):Promise<IJogador>{
        const jogadorExiste = await this.jogadorModule.findOne({email:criarJogadorDto.email})
        if(jogadorExiste){
            throw new AppError("O email informado ja esta em uso");
        }

         const criarJogador = await this.criar(criarJogadorDto)
         return criarJogador
    }

    private async criar(criarJogadorDto:CriarJogadorDto): Promise<IJogador>{
        const jogadorCriado = new this.jogadorModule(criarJogadorDto)
        const jogadorSalvado = await jogadorCriado.save()
        return jogadorSalvado;
    }

    public async findAll():Promise<IJogador[]>{
        const jogadores = await this.jogadorModule.find();
        if (!jogadores) {
            throw new AppError("Nenhum jogador cadastrado")
        }
        return jogadores;
    }

    public async findByEmail(email:string):Promise<IJogador>{
        const jogador = await this.jogadorModule.findOne({email:email})
        if (!jogador) {
            throw new AppError("Nenhum jogador encontrado com o email informado")
        }
        return jogador;
    }

    public async delete(id:string):Promise<void>{
        const jogador = await this.jogadorModule.findById(id)
        await this.jogadorModule.remove(jogador)
        return
    }
}

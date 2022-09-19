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
        try {
            const criarJogador = await this.criar(criarJogadorDto)
            return criarJogador
        } catch (error) {
            throw new AppError(`Erro ao criar jogador ${error}`,400)
        }

    }

    private async criar(criarJogadorDto:CriarJogadorDto): Promise<IJogador>{
        const jogadorCriado = new this.jogadorModule(criarJogadorDto)
        try {
            const jogadorSalvado = await jogadorCriado.save()
            return jogadorSalvado;
        } catch (error) {
            throw new AppError(`Erro ao salvar jogador ${error}`,400)
        }

    }

    public async findAll():Promise<IJogador[]>{
        try {
            const jogadores = await this.jogadorModule.find();
            if (!jogadores) {
                throw new AppError("Nenhum jogador cadastrado")
            }
            return jogadores;
        } catch (error) {
            throw new AppError(`Erro ao procurar jogadores ${error}`,400)
        }

    }

    public async findByEmail(email:string):Promise<IJogador>{
        try {
            const jogador = await this.jogadorModule.findOne({email:email})
            if (!jogador) {
                throw new AppError("Nenhum jogador encontrado com o email informado")
            }
            return jogador;
        } catch (error) {
            throw new AppError(`Erro ao procurar jogador ${error}`,400)
        }

    }

    public async delete(id:string):Promise<void>{
        try {
            const jogador = await this.jogadorModule.findById(id)
            await this.jogadorModule.remove(jogador)
            return
        } catch (error) {
            throw new AppError(`Erro ao remover jogador ${error}`,400)
        }

    }
}
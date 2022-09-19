import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import {CriarJogadorDto} from '../dtos/criar-jogador.dto'
import { IJogador } from '../interface/jogador.interface';
import { JogadoresService } from '../services/jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(private readonly jogadorService:JogadoresService){}
    @Post()
    async create(
        @Body() CriarJogadorDto:CriarJogadorDto
    ){
        const service = await this.jogadorService.criarAtualizarJogador(CriarJogadorDto)
        return service
    }

    @Get()
    async list(){
        const service = await this.jogadorService.findAll()
        return service
    }

    @Get()
        async findOne(@Query('email') email:string):Promise<IJogador>{
            return this.jogadorService.findByEmail(email)
    }

    @Delete()
    async remove(@Query('id') id:string):Promise<void>{
        return this.jogadorService.delete(id)
    }
}

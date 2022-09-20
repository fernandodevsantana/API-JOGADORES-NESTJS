import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import {CriarJogadorDto} from '../dtos/criar-jogador.dto'
import { IJogador } from '../interface/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from '../pipes/jogadores-validator-parameter';
import { JogadoresService } from '../services/jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(private readonly jogadorService:JogadoresService){}
    @UsePipes(ValidationPipe)
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
    async remove(@Query('id',JogadoresValidacaoParametrosPipe) id:string):Promise<void>{
        return await this.jogadorService.delete(String(id))
    }

    @Put('/:_id')
    async update(@Param('id') id:string,@Body() CriarJogadorDto:CriarJogadorDto):Promise<IJogador>{
       const jogadorUpdated =  await this.jogadorService.update(id,CriarJogadorDto)
       return jogadorUpdated
    }
}

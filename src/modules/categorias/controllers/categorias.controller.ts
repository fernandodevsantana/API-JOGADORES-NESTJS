import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CriarCategoriaDto } from "../dtos/criar-categoria.dto";
import { ICategoria } from "../interface/categoria.interface";
import { CategorieValidateParameterPipe } from "../pipes/categorie-validator";
import { CategoriaService } from "../services/categoria.service";

@Controller('/api/v1/categories')
export class CategoriasController{
    constructor(private categoriaService:CategoriaService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto:CriarCategoriaDto):Promise<ICategoria>{        
        return this.categoriaService.createcategorie(criarCategoriaDto)
    }

    @Put()
    @UsePipes(ValidationPipe)
    async updateCategories(@Query('id',CategorieValidateParameterPipe)id:string,@Body() criarCategoriaDto:CriarCategoriaDto):Promise<ICategoria>{
        return this.categoriaService.updateCategorie(id,criarCategoriaDto)
    }

    @Get()
    @UsePipes(ValidationPipe)
    async findAllCategories():Promise<ICategoria[]>{
        return this.categoriaService.listAllCategories()
    }

    @Get()
    @UsePipes(ValidationPipe)
    async listForId(@Query() id:string):Promise<ICategoria>{
        return this.categoriaService.findAllById(id)
    }

    @Delete('/_:id')
    @UsePipes(ValidationPipe)
    async removeCategorie(@Param() id:string):Promise<void>{
        return this.categoriaService.deleteCategorie(id)
    }

    @Put('/vinculate')
    async  vinculeCategorieJogador(
            @Query('id_jogador') id_jogador:string,
            @Query('id_categorie') id_categorie:string
        ):Promise<ICategoria>{
        return this.categoriaService.vinculateCategorieAtJogador(id_jogador,id_categorie)
    }
}


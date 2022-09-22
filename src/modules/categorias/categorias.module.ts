/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from '../jogadores/jogadores.module';
import { CategoriasController } from './controllers/categorias.controller';
import { categoriaSchema } from './interface/categoria.schema';
import { CategoriaService } from './services/categoria.service';

@Module({
    imports: [MongooseModule.forFeature([{name:'categoria',schema:categoriaSchema}]),JogadoresModule],
    controllers: [CategoriasController],
    providers: [CategoriaService],
})
export class CategoriasModule {}

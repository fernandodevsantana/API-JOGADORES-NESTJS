import { CategoriasModule } from './modules/categorias/categorias.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './modules/jogadores/jogadores.module';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    CategoriasModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.bysac1u.mongodb.net/?retryWrites=true&w=majority`,
    ),
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

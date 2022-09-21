import { ArrayMaxSize, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CriarCategoriaDto{
    @IsNotEmpty()
    @IsString()
    readonly categoria: string;

    @IsNotEmpty()
    @IsString()
    descricao:string;

    @IsArray()
    @ArrayMaxSize(1)
    eventos:Array<Event>

}
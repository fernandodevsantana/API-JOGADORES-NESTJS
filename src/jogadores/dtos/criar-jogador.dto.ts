import { IsNotEmpty,IsEmail,IsString } from "class-validator";

export class CriarJogadorDto{
    @IsNotEmpty()
    readonly telefone:string;
    @IsEmail()
    readonly email:string;
    @IsString()
    readonly nome:string;
}
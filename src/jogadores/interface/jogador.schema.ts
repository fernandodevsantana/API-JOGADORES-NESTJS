import  * as mongoose from 'mongoose';

export const JogadorShcema = new mongoose.Schema({
    telefoneCelular:{type:String,unique:true},
    email:String,
    nome:String,
    ranking:String,
    posicaoRanking:Number,
    urlFotojogador:String,
},{
    timestamps:true,
    collection:'jogadores'
})
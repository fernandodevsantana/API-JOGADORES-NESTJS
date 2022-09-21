import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import AppError from "src/shared/error/AppError";
import { CriarCategoriaDto } from "../dtos/criar-categoria.dto";
import { ICategoria } from "../interface/categoria.interface";

@Injectable()
export class CategoriaService{
    constructor(
        @InjectModel('categoria')
        private readonly categorieModule: Model<ICategoria>){}
        private readonly logger = new Logger(CategoriaService.name);

    public async createcategorie(createCategory:CriarCategoriaDto):Promise<ICategoria>{
        const categorie = await this.categorieModule.findOne({categoria:createCategory.categoria}).exec()
        if (categorie) {
            throw new AppError('Categoria ja cadastrada no sistema')
        }
        try {
            const createCategorie = new this.categorieModule(createCategory)
            const categorieSave = await createCategorie.save()
            return categorieSave
        } catch (error) {
            throw new AppError('Erro ao criar categoria: ',error)
        }
    }
    public async listAllCategories():Promise<ICategoria[]>{
        return this.categorieModule.find()
    }

    public async updateCategorie(id:string, updatedCategorie:CriarCategoriaDto):Promise<ICategoria>{
        const searchCategorie = await this.categorieModule.findOne({categoria:updatedCategorie.categoria}).exec()
        if(!searchCategorie){
            throw new AppError('Nenhuma categoria com o nome informado encontrada',401);
        }

        const categorieUpdated = await this.categorieModule.findOneAndUpdate({categoria:updatedCategorie.categoria},{$set:updatedCategorie}).exec()
        return categorieUpdated
    }

    public async deleteCategorie(id:string):Promise<void>{
        const searchCategorie = await this.categorieModule.findById(id)
        if (!searchCategorie) {
            throw new AppError('Nenhuma categoria  encontrada',401);
        }
        
        await this.categorieModule.deleteOne({id:id})
        return;

    }

    async findAllById(id:string):Promise<ICategoria>{
        return this.categorieModule.findById(id)
    }
}
import axios from 'axios';
import { key, proxy} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        try {
            const result = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            console.log(result);
            
            // this.title = result.data.recipe.title;
            // this.author = result.data.recipe.publisher;
            // this.img = result.data.recipe.img_url;
            // this.url = result.data.recipe.source_url;
            // this.ingredients = result.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            
        }
    }
}
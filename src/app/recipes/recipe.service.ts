import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeService{

    recipesChanged = new Subject<Recipe[]>;
    
    // private recipes:Recipe[] = [
    //     new Recipe("Pasta","Delicious Recipe",
    //     "https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Pasta-alla-norma-87c54fc.jpg?quality=90&resize=556,505"
    //     ,[new Ingredient('pasta',2),
    // new Ingredient('cheese',2)])
    // ,
    // new Recipe("French Fries","crunchy spicy french fries",
    //     ""
    //     ,[new Ingredient('Potatoes',2)])
    
    //   ];
      private recipes:Recipe[]=[]
    constructor(private slService:ShoppingListService){}

    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipes(){
        return this.recipes.slice();
    }
    getRecipe(index:number){
        return this.recipes[index]
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }

}
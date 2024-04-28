import { Component,OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;
  constructor(private slService:ShoppingListService,private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router:Router){}
ngOnInit(): void {
  this.route.params
  .subscribe(
    (params: Params)=>{
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id)
    }
  );
}
//Directly added to shoppinglist service
// ToshoppingList(){
//   this.recipe.ingredients.map((ingredient)=>{
//     this.slService.addIngredient(ingredient);
//   })
// }

ToshoppingList(){
this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
}
onEditRecipe(){
this.router.navigate(['edit'],{relativeTo:this.route})
// this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
}
onDeleteRecipe(){
  this.recipeService.deleteRecipe(this.id);
  this.router.navigate(['recipes']);
}

}

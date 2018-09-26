import  Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes.js';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base';



// Global state of the App
//
// -- Search Object
// -- Current recipe object
// -- Shopping list object
// -- Liked Recipes
//

const state = {};

// *********************
// * SEARCH CONTROLLER *
// *********************


const controllerSearch = async () => {
    
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);
        
        try {
            await state.search.getResults();

            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert('Something went wrong with search');
            clearLoader;
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controllerSearch();
});

elements.searchResultPages.addEventListener('click', e=> {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }    
});

// *********************
// * RECIPE CONTROLLER *
// *********************

const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');
    
    if (id) {
        
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        if (state.search) searchView.highlightSelected(id);

        // Create New Recipe Object
        state.recipe = new Recipe(id);
        

        try {
            await state.recipe.getRecipe();
            
            state.recipe.parseIngredients();
            state.recipe.calcServings();
            state.recipe.calcTime();
           
            clearLoader();
            
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch (error) {
            alert(error);
        }

        
    }
};
// *******************
// * LIST CONTROLLER *
// *******************

const controlList = () => {
    // Create a new list if there is none yet
    if (!state.list) { state.list = new List(); }

    // Add each ingredient to the list
    state.recipe.ingredients.forEach(ingredient => {
        const item = state.list.addItem(ingredient.count, ingredient.unit, ingredient.ingredient);
        listView.renderItem(item);
    });
}
//Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //Delete from state
        state.list.deleteItem(id);
        //delete from UI
        listView.delItem(id);
    }
});

// *******************
// * LIKE CONTROLLER *
// *******************

state.likes = new Likes(); // TESTING ONLY

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    
    const currentID = state.recipe.id;
    
   if(!state.likes.isLiked(currentID)){
              
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        likesView.toggleLikeBtn(true);
        likesView.renderLike(newLike);
                
    }else{
        state.likes.deleteLike(currentID);
        likesView.toggleLikeBtn(false);
        likesView.deleteLike(currentID);
        
    }
        
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

// *******************
// * EVENT LISTENERS *
// *******************

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.clearRecipe();
            recipeView.renderRecipe(state.recipe)
        }
    }else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.clearRecipe();
        recipeView.renderRecipe(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {        
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
        
    }
});

window.addEventListener('load',() => {
    state.likes = new Likes();
    state.likes.readStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => likesView.renderLike(like));
});


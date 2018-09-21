import  Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import {elements, renderLoader, clearLoader} from './views/base';

// Global state of the App
//
// -- Search Object
// -- Current recipe object
// -- Shopping list object
// -- Liked Recipes
//

const state = {
}

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

// Recipe Controller

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
          
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert(error);
        }

        
    }
};


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
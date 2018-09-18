import  Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView'
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

        // 3 Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);
        
        await state.search.getResults();

        clearLoader();
        searchView.renderResults(state.search.result);
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

const r = new Recipe(46956);
r.getRecipe();
// console.log(r);


import * as model from "./model.js"
import recipeView from "./views/recipeView.js" 
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";



import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime'

// if(module.hot){
// module.hot.accept
// }

const controlRecipe = async function() {
  try {
    const id = window.location.hash.slice(1);

    if(!id) return
    recipeView.renderSpinner();
     
    await model.loadRecipe(id)
    recipeView.render(model.state.recipe)

  } catch (err) {
    recipeView.getErrorMessage()
  }
};

const searchRecipe = async function(){
  try{

    resultsView.renderSpinner()

    const query = searchView.getSearchValue()
    if(!query) return

    await model.loadSearchRecipe(query)

    resultsView.render(model.resultPerPage()) 
 
    paginationView.render(model.state.search)
  }
  catch(err){
    console.log(err)
  }
  }

  const controlPagination = function(goToPage){

    resultsView.render(model.resultPerPage(goToPage)) 

    paginationView.render(model.state.search) 
   }


const init = function(){
  recipeView.getHandler(controlRecipe)
  searchView.getHandlerSearch(searchRecipe)
  paginationView._addHandlerClick(controlPagination)
}
 init();


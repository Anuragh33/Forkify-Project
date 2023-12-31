import * as model from './model.js';
import { CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if(module.hot){
// module.hot.accept
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    resultsView.update(model.searchResult());
    bookmarksView.update(model.state.bookmark);

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.getErrorMessage();
  }
};

const searchRecipe = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getSearchValue();
    if (!query) return;

    await model.loadSearchRecipe(query);

    resultsView.render(model.searchResult());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.searchResult(goToPage));

  paginationView.render(model.state.search);
};

const updateServings = newServings => {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlSetBookmark = function () {
  if (!model.state.recipe.bookmarked) model.setBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmark);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    bookmarksView.render(model.state.bookmark);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.getErrorMessage(err.message);
  }
};

const welcomemessage = () => {
  console.log('Welcome Everyone!!');
};
const init = function () {
  bookmarksView.getHandler(controlBookmarks);
  recipeView.getHandler(controlRecipe);
  recipeView.getHandlerUpdateServing(updateServings);
  recipeView.getHandlerBookmark(controlSetBookmark);
  searchView.getHandlerSearch(searchRecipe);
  paginationView._addHandlerClick(controlPagination);
  addRecipeView.getHandlerUpload(controlAddRecipe);
  welcomemessage();
};
init();

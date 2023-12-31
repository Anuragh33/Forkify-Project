import { async } from 'regenerator-runtime';
import { RES_PER_PAGE, URL, KEY } from './config.js';
import { AJAX } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmark: [],
};

const createRecipe = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    source_url: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${URL}/${id}?key=${KEY}`);
    state.recipe = createRecipe(data);
    if (state.bookmark.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadSearchRecipe = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${URL}?search=${query}&key=${KEY}`);
    //console.log(data)

    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        publisher: res.publisher,
        image: res.image_url,
        ...(res.key && { key: res.key }),
      };
    });
    //console.log(state.search.results)
    state.search.page = 1;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const searchResult = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;

  return state.search.results.slice(start, end);
};

const persistentBokkmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};

export const setBookmark = function (recipe) {
  state.bookmark.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistentBokkmark();
};

export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistentBokkmark();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmark = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmark$');
};
//clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error('Please use the Correct Ingredient Format!!');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    console.log(ingredients);

    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };

    const data = await AJAX(`${URL}?key=${KEY}`, recipe);
    state.recipe = createRecipe(data);
    setBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

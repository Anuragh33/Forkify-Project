import{async} from 'regenerator-runtime'
import {RES_PER_PAGE, URL} from './config.js'
import {getJSON} from './helper.js';

export const state = {
    recipe: {},
    search: {
      query: '',
      results: [],
      page: 1,
      resultPerPage: RES_PER_PAGE,
    },
};

export const loadRecipe = async function(id){
  try{
      const data = await getJSON(`${URL}/${id}`);
  
      const  { recipe } = data.data;
      state.recipe = {  
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        source_url: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
      };
    }
    catch(err){ 
      console,log(err)
      throw err
    }
}

export const loadSearchRecipe = async function (query){
  try{

    state.search.query = query;
    const data = await getJSON(`${URL}?search=${query}`);
    console.log(data)

    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        publisher: res.publisher,
        image: res.image_url,
      };
    }
      )
      console.log(state.search.results)

  }catch(err){
    console.log(err)
    throw  err
  }
}


export const resultPerPage = function(page = state.search.page){

state.search.page = page
const start = (page - 1 ) * state.search.resultPerPage
const end = 1 * state.search.resultPerPage

return state.search.results.slice(start, end)

}
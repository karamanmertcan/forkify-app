import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // 3  updating bookmarks view

    bookmarksView.update(model.state.bookmarks);
    //1)Loading Recipe
    await model.loadRecipe(id);
    //2  Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    console.log(error);
  }
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResult(query);

    //Render results

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));

    //render initial paginaiton button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (gotoPage) {
  //render new results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(gotoPage));

  //render initial paginaiton button
  //render new paginaiton buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in the state)
  model.updateServings(newServings);

  // update the view

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1 add//remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2 update rrecipe view
  recipeView.update(model.state.recipe);

  // 3 render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const newFeature = function () {
  console.log('Welcome');
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    recipeView.renderSpinner();

    // upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // render add recipe
    recipeView.render(model.state.recipe);

    // succes message adding new recipe
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
  // location.reload(); // HERE I PUT THE CODE
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdate(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};

init();

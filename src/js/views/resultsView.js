import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //Parcel2

class ResultsView extends previewView {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query ! Please try again ! ';
  _message = '';
}

export default new ResultsView();

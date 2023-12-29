import view from './view.js'
import icons from 'url:../../img/icons.svg'
import previewView from './previewView.js'

class resultsView extends view {
  _parentElement = document.querySelector('.results')
  _message = 'No results found based on your search. Please try again. Thanks!!'

  _getMarkup () {
    return this._data
      .map(results => previewView.render(results, false))
      .join('')
  }
}

export default new resultsView()

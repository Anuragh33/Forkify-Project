import view from './view.js'
import icons from 'url:../../img/icons.svg'

class resultsView extends view {
  _parentElement = document.querySelector('.results')
  _message = 'No results found based on your search. Please try again. Thanks!!'

  _getMarkup () {
    return this._data.map(this._getMarkupPreview).join('')
  }

  _getMarkupPreview (results) {
    const id = window.location.hash.slice(1)
    return `
        <li class="preview">
        <a class="preview__link ${
          results.id === id ? 'preview__link--active' : ''
        }"href="#${results.id}">
        <figure class="preview__fig">
            <img src="${results.image}" alt="Test" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${results.title}</h4>
            <p class="preview__publisher">${results.publisher}</p>
            
            </div>
        </div>
        </a>
    </li>
`
  }
}

export default new resultsView()

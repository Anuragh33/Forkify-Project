import view from './view.js'
import icons from 'url:../../img/icons.svg'
import previewView from './previewView.js'

class bookmarksView extends view {
  _parentElement = document.querySelector('.bookmarks__list')
  _message = 'No bookmarks yet. Find one and bookmark it.'

  getHandler (handler) {
    window.addEventListener('load', handler)
  }

  _getMarkup () {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('')
  }
}

export default new bookmarksView()

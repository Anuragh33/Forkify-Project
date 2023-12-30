import view from './view.js';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends view {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._getHandlerShwoWindow();
    this._getHandlerCloseWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _getHandlerShwoWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _getHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  getHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentElement)];

      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _getMarkup() {}
}

export default new addRecipeView();

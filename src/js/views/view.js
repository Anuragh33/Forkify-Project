import icons from 'url:../../img/icons.svg'

export default class view {
  _data

  render (data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.getErrorMessage()

    this._data = data
    const markup = this._getMarkup()

    if (!render) return markup

    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  update (data) {
    this._data = data
    const newMarkup = this._getMarkup()
    const newDOM = document.createRange().createContextualFragment(newMarkup)
    const newElements = Array.from(newDOM.querySelectorAll('*'))
    const curElements = Array.from(this._parentElement.querySelectorAll('*'))
    console.log(curElements)
    console.log(newElements)

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i]
      console.log(curEl, newEl.isEqualNode(curEl))

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent
      }

      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        )
    })
  }

  _clear () {
    this._parentElement.innerHTML = ''
  }

  renderSpinner () {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  getErrorMessage (message = this._message) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
            </div>`

    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
}

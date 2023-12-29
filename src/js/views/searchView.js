class searchView {
  _parentEl = document.querySelector('.search')

  getSearchValue () {
    const query = this._parentEl.querySelector('.search__field').value
    this._getClear()
    return query
  }

  _getClear () {
    this._parentEl.querySelector('.search__field').value = ''
  }

  getHandlerSearch (handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault()
      handler()
    })
  }
}

export default new searchView()

import view from './view.js'
import icons from 'url:../../img/icons.svg';


class paginationView extends view{

    _parentElement = document.querySelector('.pagination')

    _addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline')
            if(!btn) return

            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }


    _pageNext(page){
        return`
        <button data-goto="${page}" class="btn--inline pagination__btn--next">
            <span>Page ${page}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `
    }

    _pagePrev(page){
        return `
        <button data-goto="${page}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page}</span>
          </button>
    
        `
    }

    _getMarkup(){
        const curPage = this._data.page

        const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage)


        if(curPage === 1 && numPages > 1)
        return this._pageNext(curPage+1);
        
        if(curPage === numPages && numPages > 1)
        return this._pagePrev(curPage-1);

        if(curPage < numPages)
        return `
        ${this._pageNext(curPage+1)}
        ${this._pagePrev(curPage-1)}
        `;
            
        return '';
    }

}


export default new paginationView()
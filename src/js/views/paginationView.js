import View from './View.js';
import icons from 'url:../../img/icons.svg'; //Parcel2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    return this._generateMarkupButton();
    // Page 1 and no other pages
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }
  _generateMarkupButton() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (curPage === 1 && numPages > 1) {
      return `
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
              <span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button>
        `;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
          <button data-goto="${
            curPage - 1
          }"  class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
          </button>
        
        `;
    }
    // Other page
    if (curPage < numPages) {
      return `
          <button data-goto="${
            curPage - 1
          }"  class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${
            curPage + 1
          }"  class="btn--inline pagination__btn--next">
              <span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button>
          `;
    }
    //   Page 1 and there are other pages
    return '';
  }
}

export default new PaginationView();

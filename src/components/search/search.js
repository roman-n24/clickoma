import { DivComponent } from '../../common/div-component';

import './search.css'

export class Search extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    searchInput = () => {
        const searchValue = document.querySelector('.search__body').value.trim();
        this.appState.searchQuery = searchValue;

        if (!searchValue) {
            return
        }

        window.location.hash = `#search/query=${searchValue}`;
    }

    render() {
        this.element.classList.add('search');
        this.element.innerHTML = `
            <input type="text" placeholder="Search for anything..." class="search__body" value="${this.appState.searchQuery || ''}">
            <button class="btn search__btn">
                <img src="./static/icons/magnifying.svg" alt="Search" class="search__img">
            </button>
        `;

        const searchInput = this.element.querySelector('.search__body');
        const searchButton = this.element.querySelector('.search__btn');

        searchButton.addEventListener('click', this.searchInput);
        searchInput.addEventListener('keydown', (e) => {
            if (e.code === 'Enter') {
                this.searchInput();
            }
        });

        return this.element;
    }
}
import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card';

import './card-list.css';

export class CardList extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    render() {
        this.element.classList.add('card-list');

        if (this.appState.loading) {
            this.element.innerHTML = `
                <div class="loading">Loading...</div>
            `;
            return this.element;
        }


        if (this.appState.searchQuery) {
            this.element.innerHTML = `
                <div class="card-list__title">Найдено товаров - ${this.appState.numFound}</div>
            `;
        }

        const cardGrid = document.createElement('div');

        cardGrid.classList.add('card-list__grid');

        for (const product of this.appState.list) {
            cardGrid.append(new Card(this.appState, product).render());
        }

        this.element.append(cardGrid);
        
        return this.element;
    }
}
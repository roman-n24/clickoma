import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card';
import './card-list.css'

export class CardList extends DivComponent {
    constructor(stateManager) {
        super()
        this.stateManager = stateManager
    }

    render() {
        if(this.stateManager.state.loading) {
            this.element.innerHTML = `
                <div class="card-list__loading">Loading...</div>
            `

            return this.element
        }

        this.element.classList.add('card-list')

        if(this.stateManager.state.searchQuery) {
            this.element.innerHTML = `
                <div class="card-list__title">Найдено товаров - ${this.stateManager.state.numFound}</div>
            `
        }

        const cardGrid = document.createElement('div')
        cardGrid.classList.add('card-list__grid')

        for(const product of this.stateManager.state.list) {
            cardGrid.append(new Card(product).render())
        }

        this.element.append(cardGrid)

        return this.element
    }
}
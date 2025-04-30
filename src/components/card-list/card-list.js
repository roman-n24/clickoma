import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card';
import './card-list.css'

export class CardList extends DivComponent {
    constructor(state) {
        super()
        this.state = state
    }

    render() {
        if(this.state.loading) {
            this.element.innerHTML = `
                <div class="card-list__loading">Loading...</div>
            `

            return this.element
        }

        this.element.classList.add('card-list')

        if(this.state.searchQuery) {
            this.element.innerHTML = `
                <div class="card-list__title">Найдено товаров - ${this.state.numFound}</div>
            `
        }

        const cardGrid = document.createElement('div')
        cardGrid.classList.add('card-list__grid')

        for(const product of this.state.list) {
            cardGrid.append(new Card(product).render())
        }

        this.element.append(cardGrid)

        return this.element
    }
}
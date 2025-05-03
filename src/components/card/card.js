import { DivComponent } from '../../common/div-component';
import './card.css'

export class Card extends DivComponent {
    constructor(product) {
        super()
        this.product = product
    }

    render() {
        this.element.classList.add('card')
        this.element.innerHTML = `
            <div class="card__img">
                <img src="${this.product.images[0]}" alt="">
            </div>
            <div class="card__footer">
                <div class="card__rating_wrap">
                    <ul class="card-rating">
                        ${this.renderStars()}
                    </ul>
                    <div>(${this.product.reviews.length})</div>
                </div>
                <a href="#product/id=${this.product.id}" class="card__title">${this.product.title}</a>
                <div class="card__price">${this.product.price} $</div>
            </div>
        `

        return this.element
    }

    renderStars() {
        let starsHTML = ''
        const primaryStars = Math.round(this.product.rating)

        for(let i = 0; i < primaryStars; i++) {
            starsHTML += '<li class="star_primary"><img src="./static/icons/star-primary.svg"/></li>'
        }

        const emptyStars = 5 - primaryStars

        for(let i = 0; i < emptyStars; i++) {
            starsHTML += '<li class="star_empty"><img src="/static/icons/star-empty.svg"/></li>'
        }

        return starsHTML
    }
}
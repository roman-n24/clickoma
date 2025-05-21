import { DivComponent } from '../../common/div-component';
import { StarsReview } from '../stars-review/stars-review';

import './card.css'

export class Card extends DivComponent {
    constructor(appState, product) {
        super()
        this.appState = appState
        this.product = product
    }

    get isInCart() {
        return this.appState.cart.find(product => 
            product.id === this.product.id
        )
    }

    #addFromCart = () => {
        this.appState.cart.push(this.product)
    }

    #deleteFromCart = () => {
        this.appState.cart = this.appState.cart.filter(product => product.id !== this.product.id)
        console.log('delete')
        console.log(this.appState.cart)
    }

    render() {
        this.element.classList.add('card')
        this.element.innerHTML = `
            <a href="#product/id=${this.product.id}" class="card__img">
                <img src="${this.product.images[0]}" alt="${this.product.title} - ${this.product.id}">
            </a>
            <div class="card__body">
                <div class="card__rating_wrap">
                    <ul class="card-rating">
                        ${new StarsReview(this.product).render()}
                    </ul>
                    <div class="reviews-length">(${this.product.reviews.length})</div>
                </div>
                <a href="#product/id=${this.product.id}" class="card__title">${this.product.title}</a>
                <div class="card__price">${this.product.price} $</div>
            </div>
            <div class="card__footer">
                <div>Add to cart</div>
            </div>
            <div class="card__popup">
                <button class="card-footer-btn">
                    ${this.isInCart 
                        ? `<img src="./static/icons/prohibit.svg" alt="Prohibit">`
                        : `<img src="./static/icons/cart.svg" alt="Cart">`
                    }
                </button>
            </div>
        `

        const cardFooter = this.element.querySelector('.card__footer')
        const cardPopup = this.element.querySelector('.card__popup')
        const addToCartBtn = this.element.querySelector('.card-footer-btn')

        cardFooter.addEventListener('mouseover', () => {
            cardPopup.style = 'display: flex;'
        })

        this.element.addEventListener('mouseleave', () => {
            cardPopup.style = 'display: none;'
        })

        addToCartBtn.addEventListener('click', this.isInCart 
            ? this.#deleteFromCart
            : this.#addFromCart)

        return this.element
    }
}
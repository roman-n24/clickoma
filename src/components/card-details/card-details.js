import { DivComponent } from '../../common/div-component';
import { StarsReview } from '../stars-review/stars-review';

import './card-details.css'

export class CardDetails extends DivComponent {
    constructor(appState, parentStateManager) {
        super()
        this.appState = appState
        this.parentStateManager = parentStateManager
    }

    #addFromCart = () => {
        this.appState.cart.push(this.parentStateManager.state.product)
    }

    #deleteFromCart = () => {
        this.appState.cart = this.appState.cart.filter(product => product.id !== this.parentStateManager.state.product.id)
    }

    get isInCart() {
        return this.appState.cart.find(product => 
            product.id === this.parentStateManager.state.product.id
        )
    }

    get imageIndex() {
        const fileName = this.parentStateManager.state?.activeImage?.split('/').at(-1)?.split('.')[0];
        return fileName ? +fileName - 1 : 0;
    }

    renderCardImages() {
        return this.parentStateManager.state.product.images.map((img, i) => {
            return `<li>
                <button class="card-represent-list__btn btn ${i === this.imageIndex ? 'mini-img_active' : ''}">
                    <img
                        src="${img}"
                        alt="${this.parentStateManager.state.product.title} - ${i + 1}"
                    >
                </button>
            </li>`
        }).join('')
    }

    render() {
        this.element.classList.add('card-details')

        const { product, activeImage } = this.parentStateManager.state;

        if(this.appState.loading || product.length === 0) {
            this.element.innerHTML = `
                <div class="loading">Loading...</div>
            `

            return this.element
        }

        const discountPrice = (product.price 
            * (1 - product.discountPercentage / 100)).toFixed(2)

        this.element.innerHTML = `
            <div class="card-details__wrapper">
                <div class="card-details__represent">
                    <img class="card-details__img"
                        src="${activeImage}"
                        alt="${product.title}"
                    >
                </div>
                <ul class="card-represent-list">
                    ${this.renderCardImages()}
                </ul>
                <div class="card-details__info">
                    <div class="card-feedback">
                        <ul class="card-rating">
                            ${new StarsReview(product).render()}
                        </ul>
                        <span class="card-feedback__info">
                            ${product.rating} Star Rating
                        </span>
                        <span class="card-feedback__description">
                            (${product.reviews.length} User feedback)
                        </span>
                    </div>
                    <div class="card-title">
                        ${product.title}
                    </div>
                    <ul class="card-info">
                        <li class="card-info__text">
                            Sku: <span class="card-info__primary">${product.sku || '-'}</span>
                        </li>
                        <li class="card-info__text">
                            Brand: <span class="card-info__primary">${product.brand || '-'}</span>
                        </li>
                        <li class="card-info__text">
                            Availability: <span class="card-info__primary">${product.availabilityStatus || '-'}</span>
                        </li>
                        <li class="card-info__text">
                            Category: <span class="card-info__primary">${product.category || '-'}</span>
                        </li>
                    </ul>
                    <div class="card-price">
                        <span class="card-price__sale-price sale-price">
                            ${discountPrice}$
                        </span>
                        <span class="card-price__init-price init-price">
                            ${product.price}$
                        </span>
                        <span class="card-price__sale sale">
                            ${product.discountPercentage}% OFF
                        </span>
                    </div>
                    <hr class="hr_horizontal">
                    <div class="card-product_wrapper">
                        <button class="card-cart-btn btn ${this.isInCart ? 'active-btn' : ''}">
                            ${this.isInCart ? 'Remove from cart' : 'Add to card'}
                            <img src="./static/icons/cart.svg" alt="Cart">
                        </button>
                        <button class="card-buy-btn btn">Buy now</button>
                    </div>
                </div>
            </div>
        `

        const representList = this.element.querySelector('.card-represent-list')
        const addToCartBtn = this.element.querySelector('.card-cart-btn')
        
        representList.addEventListener('mouseover', (e) => {
            if(e.target.tagName === 'IMG') {
                const parentBtn = e.target.closest('.card-represent-list__btn')
                const allBtnImages = this.element.querySelectorAll('.card-represent-list__btn');

                allBtnImages.forEach((btn) => {
                    btn.classList.remove('mini-img_active')
                })

                parentBtn.classList.add('mini-img_active')
                this.parentStateManager.state.activeImage = e.target.src
            }
        })

        addToCartBtn.addEventListener('click', this.isInCart 
            ? this.#deleteFromCart
            : this.#addFromCart)

        return this.element
    }
}
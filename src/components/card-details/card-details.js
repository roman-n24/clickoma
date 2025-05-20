import './card-details.css'
import { DivComponent } from '../../common/div-component';
import { StarsReview } from '../stars-review/stars-review';

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

    get imageId() {
        return +(this.parentStateManager.state.activeImage.split('/').at(-1).split('.')[0]) - 1
    }

    renderCardImages() {
        return this.parentStateManager.state.product.images.map((img, i) => {
            return `<li>
                <button class="card-represent-list__btn btn ${i === this.imageId ? 'mini-img_active' : ''}">
                    <img
                        src="${img}"
                        alt=""
                    >
                </button>
            </li>`
        }).join('')
    }

    render() {
        this.element.classList.add('card-details')

        if(this.parentStateManager.state.loading) {
            this.element.innerHTML = `
                <div class="card-list__loading">Loading...</div>
            `
            return this.element
        }

        const discountPrice = (this.parentStateManager.state.product.price 
            * (1 - this.parentStateManager.state.product.discountPercentage / 100)).toFixed(2)

        this.element.innerHTML = `
            <div class="card-details__wrapper">
                <div class="card-details__represent">
                    <img class="card-details__img"
                        src="${this.parentStateManager.state.activeImage}"
                        alt=""
                    >
                </div>
                <ul class="card-represent-list">
                    ${this.renderCardImages()}
                </ul>
                <div class="card-details__info">
                    <div class="card-feedback">
                        <ul class="card-rating">
                            ${new StarsReview(this.parentStateManager.state.product).render()}
                        </ul>
                        <span class="card-feedback__info">
                            ${this.parentStateManager.state.product.rating} Star Rating
                        </span>
                        <span class="card-feedback__description">
                            (${this.parentStateManager.state.product.reviews.length} User feedback)
                        </span>
                    </div>
                    <div class="card-title">
                        ${this.parentStateManager.state.product.title}
                    </div>
                    <ul class="card-info">
                        <li class="card-info__text">
                            Sku: <span class="card-info__primary">${this.parentStateManager.state.product.sku || '-'}</span>
                        </li>
                        <li class="card-info__text">
                            Brand: <span class="card-info__primary">${this.parentStateManager.state.product.brand || '-'}</span>
                        </li>
                        <li class="card-info__text">
                            Availability: <span class="card-info__primary">${this.parentStateManager.state.product.availabilityStatus || '-'}</span>
                        </li>
                        <li class="card-info__text">
                            Category: <span class="card-info__primary">${this.parentStateManager.state.product.category || '-'}</span>
                        </li>
                    </ul>
                    <div class="card-price">
                        <span class="card-price__sale-price sale-price">
                            ${discountPrice}$
                        </span>
                        <span class="card-price__init-price init-price">
                            ${this.parentStateManager.state.product.price}$
                        </span>
                        <span class="card-price__sale sale">
                            ${this.parentStateManager.state.product.discountPercentage}% OFF
                        </span>
                    </div>
                    <hr class="hr_horizontal">
                    <div class="card-product_wrapper">
                        <button class="card-cart-btn btn ${this.isInCart ? 'active-btn' : ''}">
                            ${this.isInCart ? 'Remove from cart' : 'Add to card'}
                            <img src="./static/icons/cart.svg" alt="">
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
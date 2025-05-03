import { DivComponent } from '../../common/div-component';
import './card-details.css'

export class CardDetails extends DivComponent {
    constructor(parentState) {
        super()
        this.parentState = parentState
    }
    
    // Вопрос: можно ли как-нибудь это реализовать, но через сеттеры и геттеры, чтобы оптимизировать данную функцию?
    // Это неправильно. Нужно переделать, но не по тупому.
    cardCounter() {
        let count = 1
        const minBtn = document.querySelector('.card-product-count__btn-min')
        const plusBtn = document.querySelector('.card-product-count__btn-plus')

        minBtn.addEventListener('click', () => {
            if(count > 1) { 
                count -= 1
            }
        })

        plusBtn.addEventListener('click', () => {
            if(count < this.parentState.productData.stock) { 
                count += 1
            }
        })
    }

    renderStars() {
        let starsHTML = ''
        const primaryStars = Math.round(this.parentState.productData.rating)

        for(let i = 0; i < primaryStars; i++) {
            starsHTML += '<li class="star_primary"><img src="./static/icons/star-primary.svg"/></li>'
        }

        const emptyStars = 5 - primaryStars

        for(let i = 0; i < emptyStars; i++) {
            starsHTML += '<li class="star_empty"><img src="/static/icons/star-empty.svg"/></li>'
        }

        return starsHTML
    }

    renderCardImages() {
        let imgHTML = ''
        for(const img of this.parentState.productData.images) {
            imgHTML += `
                <li>
                    <button class="card-represent-list__btn">
                        <img
                            src="${img}" 
                            alt=""
                        >
                    </button>
                </li>
            `
        }

        return imgHTML
    }

    render() {
        this.element.classList.add('.card-details')

        if(this.parentState.loading) {
            this.element.innerHTML = `
                <div class="card-list__loading">Loading...</div>
            `
            return this.element
        }

        this.element.innerHTML = `
            <div class="card-details__wrapper">
                <div class="card-details__represent">
                    <button class="arrow-left_ghost" >
                        <img
                            src="./static/icons/arrow-circle-left.svg" 
                            alt=""
                        >
                    </button>
                    <img class="card-details__img"
                        src="${this.parentState.productData.images[0]}" 
                        alt=""
                    >
                    <button class="arrow-right_ghost" >
                        <img
                            src="./static/icons/arrow-circle-right.svg" 
                            alt=""
                        >
                    </button>
                </div>
                <div class="card-details__images">
                    <button><img 
                        class="arrow-left_primary" 
                        src="./static/icons/arrow-circle-left-prime.svg" 
                        alt=""
                    ></button>
                    <ul class="card-represent-list">
                        ${this.renderCardImages()}
                    </ul>
                    <button><img 
                        class="arrow-right_primary" 
                        src="./static/icons/arrow-circle-right-prime.svg" 
                        alt=""
                    ></button>
                </div>
                <div class="card-details__info">
                    <div class="card-feedback">
                        <ul class="card-rating">
                            ${this.renderStars()}
                        </ul>
                        <span class="card-feedback__info">
                            ${this.parentState.productData.rating}
                        </span>
                        <span class="card-feedback__description">
                            (${this.parentState.productData.reviews.length} User feedback)
                        </span>
                    </div>
                    <div class="card-title">
                        ${this.parentState.productData.title}
                    </div>
                    <ul class="card-info">
                        <li class="card-info__text">
                            Sku: ${this.parentState.productData.sku}
                        </li>
                        <li class="card-info__text">
                            Brand: ${this.parentState.productData.brand}
                        </li>
                        <li class="card-info__text">
                            Availability: ${this.parentState.productData.availabilityStatus}
                        </li>
                        <li class="card-info__text">
                            Category: ${this.parentState.productData.category}
                        </li>
                    </ul>
                    <div class="card-price">
                        <span class="card-price__sale-price sale-price">
                            ${
                                this.parentState.productData.price 
                                    - (this.parentState.productData.price 
                                    % this.parentState.productData.discountPercentage)
                            }
                        </span>
                        <span class="card-price__init-price init-price">
                            ${this.parentState.productData.price}
                        </span>
                        <span class="card-price__sale sale">
                            ${this.parentState.productData.discountPercentage}% OFF
                        </span>
                    </div>
                    <hr class="hr_horizontal">
                    <div class="card-product-count">
                        <button class="card-product-count__btn-min btn">-</button>
                        <span class="card-product-count__num"></span>
                        <button class="card-product-count__btn-plus btn">+</button>
                    </div>
                    <button class="card-cart-btn btn">
                        Add to card
                        <img src="./static/icons/cart-simple.svg" alt="">
                    </button>
                    <button class="card-buy-btn btn"></button>
                </div>
            </div>
        `

        console.log(this.parentState.productData.discountPercentage)

        return this.element
    }
}
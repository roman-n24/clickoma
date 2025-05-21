import { DivComponent } from '../../common/div-component';

import './shopping-card.css'

export class ShoppingCard extends DivComponent {
    constructor(appState) {
        super()
        this.appState = appState
    }

    get #totalAmount() {
        return this.appState.cart.reduce((acc, product) => {
            return acc += Number(this.#discountPrice(product))
        }, 0).toFixed(2)
    }

    get #resultTotal() {
        return this.#totalAmount
    }
    
    #discountPrice(product) {
        return (product.price 
                * (1 - product.discountPercentage / 100)).toFixed(2)
    }

    renderProduct = () => {
        return this.appState.cart.map(product => {
            return `
                <tr class="table-row">
                    <td class="table-data product_wrapper">
                        <button class="close" data-id="${product.id}">
                            <img src="./static/icons/xcircle.svg" alt="Close">
                        </button>
                        <span>
                            <img class="table-data__img" src="${product.images[0]}" alt="${product.id}">
                        </span>
                        <span class="table-data__title">${product.title}</span>
                    </td>
                    <td class="table-data table-data-mid">
                        <span class="init-price table-data__init-price">$${product.price}</span>
                        <span class="table-data__sale-price">$${this.#discountPrice(product)}</span>
                    </td>
                    <td class="table-data">
                        <span class="table-data__sale-price">$${this.#discountPrice(product)}</span>
                    </td>
                </tr>
            `
        }).join('')
    }
    
    render() {
        this.element.classList.add('shopping-card')
        this.element.innerHTML = `
            <div class="shopping-card__wrapper">
                <div>
                    <table class="shopping-card__table">
                        <caption class="shopping-card__title">Shopping Card</caption>
                        <thead class="table-head">
                            <tr class="table-row">
                                <th class="table-header">Products</th>
                                <th class="table-header table-header-mid">Price</th>
                                <th class="table-header">Sub-Total</th>
                            </tr>
                        </thead>
                        <tbody class="table-body">
                            ${this.renderProduct()}
                        </tbody>
                    </table>
                </div>
                <article class="article">
                    <div class="card-totals">
                        <div class="card-totals__title">Card Totals</div>
                        <div class="lists_wrapper">
                            <ul class="list-titles">
                                <li>Sub-total</li>
                                <li>Shipping</li>
                                <li>Discount</li>
                            </ul>
                            <ul class="list-amounts">
                                <li>$${this.#totalAmount}</li>
                                <li>Free</li>
                                <li>$0</li>
                            </ul>
                        </div>
                        <hr class="hr_horizontal">
                        <div class="card-totals__result">
                            <div class="result-title">Total</div>
                            <div class="result-total">$${this.#resultTotal} USD</div>
                        </div>
                    </div>
                </article>
            </div>
        `

        this.element.querySelector('.table-body').addEventListener('click', (e) => {
            const closeBtn = e.target.closest('.close')

            if(!closeBtn) {
                return
            }

            const dataIdBtn = closeBtn.dataset.id
            this.appState.cart = this.appState.cart.filter(product => {
                return product.id !== Number(dataIdBtn)
            })
        })

        return this.element
    }
}
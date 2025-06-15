import { DivComponent } from '../../common/div-component';
import { auth, db, addDoc, collection } from '../../common/api/firebase';
import { EmailJS } from '../../common/api/emailjs'

import './shopping-card.css'

export class ShoppingCard extends DivComponent {
    constructor(appState, parentStateManager) {
        super()
        this.appState = appState
        this.parentStateManager = parentStateManager
    }

    get totalAmount() {
        return this.appState.cart.reduce((acc, product) => {
            return acc += Number(this.#discountPrice(product))
        }, 0).toFixed(2)
    }
    
    #discountPrice(product) {
        const price = product.price * (1 - product.discountPercentage / 100);
        return Math.round(price * 100) / 100;
    }

    #generateOrderId(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let result = ''

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }

        return result
    }

    sendEmail = (orderId) => {
        const ordersHtml = this.appState.cart.map(product => {
            return `
                <tr style="vertical-align: top;">
                    <td style="padding: 24px 8px 0 4px; display: inline-block; width: max-content; filter: invert(1) hue-rotate(180deg); background: white;"><a href="#"><img style="height: 64px;" src="${product.images[0]}" alt="item" height="64px"></a></td>
                    <td style="padding: 24px 8px 0 8px; width: 100%;">
                        <div>${product.title}</div>
                        <div style="font-size: 14px; color: #888; padding-top: 4px;">QTY: 1</div>
                    </td>
                    <td style="padding: 24px 4px 0 0; white-space: nowrap;"><strong>$${this.#discountPrice(product)}</strong></td>
                </tr>
            `
        }).join('')

        const ordersTable = `
            <table style="width: 100%; border-collapse: collapse;">
                <tbody>${ordersHtml}</tbody>
            </table>
        `

        // FIXME:
        const templateStaticParams = {
            order_id: orderId,
            orders: 'Orders',
            email: auth?.currentUser.email || false,
            units: this.appState.cart.length,
            cost: {
                shipping: 0,
                tax: 0,
                total: this.totalAmount
            },
            orders_table: ordersTable
        }

        new EmailJS(this.parentStateManager).sendEmail(templateStaticParams)
    }

    setOrderData = async () => {
        const order = {
            orderId: this.#generateOrderId(5),
            userId: auth.currentUser.uid || null,
            userEmail: auth.currentUser.email || null,
            items: this.appState.cart.map(({ id, price }) => {
                return {
                    productId: id,
                    price
                }
            }),
            status: 'In Progress',
            date: new Date(),
            total: this.totalAmount,
        }

        this.appState.loading = true
        try {
            await addDoc(collection(db, 'orders'), order)
            this.sendEmail(order.orderId)
            this.parentStateManager.state.setOrder = true
            this.appState.cart = []
            console.log('Success in creating a new item in the orders collection')
        } catch (err) {
            console.error(`Error in creating a new item in the orders collection: ${err}`)
        } finally {
            this.appState.loading = false
        }
    }

    cardTotalsBtnListener = () => {
        if(!auth.currentUser || this.appState.cart.length === 0) {
            return
        }

        this.setOrderData()
    }

    renderProduct = () => {
        return this.appState.cart.map(product => {
            const discountPrice = this.#discountPrice(product)
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
                        <span class="table-data__sale-price">${discountPrice}</span>
                    </td>
                    <td class="table-data">
                        <span class="table-data__sale-price">$${discountPrice}</span>
                    </td>
                </tr>
            `
        }).join('')
    }

    render() {
        this.element.classList.add('shopping-card')

        const isCartEmpty = this.appState.cart.length === 0;

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
                                <li>$${this.totalAmount}</li>
                                <li>Free</li>
                                <li>$0</li>
                            </ul>
                        </div>
                        <hr class="hr_horizontal">
                        <div class="card-totals__result">
                            <div class="result-title">Total</div>
                            <div class="result-total">$${this.totalAmount} USD</div>
                        </div>
                        <button class="btn btn_active card-totals__btn" 
                            ${isCartEmpty ? 'disabled' : ''}
                        >
                            Place an order
                            <img class="btn-arrow-img" src="./static/icons/arrow-right-white.svg" alt="Arrow right">
                        </button>
                    </div>
                </article>
            </div>
        `

        const tbody = this.element.querySelector('.table-body')
        const cardTotalsBtn = this.element.querySelector('.card-totals__btn')
        
        tbody.addEventListener('click', (e) => {
            const closeBtn = e.target.closest('.close')

            if(!closeBtn) {
                return
            }

            const dataIdBtn = closeBtn.dataset.id
            this.appState.cart = this.appState.cart.filter(product => {
                return product.id !== Number(dataIdBtn)
            })
        })

        cardTotalsBtn.addEventListener('click', this.cardTotalsBtnListener)

        return this.element
    }
}
import { DivComponent } from '../../common/div-component';

import './orders.css'

export class Orders extends DivComponent {
    constructor(appState) {
        super()
        this.appState = appState
    }

    render() {
        this.element.classList.add('orders')
        this.element.innerHTML = `
            <div class="orders__table">
                <div class="orders__title">Shopping Card</div>
                <div class="orders__thead">
                    <div class="th">Order ID</div>
                    <div class="th">Status</div>
                    <div class="th">Date</div>
                    <div class="th">Total</div>
                </div>
                <div class="orders__tb">
                    <div class="tb-order">
                        <div class="tb-order__id">#96459761</div>
                        <div class="tb-order__status" order-status="in-progress">IN PROGRESS</div>
                        <div class="tb-order__date">Dec 30, 2019 05:18</div>
                        <div class="tb-order__total">$1,500 (5 Products)</div>
                    </div>
                </div>
            </div>
        `

        return this.element
    }
}
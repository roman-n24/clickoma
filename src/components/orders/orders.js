import { DivComponent } from '../../common/div-component';
import { auth } from '../../common/api/firebase';

import onChange from 'on-change';

import './orders.css'

export class Orders extends DivComponent {
    constructor(appState, parentState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
        this.parentState = parentState
    }

    appStateHook = (path) => {
        if(path === 'loading') {
            this.render()
        }
    }

    #orderTable() {
        return this.parentState.orders.docs.map(item => {
            const data = item.data()

            if(data.userId !== auth.currentUser.uid) { 
                return
            }

            const dataDate = new Date(data.date.seconds * 1000)
            const dateOptions = {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false
            }

            return `
                <div class="orders__tb">
                    <div class="tb-order">
                        <div class="tb-order__id">${item.id}</div>
                        <div class="tb-order__status" order-status="in-progress">${data.status.toUpperCase()}</div>
                        <div class="tb-order__date">${new Intl.DateTimeFormat('en-US', dateOptions).format(dataDate)}</div>
                        <div class="tb-order__total">$${data.total} (${data.items.length} Products)</div>
                    </div>
                </div>
            `
        }).join('')
    }

    render() {
        this.element.classList.add('orders')

        if(this.appState.loading) {
            this.element.innerHTML = `
                <div class="loading">Loading...</div>
            `
            return this.element
        }

        this.element.innerHTML = `
            <div class="orders__table">
                <div class="orders__title">Shopping Card</div>
                <div class="orders__thead">
                    <div class="th">Order ID</div>
                    <div class="th">Status</div>
                    <div class="th">Date</div>
                    <div class="th">Total</div>
                </div>
                ${this.#orderTable()}
            </div>
        `

        return this.element
    }
}
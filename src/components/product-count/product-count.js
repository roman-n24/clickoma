import { DivComponent } from '../../common/div-component';
import './product-count.css'

export class ProductCount extends DivComponent {
    constructor(state) {
        super()
        this.state = state
    }

    render() {
        this.element.classList.add('card-product-count')
        this.element.innerHTML = `
            <button class="card-product-count__btn-min btn">
                <img src="./static/icons/minus.svg" alt="Minus">
            </button>
            <span class="card-product-count__num">1</span>
            <button class="card-product-count__btn-plus btn">
                <img src="./static/icons/plus.svg" alt="Plus">
            </button>
        `

        const counter = this.element.querySelector('.card-product-count__num')
        const countBtnMinus = this.element.querySelector('.card-product-count__btn-min')
        const countBtnPlus = this.element.querySelector('.card-product-count__btn-plus')

        countBtnMinus.addEventListener('click', () => {
            if(Number(counter.innerText) > 1) {
                counter.innerText = Number(counter.innerText) - 1
            }
        })

        countBtnPlus.addEventListener('click', () => {
            if(Number(counter.innerText) < this.state.productData.stock) {
                counter.innerText = Number(counter.innerText) + 1
            }
        })

        return this.element
    }
}
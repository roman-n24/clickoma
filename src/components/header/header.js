import { DivComponent } from '../../common/div-component';
import { Search } from '../search/search';

import './header.css'

export class Header extends DivComponent {
    constructor(appState) {
        super()
        this.appState = appState
    }

    render() {
        this.element.classList.add('header')
        this.element.innerHTML = `
            <div class="header__wrapper">
                <div class="header__info">
                    <div class="info-text">Welcome to Clicon online eCommerce store. </div>
                    <div class="s-networks">
                        <div class="s-networks__mes-wrap">
                            <div class="s-networks__title">Follow us:</div>
                            <ul class="s-networks__icons">
                                <li>
                                    <a href="https://www.instagram.com/irina_nugumanova/">
                                        <img src="./static/icons/instagram.svg" alt="Instagram">
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.reddit.com/user/Late_Q/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button">
                                        <img src="./static/icons/reddit.svg" alt="Reddit">
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                        <img src="./static/icons/youtube.svg" alt="Youtube">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr class="hr_horizontal" />
                <div class="header__main">
                    <a href="#"><img src="./static/icons/logo.svg" alt="Logo"></a>
                    <div class="search_wrap"></div>
                    <div class="icons">
                        <div class="icons__cart">
                            <a href="#cart">
                                <img src="./static/icons/cart.svg" alt="Корзина покупок">
                            </a>
                            <div class="cart-products-count">${this.appState.cart.length}</div>
                        </div>
                        <div class="icons__profile">
                            <a href="#profile">
                                <img src="./static/icons/user.svg" alt="Пользователь">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `

        window.addEventListener('scroll', () => {
            if(window.scrollY > 0) {
                this.element.querySelector('.header__info').classList.add('hidden')
                this.element.querySelector('.hr_horizontal').classList.add('hidden')
            } else {
                this.element.querySelector('.header__info').classList.remove('hidden')
                this.element.querySelector('.hr_horizontal').classList.remove('hidden')
            }
        })

        const search = this.element.querySelector('.search_wrap')
        search.append(this.renderSearch())

        return this.element
    }

    renderSearch() {
        const search = new Search(this.appState)
        return search.render()
    }
}
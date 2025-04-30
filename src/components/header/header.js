import { DivComponent } from '../../common/div-component';
import { Search } from '../search/search';
import './header.css'

export class Header extends DivComponent {
    constructor(appState, state) {
        super()
        this.appState = appState
        this.state = state
    }

    render() {
        const header = document.createElement('header')
        header.classList.add('header')
        header.innerHTML = `
            <div class="header__wrapper">
                <div class="header__info">
                    <div class="info-text">Welcome to Clicon online eCommerce store. </div>
                    <div class="s-networks">
                        <div class="s-networks__mes-wrap">
                            <div class="s-networks__title">Follow us:</div>
                            <ul class="s-networks__icons">
                                <li>
                                    <a href="#"><img src="./static/icons/instagram.svg" alt="Instagram"></a>
                                </li>
                                <li>
                                    <a href="#"><img src="./static/icons/reddit.svg" alt="Reddit"></a>
                                </li>
                                <li>
                                    <a href="#"><img src="./static/icons/youtube.svg" alt="Youtube"></a>
                                </li>
                            </ul>
                        </div>
                        <div class="br-vertical"></div>
                        <div class="sel-currency">
                            <select name="currency" id="currency-id">
                                <option value="usd">USD</option>
                                <option value="rub">RUB</option>
                                <option value="cny">CNY</option>
                            </select>
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
                                <img src="./static/icons/cart-simple.svg" alt="Корзина покупок">
                                <img 
                                    src="./static/icons/cart-notification.svg" 
                                    alt="Уведомление" 
                                    class="notification"
                                >
                            </a>
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

        this.element.append(header)

        const search = this.element.querySelector('.search_wrap')
        search.append(this.renderSearch())

        return this.element
    }

    renderSearch() {
        const search = new Search(this.state)
        return search.render()
    }
}
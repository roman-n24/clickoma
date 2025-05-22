import { DivComponent } from '../../common/div-component';

import './account.css'

export class Account extends DivComponent {
    constructor(appState) {
        super()
        this.appState = appState
    }

    render() {
        this.element.classList.add('account')
        this.element.innerHTML = `
            <h1 class="account__title">Мой профиль</h1>
            <div class="account__info">
                <img src="" alt="Avatar">
                <div class="user">
                    <div class="user__name">Mike</div>
                    <div class="user__email">mike@resail.com</div>
                </div>
            </div>
            <a href="#edit" class="account__change">
                <img src="./static/icons/pencil-simple-line.svg" alt="Pencil">
                <span class="user-change-title">Change profile</span>
            </a>
        `

        return this.element
    }
}
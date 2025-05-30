import { auth } from '../../common/api/firebase';
import { DivComponent } from '../../common/div-component';

import './account.css'

export class Account extends DivComponent {
    constructor(parentState) {
        super()
        this.parentState = parentState
    }

    get user() {
        const user = auth.currentUser
        return {
            email: user.email,
        }
    }

    render() {
        this.element.classList.add('account')
        
        this.element.innerHTML = `
            <h1 class="account__title">Мой профиль</h1>
            <div class="account__info">
                    <div class="user-name">${this.parentState.userData?.name}</div>
                    <div class="user-email">${this.user.email}</div>
            </div>
            <a href="#edit" class="account__change">
                <img src="./static/icons/pencil-simple-line.svg" alt="Pencil">
                <span class="user-change-title">Change profile</span>
            </a>
            <button class="btn account__btn">
                Exit account
            </button>
        `

        const accBtn = this.element.querySelector('.account__btn')

        accBtn.addEventListener('click', (e) => {
            e.preventDefault()
            auth.signOut()
        })

        return this.element
    }
}
import { auth } from '../../common/api/firebase';
import { DivComponent } from '../../common/div-component';

import './account.css'

export class Account extends DivComponent {
    constructor(parentState) {
        super()
        this.parentState = parentState
    }

    render() {
        this.element.classList.add('account')
        
        console.log(this.parentState.userData)

        this.element.innerHTML = `
            <h1 class="account__title">Мой профиль</h1>
            <div class="account__info">
                    <div class="user-name">${this.parentState.userData?.name}</div>
                    <div class="user-email">${auth.currentUser.email}</div>
            </div>
            <div class="account__interaction-wrapper">
                <a href="#edit" class="account__change">
                    <img src="./static/icons/pencil-simple-line.svg" alt="Pencil">
                    <span class="user-change-title">Change profile</span>
                </a>
                <button class="btn account__btn">
                    Exit account
                </button>
            </div>
        `

        const accBtn = this.element.querySelector('.account__btn')

        accBtn.addEventListener('click', (e) => {
            e.preventDefault()
            auth.signOut()
        })

        return this.element
    }
}
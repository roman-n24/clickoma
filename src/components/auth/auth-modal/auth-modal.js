import { DivComponent } from '../../../common/div-component';
import { RegisterForm } from '../register-form/register-form';
import { LoginForm } from '../login-form/login-form';

import './auth-modal.css'

export class AuthModal extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    render() {
        this.element.classList.add('auth-modal');
        this.element.innerHTML = `
            <div class="auth-modal__select">
                <button class="btn login-tab" data-tab="login" data-active="open">Login</button>
                <button class="btn register-tab" data-tab="register" data-active="close">Register</button>
            </div>
            <div class="auth-modal__wrapper"></div>
        `;

        const authModalWrap = this.element.querySelector('.auth-modal__wrapper')
        const modalSelect = this.element.querySelector('.auth-modal__select')
        const loginForm = new LoginForm(this.appState).render()

        modalSelect.append(loginForm)

        // Полностью переделать логику
        modalSelect.addEventListener('click', (e) => {
            if(e.target.dataset.active !== 'open') {
                if(e.target.dataset.tab === 'login') {
                    authModalWrap.innerHTML = ''
                    e.target.dataset.active = 'close'
                    authModalWrap.append(loginForm)
                    console.log('render')
                } else {
                    authModalWrap.innerHTML = ''
                    e.target.dataset.active = 'active'
                    authModalWrap.append(new RegisterForm(this.appState).render())
                    console.log('render')
                }
            }
        })

        return this.element;
    }
}
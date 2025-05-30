import { DivComponent } from '../../../common/div-component';
import { RegisterForm } from '../register-form/register-form';
import { LoginForm } from '../login-form/login-form';

import './auth-modal.css'

export class AuthModal extends DivComponent {
    constructor(firebaseMethods) {
        super();
        this.firebaseMethods = firebaseMethods
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
        const loginFormRender = new LoginForm(this.firebaseMethods).render()
        const regFormRender = new RegisterForm(this.firebaseMethods).render()

        authModalWrap.append(loginFormRender)

        modalSelect.addEventListener('click', (e) => {
            const dataTab = e.target.dataset.tab

            if(!dataTab) {
                return
            }

            authModalWrap.innerHTML = ''
            authModalWrap.append(dataTab === 'login' ? loginFormRender : regFormRender)
        })

        return this.element;
    }
}
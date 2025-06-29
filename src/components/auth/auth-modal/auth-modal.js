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
            <div class="auth-modal__wrapper">
                <div class="auth-modal__select">
                    <button class="btn auth-btn login-tab tab_active" data-tab="login">Login</button>
                    <button class="btn auth-btn register-tab" data-tab="register" >Register</button>
                </div>
                <div class="auth-modal__fields"></div>
            </div>
        `;

        const authModalWrap = this.element.querySelector('.auth-modal__fields')
        const modalSelect = this.element.querySelector('.auth-modal__select')
        
        const loginFormRender = new LoginForm(this.firebaseMethods).render()
        const regFormRender = new RegisterForm(this.firebaseMethods).render()
        
        authModalWrap.append(loginFormRender)
        
        modalSelect.addEventListener('click', (e) => {
            const dataTab = e.target.dataset.tab
            const tabActive = this.element.querySelector('.tab_active')

            tabActive.classList.remove('tab_active')
            e.target.classList.add('tab_active')

            if(!dataTab) {
                return
            }

            authModalWrap.innerHTML = ''
            authModalWrap.append(dataTab === 'login' ? loginFormRender : regFormRender)
        })

        return this.element;
    }
}
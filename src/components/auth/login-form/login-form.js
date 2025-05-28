import { DivComponent } from '../../../common/div-component'

import './login-form.css'

export class LoginForm extends DivComponent {
    constructor(appState) {
        super()
        this.appState = appState
    }

    render() {
        this.element.classList.add('login-form')
        this.element.innerHTML = `
            <h4 class="login-form__title">Sign in</h4>
            <form id="signin-form">
                <div class="input-field">
                    <input type="email" id="signin-email" placeholder="Enter your email" required />
                    <label class="input-label" for="signin-email">Email address</label>
                </div>
                <div class="input-field">
                    <input type="password" id="signin-password" placeholder="Enter your password" required autocomplete="current-password" />
                    <label class="input-label" for="signin-password">Choose password</label>
                </div>
                <button class="btn btn_active login-form__btn">Sign in</button>
            </form>
        `

        return this.element
    }
}
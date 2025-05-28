import { DivComponent } from '../../../common/div-component'

import './register-form.css'

export class RegisterForm extends DivComponent {
    constructor(appState) {
        super()
        this.appState = appState
    }

    

    render() {
        this.element.classList.add('register-form')
        this.element.innerHTML = `
            <h4 class="register-form__title">Sign up</h4>
            <form id="signup-form">
                <div class="input-field">
                    <input type="text" id="signup-name" placeholder="Enter your name" required />
                    <label class="input-label" for="signup-name">Your name</label>
                </div>
                <div class="input-field">
                    <input type="email" id="signup-email" placeholder="Enter your email" required />
                    <label class="input-label" for="signup-email">Email address</label>
                </div>
                <div class="input-field">
                    <input type="password" id="signup-password" placeholder="Enter your password" required autocomplete="new-password" />
                    <label class="input-label" for="signup-password">Choose password</label>
                </div>
                <div class="input-field">
                    <input type="number" id="signup-age" placeholder="Enter your age" />
                    <label class="input-label" for="signup-age">Age</label>
                </div>
                <button class="btn btn_active register-form__btn">Sign up</button>
            </form>
        `

        return this.element
    }
}
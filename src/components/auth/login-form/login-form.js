import { DivComponent } from '../../../common/div-component'

import './login-form.css'

export class LoginForm extends DivComponent {
    constructor(firebaseMethods) {
        super()
        this.firebaseMethods = firebaseMethods
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

        const signInForm = this.element.querySelector('#signin-form')

        signInForm.addEventListener('submit', async (e) => {
            e.preventDefault()

            const email = e.target['signin-email'].value
            const password = e.target['signin-password'].value

            try {
                await this.firebaseMethods.signInWithEmailAndPassword(this.firebaseMethods.auth, email, password)
            } catch (err) {
                console.error(`Error during user registration ${err}`)
            }

        })

        return this.element
    }
}
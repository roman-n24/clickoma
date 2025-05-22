import { DivComponent } from '../../common/div-component';

import { auth } from './src/common/api/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import './register-form.css'

export class RegisterForm extends DivComponent {
    constructor(appState) {
        super()
        this.appState = appState
    }

    render() {
        // this.element.classList.add('')
        this.element.innerHTML = ``

        return this.element
    }
}
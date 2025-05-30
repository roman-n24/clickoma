import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { AuthModal } from '../components/auth/auth-modal/auth-modal';
import { 
    db, 
    auth,
    doc,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    setDoc,
    collection
} from '../common/api/firebase'

import onChange from 'on-change';

export class AuthView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
        this.firebaseMethods = { 
            db, 
            auth, 
            doc, 
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            setDoc,
            collection
        }
    }

    appStateHook = (path) => {
        if(path === 'cart') {
            this.render()
        }
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    render() {
        onAuthStateChanged(auth, user => {
            if(user) {
                location.hash = '#'
                return
            }

            this.app.innerHTML = ''
            this.setTitle('Auth')
            
            const main = document.createElement('div')

            main.classList.add('main')
            main.append(new AuthModal(this.firebaseMethods).render())
            
            this.app.append(main)
            this.app.prepend(this.renderHeader())
        })
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
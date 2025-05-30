import { AbstractView } from '../common/view';
import { Account } from '../components/account/account';
import { Header } from '../components/header/header';
import { Orders } from '../components/orders/orders';
import {  
    onAuthStateChanged,
    auth,
    collection,
    db
} from '../common/api/firebase'
import { onSnapshot } from 'firebase/firestore';

import onChange from 'on-change';

export class ProfileView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
        this.state = {
            userData: null,
        }
        this.state = onChange(this.state, this.stateHook)
        this.users()
    }

    appStateHook = (path) => {
        if(path === 'cart') {
            this.render()
        }
    }

    stateHook = (path) => {
        if(path === 'userData') {
            this.render()
        }
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    setUserData(data) {
        if(data !== this.state.userData) {
            const doc = data.find(doc => doc.id === auth.currentUser?.uid)
            this.state.userData = doc?.data()
        }

        return
    }

    users() {
        onSnapshot(collection(db, 'users'), (snap) => {
            this.setUserData(snap.docs)
        }, (error) => {
            console.error("onSnapshot error:", error);
        });
    }

    render() {
        onAuthStateChanged(auth, user => {
            if(!user) {
                location.hash = '#auth'
                return
            }
            
            this.app.innerHTML = ''
            this.setTitle('Profile')

            if(!this.state.userData) {
                this.app.innerHTML = `
                    <div class="loading">Loading...</div>
                `
                return this.app
            }


            const main = document.createElement('div')
            main.classList.add('main')

            main.append(new Account(this.state).render())
            main.append(new Orders(this.appState).render())
            
            this.app.append(main)
            this.app.prepend(this.renderHeader())
        })
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
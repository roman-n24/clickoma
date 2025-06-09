import { AbstractView } from '../common/view';
import { Account } from '../components/account/account';
import { Header } from '../components/header/header';
import { Orders } from '../components/orders/orders';
import {  
    onAuthStateChanged,
    auth,
    collection,
    db,
    onSnapshot, 
    getDocs
} from '../common/api/firebase'

import onChange from 'on-change';

export class ProfileView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.state = {
            userData: null,
            orders: null,
        }
        this.state = onChange(this.state, this.stateHook)
    }

    stateHook = (path) => {
        if(['userData', 'orders'].includes(path)) {
            this.render()
        }
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    setOrdersData = async () => {
        this.appState.loading = true
        try {
            const querySnap = await getDocs(collection(db, 'orders'))
            this.state.orders = querySnap
        } catch (err) {
            console.error(`Error receiving user order data from firestore: ${err}`)
        } finally {
            this.appState.loading = false
        }
    }

    setUserData(data) {
        const doc = data.find(doc => doc.id === auth.currentUser?.uid)
        this.state.userData = doc?.data()
        
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
        if(!this.state.userData) {
            this.users()
        }

        if(!this.state.orders) { 
            this.setOrdersData()
        }

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
            main.append(new Orders(this.appState, this.state).render())
            
            this.app.append(main)
            this.app.prepend(this.renderHeader())
        })
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
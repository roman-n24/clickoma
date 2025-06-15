import { AbstractView } from '../common/view';
import { Account } from '../components/account/account';
import { Header } from '../components/header/header';
import { Orders } from '../components/orders/orders';
import {  
    onAuthStateChanged,
    auth,
    collection,
    db,
    onSnapshot
} from '../common/api/firebase'

import onChange from 'on-change';
import { FirestoreOrders } from '../common/api/firestore-orders';

export class ProfileView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
        this.state = {
            userData: null,
            ordersData: null
        }
        this.state = onChange(this.state, this.stateHook)
        this.firestoreOrders = new FirestoreOrders((orders) => {
            this.state.ordersData = orders
        })
        this.firestoreOrders.loadOrders()
    }

    appStateHook = (path) => {
        if(path === 'loading') {
            this.render()
        }
    }

    stateHook = (path) => {
        if(['userData', 'ordersData'].includes(path)) {
            this.render()
        }
    }

    destroy() {
        onChange.unsubscribe(this.appState);
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
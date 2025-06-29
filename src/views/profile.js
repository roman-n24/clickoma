import { AbstractView } from '../common/view';
import { Account } from '../components/account/account';
import { Header } from '../components/header/header';
import { Orders } from '../components/orders/orders';
import {  
    onAuthStateChanged,
    auth,
    collection,
    db,
    getDocs
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
        this.subToAuth()
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
        onChange.unsubscribe(this.state)
    }

    setUserData(snapshots) {
        if(!auth.currentUser) {
            console.warn('User is not authenticated')
            return
        }

        const doc = snapshots.find(doc => doc.id === auth.currentUser?.uid)

        if(!doc) {
            console.warn('User document not found in Firestore')
            this.state.userData = null;
            return
        }

        this.state.userData = doc?.data()
        return
    }

    users = async () => {
        try {
            if (!auth.currentUser) {
                console.warn("User is not authenticated");
                return;
            }

            const snapshot = await getDocs(collection(db, 'users'));
            this.setUserData(snapshot.docs)
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    subToAuth() {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                location.hash = '#auth';
                return;
            }

            this.users();
            this.render();
        });
    }

    render() {
        if(!this.state.userData) {
            this.app.innerHTML = `
                    <div class="loading">Loading...</div>
                `
            return this.app
        }
        
        this.app.innerHTML = ''
        this.setTitle('Profile')

        const main = document.createElement('div')
        main.classList.add('main')

        main.append(new Account(this.state).render())
        main.append(new Orders(this.appState, this.state).render())
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
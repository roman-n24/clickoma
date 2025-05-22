import { AbstractView } from '../common/view';
import { Account } from '../components/account/account';
import { Header } from '../components/header/header';

import onChange from 'on-change';
import { Orders } from '../components/orders/orders';

export class ProfileView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
    }

    appStateHook = (path) => {
        
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    render() {
        // if(!this.appState.user) {
        //     location.hash = 'auth'
        //     return
        // }

        this.app.innerHTML = ''
        this.setTitle('Profile')

        const main = document.createElement('div')

        main.classList.add('main')
        main.append(new Account(this.appState).render())
        main.append(new Orders(this.appState).render())
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
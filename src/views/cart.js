import { StateManager } from '../common/state-manager';
import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { ShoppingCard } from '../components/shopping-card/shopping-card';

import onChange from 'on-change';

export class CartView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
        this.stateManager = new StateManager({ sendEmail: false, setOrder: false }, this.stateManagerHook)
    }

    appStateHook = (path) => {
        if(path === 'cart') { 
            this.render()
        }
    }

    stateManagerHook = (path) => {
        if(['sendEmail', 'setOrder'].includes(path)) {
            this.render()
        }
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    render() {
        this.app.innerHTML = ''
        this.setTitle('Shopping Cart')
        
        const main = document.createElement('div')

        main.classList.add('main')
        main.append(new ShoppingCard(this.appState, this.stateManager).render())
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
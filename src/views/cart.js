import onChange from 'on-change';

import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { ShoppingCard } from '../components/shopping-card/shopping-card';
import { StateManager } from '../common/state-manager';

export class CartView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
        this.stateManager = new StateManager({}, this.render)
    }

    appStateHook = (path) => {
        if(path === 'cart') { 
            this.render()
            console.log('update cart')
        }
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        this.stateManager.destroy();
    }

    render() {
        this.app.innerHTML = ''
        const main = document.createElement('div')

        main.classList.add('main')
        main.append(new ShoppingCard(this.appState, this.stateManager.state).render())
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
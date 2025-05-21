import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { ShoppingCard } from '../components/shopping-card/shopping-card';

import onChange from 'on-change';

export class CartView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
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
        this.app.innerHTML = ''
        this.setTitle('Shopping Cart')
        
        const main = document.createElement('div')

        main.classList.add('main')
        main.append(new ShoppingCard(this.appState).render())
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
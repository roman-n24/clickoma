import onChange from 'on-change';

import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';

export class CartView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
    }

    destroy() {
        onChange.unsubscribe(this.appState)
    }

    render() {
        this.app.innerHTML = ''
        const main = document.createElement('div')
        main.classList.add('main')
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
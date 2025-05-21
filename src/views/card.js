import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { CardDetails } from '../components/card-details/card-details';
import { StateManager } from '../common/state-manager';

import onChange from 'on-change';

export class CardView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
        this.stateManager = new StateManager({
            activeImage: undefined,
            product: []
        }, this.stateHook)
    }

    appStateHook = (path) => {
        if(['cart', 'loading'].includes(path)) {
            this.render()
        }
    }

    stateHook = async (path) => {
        if(path === 'activeImage') {
            this.render()
        }
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        this.stateManager.destroy()
    }

    initProduct = async () => {
        try {
            this.appState.loading = true
            this.stateManager.state.product = await this.loadProduct()

            if(!this.stateManager.activeImage) {
                console.log('active img')
                this.stateManager.state.activeImage = this.stateManager.state.product.images[0]
            }

            this.render();
        } catch (error) {
            console.error('Ошибка при инициализации продукта:', error);
        } finally {
            this.appState.loading = false;
        }
    }

    loadProduct = async () => {
        try {
            const id = this.appState.slashName.split('=')[1]
            const res = await fetch(`https://dummyjson.com/products/${id}`)
            
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`)
            }

            return res.json();

        } catch (err) {
            console.error(`Ошибка загрузки продуктов ${err}`)
        }
    }

    render() {
        this.app.innerHTML = ''

        const main = document.createElement('div')
        main.classList.add('main')
        main.append(new CardDetails(this.appState, this.stateManager).render())

        this.app.append(main)
        this.app.prepend(this.renderHeader())
        
        if(this.stateManager.state.product.length === 0) {
            this.initProduct()
            return
        }

        if(this.stateManager.state.product) {
            this.setTitle(`To order ${this.stateManager.state.product.title}`)
        }
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
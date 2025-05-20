import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { CardDetails } from '../components/card-details/card-details';
import onChange from 'on-change';
import { StateManager } from '../common/state-manager';

export class CardView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
        this.stateManager = new StateManager({
            productId: this.appState.slashName.split('=')[1],
            activeImage: undefined,
            product: []
        }, this.stateHook)
        this.initProduct()
    }

    appStateHook = (path) => {
        if(path === 'cart') { 
            this.render()
        }
    }

    stateHook = async (path) => {
        if(path === 'productId' || path === 'activeImage') {
            this.render()
        }
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        this.stateManager.destroy()
    }

    initProduct = async () => {
        try {
            this.stateManager.state.loading = true
            this.stateManager.state.product = await this.loadProduct()

            if(!this.stateManager.activeImage) {
                console.log('active img')
                this.stateManager.state.activeImage = this.stateManager.state.product.images[0]
            }

            this.stateManager.state.loading = false;
            this.render();
        } catch (error) {
            console.error('Ошибка при инициализации продукта:', error);
            this.stateManager.state.loading = false;
        }
    }

    loadProduct = async () => {
        try {
            const res = await fetch(`https://dummyjson.com/products/${this.stateManager.state.productId}`)
            return res.json()
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
    }

    renderHeader() {
        const header = new Header(this.appState, this.stateManager).render()
        return header
    }
}
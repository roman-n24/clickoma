import onChange from 'on-change';

import { AbstractView } from '../common/view';
import { CardList } from '../components/card-list/card-list';
import { Header } from '../components/header/header';
import { Navigation } from '../components/navigation/navigation';
import { StateManager } from '../common/state-manager';

export class CategoryProductsView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.stateManager = new StateManager({}, this.render.bind(this))
        this.loadListCategory()
    }

    destroy() {
        onChange.unsubscribe(this.appState)
        this.stateManager.destroy()
    }

    loadListCategory = async () => {
        try {
            this.stateManager.state.loading = true;
            const res = await fetch(`https://dummyjson.com/products/category/${this.appState.slashName}`)
            const data = await res.json()

            this.stateManager.state.list = data.products
            this.stateManager.state.loading = false
            this.render()
        } catch (err) {
            console.error(`Ошибка загрузки данных категории: ${err}`)
        }
    }

    render() {
        this.app.innerHTML = ''
        const main = document.createElement('div')
        main.classList.add('main')
        main.prepend(new Navigation(this.appState).render())
        main.append(new CardList(this.stateManager).render())
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState, this.stateManager).render()
        return header
    }
}
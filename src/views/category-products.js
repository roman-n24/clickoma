import { AbstractView } from '../common/view';
import { CardList } from '../components/card-list/card-list';
import { Header } from '../components/header/header';
import { Navigation } from '../components/navigation/navigation';

import onChange from 'on-change';

export class CategoryProductsView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
        this.loadCategoryList()
    }

    appStateHook = async (path) => {
        if (['searchQuery', 'skip', 'limit'].includes(path)) {
            this.handleListLoad()
        }

        if (['list', 'loading', 'cart'].includes(path)) {
            this.render();
        }
    }

    destroy() {
        onChange.unsubscribe(this.appState)
    }

    handleListLoad = async () => {
        try {
            this.appState.loading = true;

            const data = await this.appState.loadList(
                this.appState.searchQuery || '',
                this.appState.skip,
                this.appState.limit
            );

            this.appState.numFound = data.products.length;
            this.appState.list = data.products;
        } catch (err) {
            console.error(`Ошибка загрузки списка: ${err}`);
        } finally {
            this.appState.loading = false;
        }
    }

    loadCategoryList = async () => {
        try {
            this.appState.loading = true;

            const res = await fetch(`https://dummyjson.com/products/category/${this.appState.slashName}`)

            if(!res.ok) {
                throw new Error(`HTTP error: ${res.status}`)
            }

            const data = await res.json()

            this.appState.list = data.products
            this.render()
        } catch (err) {
            console.error(`Ошибка загрузки данных категории: ${err}`)
        } finally {
            this.appState.loading = false
        }
    }

    render() {
        this.app.innerHTML = ''
        const [first, ...other] = this.appState.slashName
        this.setTitle(`To order ${first.toUpperCase()}${other.join('')}`)
        
        const main = document.createElement('div')

        main.classList.add('main')
        main.prepend(new Navigation(this.appState).render())
        main.append(new CardList(this.appState).render())
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
import { CartView } from './views/cart'
import { MainView } from './views/main'
import { CardView } from './views/card'
import { CategoryProductsView } from './views/category-products'
import { SearchListView } from './views/search-list'

class App {
    routes = [
        { path: '', view: MainView },
        { path: '#', view: MainView },
        { path: '#search', view: SearchListView },
        { path: '#cart', view: CartView },
        { path: '#product', view: CardView },
        { path: '#category', view: CategoryProductsView },
    ]
    appState = {
        cart: [],
        categories: [],
        searchQuery: undefined,
        skip: 0,
        limit: 30,
        numFound: 0,
        slashName: undefined,
        loadList: async (q, skip, limit) => {
            const res = await fetch(`https://dummyjson.com/products/search?q=${q || ''}&skip=${skip || 0}&limit=${limit || 0}`);
            const data = await res.json();
            return data;
        }
    }

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this))
        this.loadCategory()
        this.route()
    }

    loadCategory = async () => {
        try {
            const res = await fetch(`https://dummyjson.com/products/categories`)

            if (!res.ok) {
                throw new Error(`HTTP ошибка: ${res.status}`);
            }

            this.appState.categories = await res.json()

            if (!Array.isArray(this.appState.categories)) {
                throw new Error('Неверный формат данных: ожидался массив');
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    route() {
        if(this.currentView) {
            this.currentView.destroy()
        }

        const url = location.hash.split('/')

        console.log(url)

        if(url.length > 0) {
            this.appState.slashName = url[1]
        }


        const view = this.routes.find(route => route.path === url[0])?.view

        if(view === undefined) {
            return console.error('View undefined!')
        }

        this.currentView = new view(this.appState)

        this.currentView.render()

        // if(this.appState.slashName && this.appState.slashName.split('=')[0] === 'search') {
        //     const search = this.appState.slashName.split('=')[1]
        //     this.currentView.stateManager.searchQuery = search
        // }
    }
}

new App()
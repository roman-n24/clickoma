import { CartView } from './views/cart'
import { CategoryProductsView } from './views/category-products'
import { MainView } from './views/main'
import { ProductView } from './views/product'

class App {
    routes = [
        { path: '', view: MainView },
        { path: '#cart', view: CartView },
        { path: '#product', view: ProductView },
        { path: '#category', view: CategoryProductsView }
    ]
    appState = {
        cart: [],
        slashName: undefined,
        categories: []
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

        if(url.length > 0) {
            this.appState.slashName = url[1]
        }

        console.log(url)

        const view = this.routes.find(route => route.path === url[0])?.view

        if(view === undefined) {
            return console.error('View undefined!')
        }

        this.currentView = new view(this.appState)
        this.currentView.render()
    }
}

new App()
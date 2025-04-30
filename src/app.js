import { CartView } from './views/cart'
import { CategoryProductsView } from './views/category-products'
import { MainView } from './views/main'
import { ProductView } from './views/product'

class App {
    routes = [
        { path: '', view: MainView },
        { path: '#cart', view: CartView },
        { path: '#product', view: ProductView },
        { path: '#categories', view: CategoryProductsView }
    ]
    appState = {
        cart: [],
    }

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this))
        this.route()
    }

    route() {
        if(this.currentView) {
            this.currentView.destroy()
        }

        const hash = location.hash.split('/')[0]
        console.log(hash)

        const view = this.routes.find(route => route.path === hash)?.view

        if(view === undefined) {
            return console.error('View undefined!')
        }

        this.currentView = new view(this.appState)
        this.currentView.render()
    }
}

new App()
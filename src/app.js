import { CartView } from './views/cart';
import { MainView } from './views/main';
import { CardView } from './views/card';
import { CategoryProductsView } from './views/category-products';
import { SearchListView } from './views/search-list';
import { ProfileView } from './views/profile';
import { AuthView } from './views/auth';

class App {
    routes = [
        { path: '', view: MainView },
        { path: '#', view: MainView },
        { path: '#search', view: SearchListView },
        { path: '#cart', view: CartView },
        { path: '#product', view: CardView },
        { path: '#category', view: CategoryProductsView },
        { path: '#profile', view: ProfileView },
        { path: '#auth', view: AuthView },
    ];

    appState = {
        cart: [],
        categories: [],
        searchQuery: '',
        skip: 0,
        limit: 30,
        numFound: 0,
        list: [],
        loading: false,
        slashName: '',
        orders: null,
        loadList: async (q, skip, limit) => {
            const res = await fetch(`https://dummyjson.com/products/search?q=${q || ''}&skip=${skip || 0}&limit=${limit || 0}`);
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }
            const data = await res.json();
            return data;
        }
    };

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));
        this.loadCategory();
        this.route();
    }

    loadCategory = async () => {
        try {
            const res = await fetch(`https://dummyjson.com/products/categories`);
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }
            const categories = await res.json();
            if (!Array.isArray(categories)) {
                throw new Error('Invalid data format: expected array');
            }
            this.appState.categories = categories;
        } catch (err) {
            console.error(err.message);
        }
    };

    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }

        const url = location.hash.split('/');
        
        this.appState.slashName = url[1] || '';
        this.appState.searchQuery = '';
        this.appState.skip = 0;

        if (url[0] === '#search' && this.appState.slashName.startsWith('query=')) {
            this.appState.searchQuery = this.appState.slashName.split('=')[1];
        }

        const view = this.routes.find(route => route.path === url[0])?.view;

        if (!view) {
            console.error('View undefined!');
            return;
        }

        this.currentView = new view(this.appState);
        this.currentView.render();
    }
}

new App()
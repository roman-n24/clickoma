import onChange from 'on-change';
import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { CardList } from '../components/card-list/card-list';
// import { Category } from '../components/category/category';

export class MainView extends AbstractView {
    state = {
        list: [],
        numFound: 0,
        loading: false,
        searchQuery: undefined,
        skip: 0,
        limit: 10
    }

    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
        this.state = onChange(this.state, this.stateHook)
        this.initialLoad()
    }

    async initialLoad() {
        const data = await this.loadList('', 0, 100)
        this.state.list = data.products
    }

    destroy() {
        onChange.unsubscribe(this.appState)
        onChange.unsubscribe(this.state)
    }

    stateHook = async (path) => {
        if(path === 'searchQuery' || path === 'skip' || path === 'limit') {
            this.state.loading = true

            const data = await this.loadList(this.state.searchQuery || '', this.state.skip, this.state.limit)

            this.state.numFound = data.products.length
            this.state.loading = false
            this.state.list = data.products
        }
        if(path === 'list' || path === 'loading') {
            this.render()
        }
    }

    appStateHook = (path) => {
        console.log(path)
    }

    loadList = async (q, skip, limit) => {
        const res = await fetch(`https://dummyjson.com/products/search?q=${q === undefined ? '' : q}&skip=${skip}&limit=${limit}`)
        return res.json()
    }

    render() {
        this.app.innerHTML = ''
        const main = document.createElement('div')
        main.classList.add('main')
        main.append(new CardList(this.state).render())
        // main.append(new Category().render())
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState, this.state)
        return header.render()
    }
}
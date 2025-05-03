import onChange from 'on-change';

export class StateManager {
    constructor(initialState, render) {
        this.state = {
            list: [],
            numFound: 0,
            loading: false,
            searchQuery: undefined,
            skip: 0,
            limit: 10,
            ...initialState
        }
        this.state = onChange(this.state, this.stateHook)
        this.render = render
    }

    destroy() {
        onChange.unsubscribe(this.state);
    }

    loadList = async (q, skip, limit) => {
        const res = await fetch(`https://dummyjson.com/products/search?q=${q === undefined ? '' : q}&skip=${skip}&limit=${limit}`)
        return res.json()
    }

    stateHook = async (path) => {
        if(path === 'searchQuery' || path === 'skip' || path === 'limit') {
            this.state.loading = true

            const data = await this.loadList(
                this.state.searchQuery || '',
                this.state.skip, 
                this.state.limit
            )

            this.state.numFound = data.products.length
            this.state.loading = false
            this.state.list = data.products
        }
        if(path === 'list' || path === 'loading') {
            this.render()
        }
    }
}
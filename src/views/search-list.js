import onChange from 'on-change';
import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { CardList } from '../components/card-list/card-list';
import { Navigation } from '../components/navigation/navigation';
import { Switcher } from '../components/switcher/switcher';

export class SearchListView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState
        this.appState = onChange(appState, this.appStateHook);
        this.initLoad();
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    async initLoad() {
        if (!this.appState.searchQuery) {
            this.appState.list = [];
            this.appState.numFound = 0;
            this.render();
            return;
        }

        this.appState.loading = true;
        try {
            const data = await this.appState.loadList(
                this.appState.searchQuery,
                this.appState.skip,
                this.appState.limit
            );
            this.appState.numFound = data.total;
            this.appState.list = data.products;
        } catch (error) {
            console.error('Failed to load search results:', error);
            this.appState.list = [];
            this.appState.numFound = 0;
        } finally {
            this.appState.loading = false;
            this.render();
        }
    }

    appStateHook = async (path) => {
        if (path === 'searchQuery' || path === 'limit' || path === 'skip') {
            await this.initLoad();
        }
        if(path === 'cart' || path === 'loading') {
            this.render()
        }
    }

    render() {
        console.log(this.appState.limit)

        this.app.innerHTML = '';
        const main = document.createElement('div');
        main.classList.add('main');

        main.append(new CardList(this.appState).render());
        main.prepend(new Navigation(this.appState).render());
        main.append(new Switcher(this.appState).render());

        this.app.append(main);
        this.app.prepend(this.renderHeader());
    }

    renderHeader() {
        const header = new Header(this.appState, this.stateManager);
        return header.render();
    }
}
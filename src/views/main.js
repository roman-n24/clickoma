import onChange from 'on-change';
import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { CardList } from '../components/card-list/card-list';
import { Navigation } from '../components/navigation/navigation';
import { Switcher } from '../components/switcher/switcher';

export class MainView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState
        this.appState = onChange(appState, this.appStateHook.bind(this));
        this.initLoad();
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    async initLoad() {
        this.appState.loading = true;
        try {
            const data = await this.appState.loadList('', this.appState.skip, this.appState.limit);
            this.appState.numFound = data.total;
            this.appState.list = data.products;
        } catch (error) {
            console.error('Failed to load products:', error);
            this.appState.list = [];
            this.appState.numFound = 0;
        } finally {
            this.appState.loading = false;
            this.render();
        }
    }

    appStateHook = async (path) => {
        if (path === 'skip' || path === 'limit') {
            await this.initLoad();
        }
        if (path === 'cart' || path === 'loading' || path === 'list') {
            this.render();
        }
    }

    render() {
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
        const header = new Header(this.appState);
        return header.render();
    }
}
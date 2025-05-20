import onChange from 'on-change';
import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { CardList } from '../components/card-list/card-list';
import { Navigation } from '../components/navigation/navigation';
import { Switcher } from '../components/switcher/switcher';

export class SearchListView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = onChange(appState, this.appStateHook);
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    appStateHook = async (path) => {
        if (path === 'searchQuery' || path === 'skip' || path === 'limit') {
            this.appState.loading = true;
            const data = await this.appState.loadList(
                this.appState.searchQuery || '',
                this.appState.skip,
                this.appState.limit
            );
            this.appState.numFound = data.products.length;
            this.appState.list = data.products;
            this.appState.loading = false;
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
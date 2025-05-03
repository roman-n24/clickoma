import onChange from 'on-change';
import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { CardList } from '../components/card-list/card-list';
import { Navigation } from '../components/navigation/navigation';
import { StateManager } from '../common/state-manager';

export class MainView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
        this.stateManager = new StateManager({}, this.render.bind(this))
        this.initLoad()
    }

    destroy() {
        onChange.unsubscribe(this.appState)
        this.stateManager.destroy()
    }

    appStateHook = (path) => {
        console.log(path)
    }

    initLoad = async () => {
        const data = await this.stateManager.loadList('', 0, 80)
        this.stateManager.state.list = data.products;
    }

    render() {
        this.app.innerHTML = ''
        const main = document.createElement('div')
        main.classList.add('main')
        main.append(new CardList(this.stateManager).render())
        main.prepend(new Navigation(this.appState).render())
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState, this.stateManager)
        return header.render()
    }
}
import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';

export class CategoryProductsView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
    }

    render() {
        this.app.innerHTML = ''
        const main = document.createElement('div')
        main.classList.add('main')
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
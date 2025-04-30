import { AbstractView } from '../common/view';
// import { Category } from '../components/category/category';
import { Header } from '../components/header/header';

export class CartView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
    }

    render() {
        this.app.innerHTML = ''
        const main = document.createElement('div')
        main.classList.add('main')
        // main.append(new Category().render())
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { CardDetails } from '../components/card-details/card-details';

export class CardView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.state = {
            loading: false,
            productId: this.appState.slashName.split('=')[1],
            productData: []
        }
        this.initProduct()
    }

    initProduct = async () => {
        try {
            this.state.loading = true;
            this.state.productData = await this.loadProduct();
            this.state.loading = false;
            this.render();
        } catch (error) {
            console.error('Ошибка при загрузке продукта:', error);
            this.state.loading = false;
        }
    }

    loadProduct = async () => {
        const res = await fetch(`https://dummyjson.com/products/${this.state.productId}`)
        return res.json()
    }

    render() {
        this.app.innerHTML = ''
        const main = document.createElement('div')
        main.classList.add('main')
        console.log(this.state.productData)
        main.append(new CardDetails(this.state).render())
        
        this.app.append(main)
        this.app.prepend(this.renderHeader())
    }

    renderHeader() {
        const header = new Header(this.appState).render()
        return header
    }
}
import { DivComponent } from '../../common/div-component';
import './navigation.css'

export class Navigation extends DivComponent {
    constructor(appState) {
        super()
        this.appState = appState
    }

    render() {
        this.element.classList.add('nav')
            
        this.element.innerHTML = `
            <ul class="nav__list">
                <li>
                    <button class="btn category-btn" data-category-status="close">All Category</button>
                </li>
            </ul>
            <ul class="category-list" style="display: none;">
                ${this.renderCategories()}
            </ul>
        `

        const categoryList = this.element.querySelector('.category-list')
        this.element.querySelector('.category-btn').addEventListener('mouseover', (e) => {
            this.displayCategory(e.target, categoryList)
        })

        this.element.addEventListener('mouseleave', () => {
            categoryList.style.display = 'none';
            this.element.querySelector('.category-btn').setAttribute('data-category-status', 'close');
        })

        return this.element
    }

    renderCategories() {
        if(!this.appState.categories) {
            const notFoundCategories = '<div class="not-found">Categories not found!</div>'
            return notFoundCategories
        }

        const categories = this.appState.categories

        return categories.map(category => `
            <li class="category">
                <a href="#category/${category.slug.toLowerCase()}">
                    ${category.name}
                </a>
            </li>
        `).join('')
    }

    displayCategory(target, list) {
        const targetAttribute = target.getAttribute('data-category-status')
        const newStatus = targetAttribute === 'open' ? 'close' : 'open'
        target.setAttribute('data-category-status', newStatus)
        list.style.display = newStatus === 'open' ? 'grid' : 'none'
    }
}
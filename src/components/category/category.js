import { DivComponent } from '../../common/div-component';

export class Category extends DivComponent {
    constructor() {
        super()
    }

    // async loadListCategory() {
    //     try {
    //         const res = await fetch('https://dummyjson.com/products/categories')
    //         this.categoryList = await res.json()
    //         return this.categoryList
    //     } catch (error) {
    //         console.error('Error loading categories:', error)
    //         return []
    //     }
    // }

    render() {
        const nav = document.createElement('nav')
        nav.classList.add('nav')
            
        nav.innerHTML = `
            <ul class="nav__list">
                <li>
                    <button class="btn category-btn" data-category-status="close">All Categories</button>
                </li>
            </ul>
            <ul class="category-list" style="display: none;">
                ${this.renderCategories()}
            </ul>
        `

        const categoryList = nav.querySelector('.category-list')
        nav.querySelector('.category-btn').addEventListener('click', (e) => {
            this.displayCategory(e.target, categoryList)
        })

        this.element.append(nav)

        return this.element
    }

    // renderCategories() {
    //     return this.categoryList.map(category => `
    //         <li>
    //             <a href="#categories/${category.toLowerCase()}">
    //                 ${category}
    //             </a>
    //         </li>
    //     `).join('')
    // }

    displayCategory(target, list) {
        const targetAttribute = target.getAttribute('data-category-status')
        const newStatus = targetAttribute === 'open' ? 'close' : 'open'
        target.setAttribute('data-category-status', newStatus)
        list.style.display = newStatus === 'open' ? 'grid' : 'none'
    }
}
import { DivComponent } from '../../common/div-component';
import './stars-review.css'

export class StarsReview extends DivComponent {
    constructor(product) {
        super()
        this.product = product
    }

    render() {
        let starsHTML = ''
        const primaryStars = Math.round(this.product.rating)
    
        for(let i = 0; i < primaryStars; i++) {
            starsHTML += '<li class="star star_primary"><img src="./static/icons/star-primary.svg"/></li>'
        }
    
        const emptyStars = 5 - primaryStars
    
        for(let i = 0; i < emptyStars; i++) {
            starsHTML += '<li class="star star_empty"><img src="/static/icons/star-empty.svg"/></li>'
        }
    
        return starsHTML
    }
}
import { DivComponent } from '../../common/div-component';

import './switcher.css';

export class Switcher extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    #switchNext = () => {
        if (this.appState.list.length === this.appState.limit) {
            this.appState.skip += this.appState.limit;
        }
    };

    #switchBack = () => {
        if (this.appState.skip > 0) {
            this.appState.skip -= this.appState.limit;
        }
    };

    render() {
        if (this.appState.list.length < this.appState.limit && this.appState.skip === 0) {
            return this.element;
        }

        this.element.classList.add('switcher');
        this.element.innerHTML = `
            <div class="switcher__wrapper">
                <button class="switcher__btn switcher__back" ${this.appState.skip === 0 ? 'disabled' : ''}>
                    <img src="./static/icons/arrow-left-button.svg" />
                </button>
                <div class="switcher__offset">${Math.floor(this.appState.skip / this.appState.limit) + 1}</div>
                <button class="switcher__btn switcher__next" ${this.appState.list.length < this.appState.limit ? 'disabled' : ''}>
                    <img src="./static/icons/arrow-right-button.svg"/>
                </button>
            </div>
        `;

        this.element.querySelector('.switcher__back').addEventListener('click', this.#switchBack);
        this.element.querySelector('.switcher__next').addEventListener('click', this.#switchNext);

        return this.element;
    }
}
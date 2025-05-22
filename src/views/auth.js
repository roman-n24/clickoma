import { AbstractView } from '../common/view';
import { Header } from '../components/header/header';
import { StateManager } from '../common/state-manager';

import onChange from 'on-change';
import { onAuthStateChanged } from "firebase/auth";

export class AuthView extends AbstractView {
    constructor(appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook)
        this.stateManager = new StateManager(
            {
                user: null,
                activeTab: 'login',
            }, this.stateManagerHook)
    }

    appStateHook = (path) => {
        
    }

    stateManagerHook = () => {

    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    render() {
        this.app.innerHTML = ''
        this.setTitle('Auth')
        
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
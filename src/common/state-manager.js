import onChange from 'on-change';

export class StateManager {
    constructor(initialState, stateHook = () => {}) {
        this.stateHook = stateHook;
        this.state = onChange(
            {
                list: [],
                loading: false,
                ...initialState,
            },
            (path) => {
                this.stateHook(path);
            }
        );
    }

    destroy() {
        onChange.unsubscribe(this.state);
    }
}
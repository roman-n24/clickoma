export class AbstractView {
    constructor() {
        this.app = document.getElementById('root')
    }

    setTitle(title) {
        document.title = `GYrP - ${title}`
    }

    render() {
        return
    }

    destroy() {
        return
    }
}
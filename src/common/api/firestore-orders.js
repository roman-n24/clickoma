import { onSnapshot, collection, db } from './firebase'

export class FirestoreOrders {
    constructor(updateCallback) {
        this.updateCallback = updateCallback
    }

    loadOrders = async () => {
        try {
            onSnapshot(collection(db, 'orders'), snapshot => {
                const orders = snapshot.docs.map(doc => doc.data())
                this.updateCallback(orders)
            })
        } catch (err) {
            console.error(`Error receiving orders: ${err}`)
        }
    }
}
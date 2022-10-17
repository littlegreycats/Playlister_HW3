import jsTPS_Transaction from "../common/jsTPS.js"
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(store, key) {
        super();
        this.store = store
        this.key = key
    }

    doTransaction() {
        this.store.deleteSongByKey(this.key)
    }

    undoTransaction() {
    }
}
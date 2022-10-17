import jsTPS_Transaction from "../common/jsTPS.js"
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(store, sourceKey, targetKey) {
        super();
        this.store = store;
        this.sourceKey = sourceKey
        this.targetKey = targetKey
    }

    doTransaction() {
        this.store.moveSong(this.sourceKey, this.targetKey)
    }

    undoTransaction() {
    }
}
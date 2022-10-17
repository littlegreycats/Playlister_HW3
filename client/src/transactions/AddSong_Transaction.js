import jsTPS_Transaction from "../common/jsTPS.js"
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
    }

    doTransaction() {
        this.store.addSong();
    }

    undoTransaction() {
    }
}
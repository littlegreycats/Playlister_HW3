import jsTPS_Transaction from "../common/jsTPS.js"
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store, newSong) {
        super();
        this.store = store;
        this.newSong = newSong
    }

    doTransaction() {
        this.store.editSongMarkedForEditing(this.newSong);
    }

    undoTransaction() {
    }
}
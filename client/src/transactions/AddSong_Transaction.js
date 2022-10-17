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
        console.log("undoing add song")
        this.store.deleteSongByKey(this.store.currentList.songs.length - 1)
    }
}
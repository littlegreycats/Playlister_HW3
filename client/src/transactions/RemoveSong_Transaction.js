import jsTPS_Transaction from "../common/jsTPS.js"
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(store, key) {
        super();
        this.store = store
        this.key = key
    }

    doTransaction() {
        this.oldSong = {
            title: this.store.songKeyPairMarkedForDeletion.song.title,
            artist: this.store.songKeyPairMarkedForDeletion.song.artist,
            youTubeId: this.store.songKeyPairMarkedForDeletion.song.youTubeId
        }
        this.store.deleteSongByKey(this.key)
    }

    undoTransaction() {
        // this.store.addSong();
        // this.store.moveSong(this.store.currentList.songs.length - 1, this.key)
        // this.store.editSongMarkedForEditing(this.oldSong);
    }
}
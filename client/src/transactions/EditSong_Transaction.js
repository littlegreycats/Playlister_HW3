import jsTPS_Transaction from "../common/jsTPS.js"
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store, newSong) {
        super();
        this.store = store;
        this.newSong = newSong
    }

    doTransaction() {
        this.key = this.store.songMarkedForEditing.key
        this.oldSong = {
            title: this.store.songMarkedForEditing.song.title,
            artist: this.store.songMarkedForEditing.song.artist,
            youTubeId: this.store.songMarkedForEditing.song.youTubeId
        }
        this.store.editSongMarkedForEditing(this.newSong);
    }

    undoTransaction() {
        // console.log(this.oldTitle)
        // console.log(this.oldArtist)
        // console.log(this.oldYouTubeId)
        this.store.editSongMarkedForEditing(this.oldSong);
    }
}
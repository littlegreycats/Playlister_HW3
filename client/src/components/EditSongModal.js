import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function EditSongModal() {
    const store = useContext(GlobalStoreContext);
    store.history = useHistory()

    let song = {
        title: '',
        artist: '',
        youTubeId: ''
    }
    if (store.store.songMarkedForEditing) {
        song = store.store.songMarkedForEditing.song
    }

    function handleCancel() {
        console.log("handleCancel");
        store.store.hideEditSongModal();
    }

    function handleConfirm() {
        console.log("handleConfirm");
        const song = {
            title: document.getElementById('title-input').value,
            artist: document.getElementById('artist-input').value,
            youTubeId: document.getElementById('id-input').value,
        }
        store.store.addEditSongTransaction(song)
    }

    return (
        <div 
            className="modal" 
            id="edit-song-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='edit-song-root'>
                    <div className="modal-north">
                        Edit Song
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            <div>
                                <div id="edit-song-modal-text">
                                    Title:
                                </div>
                                <input 
                                    id="title-input"
                                    className="edit-song-modal-input"
                                    defaultValue={song.title}
                                    type="text">
                                </input>
                            </div>
                            <div>
                                <div id="edit-song-modal-text">
                                    Artist:
                                </div>
                                <input
                                    id="artist-input"
                                    className="edit-song-modal-input"
                                    defaultValue={song.artist}
                                    type="text">
                                </input>
                            </div>
                            <div>
                                <div id="edit-song-modal-text">
                                    Youtube ID:
                                </div>
                                <input
                                    id="id-input"
                                    className="edit-song-modal-input"
                                    defaultValue={song.youTubeId}
                                    type="text">
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="edit-song-confirm-button" 
                            className="modal-button" 
                            onClick={handleConfirm}
                            value='Confirm' />
                        <input type="button" 
                            id="edit-song-cancel-button" 
                            className="modal-button" 
                            onClick={handleCancel}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default EditSongModal;
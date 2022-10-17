import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteSongModal() {
    const store = useContext(GlobalStoreContext);

    let songKeyPair = {
        song: {
            title: "",
            artist: "",
            youTubeId: ""
        },
        key: null
    }
    if (store.store.songKeyPairMarkedForDeletion) songKeyPair = store.store.songKeyPairMarkedForDeletion


    function handleCancel() {
        console.log("delete song modal cancel");
        store.store.hideDeleteSongModal()
    }

    function handleConfirm() {
        console.log("delete song modal confirm");
        store.store.deleteSongByKey(songKeyPair.key)
    }

    return (
        <div 
            className="modal" 
            id="delete-song-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-song-root'>
                    <div className="modal-north">
                        Delete song?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently delete "{songKeyPair.song.title}" song?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-song-confirm-button" 
                            className="modal-button" 
                            onClick={handleConfirm}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-song-cancel-button" 
                            className="modal-button" 
                            onClick={handleCancel}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default DeleteSongModal;
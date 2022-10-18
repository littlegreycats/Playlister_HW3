import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-song-selector-button"
    let undoButtonClass = "playlister-song-selector-button"
    let redoButtonClass = "playlister-song-selector-button"
    if (!store.canUndo()) undoButtonClass += "-disabled"
    if (!store.canRedo()) redoButtonClass += "-disabled"

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }

    function handleAddSong() {
        console.log("add song button pressed");
        store.addAddSongTransaction();
    }

    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    return (
        <span id="edit-toolbar" className="edit-toolbar">
            <div id="button-container">
            <input
                type="button"
                id='add-song-button'
                disabled={editStatus}
                value="+"
                className={enabledButtonClass}
                onClick={handleAddSong}
            />
            </div>
            <div id="button-container">
            <input
                type="button"
                id='undo-button'
                disabled={editStatus}
                value="⟲"
                className={undoButtonClass}
                onClick={handleUndo}
            />
            </div>
            <div id="button-container">
            <input
                type="button"
                id='redo-button'
                disabled={editStatus}
                value="⟳"
                className={redoButtonClass}
                onClick={handleRedo}
            />
            </div>
            <div id="button-container">
            <input
                type="button"
                id='close-button'
                disabled={editStatus}
                value="&#x2715;"
                className={enabledButtonClass}
                onClick={handleClose}
            />
            </div>
        </span>);
}

export default EditToolbar;
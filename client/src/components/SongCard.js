import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    // const [ isDragging, setIsDragging ] = useState(false)
    // const [ draggedTo, setDraggedTo ] = useState(false)

    const { song, index } = props;
    let cardClass = "song-card list-card unselected-list-card";

    function handleDragStart (event) {
        event.dataTransfer.setData("song", event.target.id)
        // setIsDragging(true)
    }

    function handleDragOver (event) {
        event.preventDefault()
        // setDraggedTo(true)
    }

    function handleDragEnter (event) {
        event.preventDefault()
        // setDraggedTo(true)
    }

    function handleDragLeave (event) {
        event.preventDefault()
        // setDraggedTo(false)
    }

    function handleDrop (event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.split('-')[1]
        let sourceId = event.dataTransfer.getData("song")
        sourceId = sourceId.split('-')[1]
        
        // setDraggedTo(false)
        // setIsDragging(false)
        
        // console.log(`handleDrop ${targetId}`)
        // console.log(`handleDrop ${sourceId}`)

        if (sourceId !== targetId) store.addMoveSongTransaction(sourceId, targetId)

    }

    function handleClick (event) {
        if (event.detail === 2) {
            console.log("song card " + index + " double clicked")
            store.markSongForEditing(index)
        }
    }

    function handleDelete (event) {
        event.stopPropagation()
        if (event.detail === 1) {
            store.markSongKeyForDeletion(index)
        }
    }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            draggable="true"
        >
            <div id={`song-number-${index}`} className={'song-number-text'}>
                {index + 1}.
            </div>
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="song-card-button"
                value={"\u2715"}
                onClick={handleDelete}
            />
        </div>
    );
}

export default SongCard;
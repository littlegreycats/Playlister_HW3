import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    // const [ isDragging, setIsDragging ] = useState(false)
    // const [ draggedTo, setDraggedTo ] = useState(false)

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";

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

        store.addMoveSongTransaction(sourceId, targetId)

    }

    function handleClick (event) {
        if (event.detail === 2) {
            console.log("song card " + index + " double clicked")
            store.markSongForEditing(index)
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
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;
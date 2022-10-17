import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
import EditToolbar from "./EditToolbar";
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    const id = store.history.location.pathname.split('/')[2];
    console.log("playlist id: " + id);

    if (store.currentList) {
        return (
            <div id="playlist-song-selector" className="playlist-song-selector">
                <div id="playlist-song-selector-north" className="playlist-song-selector-north">
                    <div id="playlister-song-selector-heading" className="playlister-song-selector-heading">
                        Playlist - "{ store.currentList.name }"
                    </div>
                    <EditToolbar/>
                </div>
                <div id="playlist-cards">
                <div>{
                    store.currentList.songs.map((song, index) => (
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                        />
                    ))
                }</div>
                </div>
            </div>
        )
    } else {
        return (
            <div id="playlist-cards" style={{fontSize: "36pt"}}>
            Current list is null.
            </div>
        )
    }
}

export default PlaylistCards;
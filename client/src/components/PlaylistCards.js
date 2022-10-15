import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
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
            <div id="playlist-cards">
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))
            }
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
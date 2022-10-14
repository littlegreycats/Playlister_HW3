import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
                className="list-card"
            />
        ))
    }
    return (
        <div id="playlist-selector" className="playlister-selector">
            <div id = "list-selector-list" style={{padding: "10px"}}>
                <input
                    type="button"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    className="playlister-button"
                    value="+"
                />
                <div id="playlist-selector-heading">
                    Your Playlists
                </div>
            </div>
            <div>
                {listCard}
            </div>
        </div>)
}

export default ListSelector;
import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction.js';
import EditSong_Transaction from '../transactions/EditSong_Transaction.js';
import AddSong_Transaction from '../transactions/AddSong_Transaction.js';
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction';
import api, { updatePlaylistById } /* { getPlaylistById } */ from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    DELETE_LIST: "DELETE_LIST",
    MARK_SONG_FOR_EDITING: "MARK_SONG_FOR_EDITING",
    MARK_SONG_KEY_PAIR_FOR_DELETION: 'MARK_SONG_KEY_PAIR_FOR_DELETION',
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
let tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // if the site loads a playlist's page, the current list should be set to
    // the id present in the url.


    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        listMarkedForDeletion: null,
        songMarkedForEditing: null,
        songKeyPairMarkedForDeletion: null,
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    songMarkedForEditing: store.songMarkedForEditing,
                    songKeyPairMarkedForDeletion: store.songKeyPairMarkedForDeletion,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    songMarkedForEditing: store.songMarkedForEditing,
                    songKeyPairMarkedForDeletion: store.songKeyPairMarkedForDeletion,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    songMarkedForEditing: store.songMarkedForEditing,
                    songKeyPairMarkedForDeletion: store.songKeyPairMarkedForDeletion,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    songMarkedForEditing: store.songMarkedForEditing,
                    songKeyPairMarkedForDeletion: store.songKeyPairMarkedForDeletion,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: payload,
                    songMarkedForEditing: store.songMarkedForEditing,
                    songKeyPairMarkedForDeletion: store.songKeyPairMarkedForDeletion,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    songMarkedForEditing: store.songMarkedForEditing,
                    songKeyPairMarkedForDeletion: store.songKeyPairMarkedForDeletion,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    songMarkedForEditing: store.songMarkedForEditing,
                    songKeyPairMarkedForDeletion: store.songKeyPairMarkedForDeletion,
                });
            }
            // DELETE LIST
            case GlobalStoreActionType.DELETE_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter - 1,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForEditing: store.songMarkedForEditing,
                    songKeyPairMarkedForDeletion: store.songKeyPairMarkedForDeletion,
                });
            }
            // MARK SONG FOR EDITING
            case GlobalStoreActionType.MARK_SONG_FOR_EDITING: {
                return setStore ({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    songMarkedForEditing: {
                        song: payload.song,
                        key: payload.songKey
                    },
                    songKeyPairMarkedForDeletion: store.songKeyPairMarkedForDeletion,
                })
            }
            // MARK SONG KEY FOR DELETION
            case GlobalStoreContext.MARK_SONG_KEY_PAIR_FOR_DELETION: {
                return setStore ({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    songMarkedForEditing: store.songMarkedForEditing,
                    songKeyPairMarkedForDeletion: payload,
                })
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    // console.log(playlist);
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        console.log("api.updatePlaylistById response success");
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                                store.history.push("/playlist/" + playlist._id);
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // creates new playlist with default values
    store.createNewList = function () {
        async function asyncCreateNewList () {
            console.log("create new list");
            const payload = {
                name: "New Playlist",
                songs: []
            }
            let response = await api.createPlaylist(payload);
            console.log(response.data.playlist._id);
            const id = response.data.playlist._id;
            store.setCurrentList(id);
        }
        asyncCreateNewList();
    }

    // mark list for deletion
    store.markListForDeletion = function (id) {
        async function asyncMarkListForDeletion (id) {
            console.log("mark list for deletion:");
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                const playlist = await response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: playlist,
                });
            } else {
                console.log("FAILED TO MARK LIST FOR DELETION");
            }
        }
        asyncMarkListForDeletion(id);
        store.showDeleteListModal();
    }
    
    // opens the DeleteListModal
    store.showDeleteListModal = function () {
        async function asyncShowDeleteListModal () {
            let modal = document.getElementById("delete-list-modal");
            // console.log("show delete list modal");
            // console.log(modal);
            modal.classList.add("is-visible");
        }
        asyncShowDeleteListModal();
    }

    // closes the DeleteListModal
    store.hideDeleteListModal = function () {
        async function asyncHideDeleteListModal () {
            let modal = document.getElementById("delete-list-modal");
            console.log("hide delete list modal");
            console.log(modal);
            modal.classList.remove("is-visible");
        }
        asyncHideDeleteListModal();
    }

    // deletes a list
    store.deleteList = function () {
        const id = store.listMarkedForDeletion._id;
        console.log("delete list id: " + id);
        async function asyncDeleteList (id) {
            let response = await api.deletePlaylist(id);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.DELETE_LIST,
                    payload: {},
                });
            } else {
                console.log("FAILED TO DELETE LIST");
            }
        }
        asyncDeleteList(id);
        store.hideDeleteListModal();
    }

    // set list to edit mode
    store.setIsListNameEditActive = function () {
        console.log("edit active");
    }

    // add addSong_Transaction to transaction stack
    store.addAddSongTransaction = function () {
        console.log("adding move song transaction")
        let transaction = new AddSong_Transaction(store)
        tps.addTransaction(transaction)
        console.log(tps)
    }

    // add default song to current playlist

    store.addSong = function () {
        console.log("adding song")
        let playlist = store.currentList
        const song = {
            title: "Untitled",
            artist: "Unknown",
            youTubeId: "dQw4w9WgXcQ"
        }
        playlist.songs.push(song)
        console.log(playlist)
        let response
        async function updateList(playlist) {
            response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                console.log("api.updatePlaylistById response success");
                async function getListPairs(playlist) {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_LIST,
                            payload: playlist
                        });
                    }
                }
                getListPairs(playlist);
            }
        }
        updateList(playlist);
    }

    // move two songs

    store.moveSong = function (sourceKey, targetKey) {
        console.log("moveSong(sourceKey: " + sourceKey + ", targetKey: " + targetKey + ")")
        let playlist = store.currentList
        let sourceSong = playlist.songs.splice(sourceKey, 1)[0]
        playlist.songs.splice(targetKey, 0, sourceSong)
        async function updateList(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                console.log("api.updatePlaylistById response success");
                async function getListPairs(playlist) {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_LIST,
                            payload: playlist
                        });
                    }
                }
                getListPairs(playlist);
            }
        }
        updateList(playlist);
        console.log(playlist.songs)
        console.log(tps)
    }

    store.addMoveSongTransaction = function (sourceKey, targetKey) {
        let transaction = new MoveSong_Transaction(this, sourceKey, targetKey)
        tps.addTransaction(transaction)
    }

    store.markSongForEditing = function (songKey) {
        const id = store.currentList._id
        // console.log("current list id: " + id)
        async function asyncMarkSongForEditing (songKey) {
            let response = await api.getPlaylistById(id)
            if (response.data.success) {
                console.log(`markSongForEditing(${songKey})`)
                const playlist = await response.data.playlist
                const song = await response.data.playlist.songs[songKey]
                const payload = {
                    playlist: playlist,
                    song: song,
                    songKey: songKey,
                }
                console.log(payload)
                storeReducer({
                    type: GlobalStoreActionType.MARK_SONG_FOR_EDITING,
                    payload: payload
                })
                console.log(store.songMarkedForEditing)
                store.showEditSongModal()
            } else {
                console.log("FAILED TO MARK SONG FOR EDITING")
            }
        }
        asyncMarkSongForEditing(songKey)
    }

    // show edit song modal
    store.showEditSongModal = function () {
        console.log('showEditSongModal()')
        let modal = document.getElementById("edit-song-modal")
        modal.classList.add('is-visible')
    }

    // hide edit song modal
    store.hideEditSongModal = function () {
        console.log('hideEditSongModal()')
        let modal = document.getElementById("edit-song-modal")
        modal.classList.remove('is-visible')
    }

    store.addEditSongTransaction = function (newSong) {
        let transaction = new EditSong_Transaction(store, newSong)
        tps.addTransaction(transaction)
        console.log(tps)
    }

    store.editSongMarkedForEditing = function (newSong) {
        // console.log(newSong)
        // console.log(store.songMarkedForEditing)
        // console.log(store.currentList.songs)

        // create new playlist with edited song
        let playlist = store.currentList
        // console.log(store.songMarkedForEditing)
        // console.log(store.songMarkedForEditing.key)
        playlist.songs[store.songMarkedForEditing.key] = newSong

        // update playlist
        async function updateList(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                console.log("api.updatePlaylistById response success");
                async function getListPairs(playlist) {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_LIST,
                            payload: playlist
                        });
                    }
                }
                getListPairs(playlist);
            }
        }
        updateList(playlist);
        store.hideEditSongModal()
    }

    // marks song for deletion
    store.markSongKeyForDeletion = function (songKey) {
        const id = store.currentList._id
        async function asyncMarkSongKeyForDeletion (songKey) {
            let response = await api.getPlaylistById(id)
            if (response.data.success) {
                console.log(`markSongForDeletion(${songKey})`)
                const song = response.data.playlist.songs[songKey]
                storeReducer({
                    type: GlobalStoreContext.MARK_SONG_KEY_PAIR_FOR_DELETION,
                    payload: {
                        song: song,
                        key: songKey,
                    }
                })
                console.log(store.songKeyPairMarkedForDeletion)
                store.showDeleteSongModal()
            } else {
                console.log("FAILED TO MARK SONG KEY FOR DELETION")
            }
        }
        asyncMarkSongKeyForDeletion(songKey)
    }

    // shows delete song modal
    store.showDeleteSongModal = function () {
        console.log('showDeleteSongModal()')
        let modal = document.getElementById('delete-song-modal')
        modal.classList.add('is-visible')
    }

    // hides delete song modal
    store.hideDeleteSongModal = function () {
        console.log('hideDeleteSongModal()')
        let modal = document.getElementById('delete-song-modal')
        modal.classList.remove('is-visible')
    }

    // deletes song by key
    store.deleteSongByKey = function (key) {
        let playlist = store.currentList
        playlist.songs.splice(key, 1)
        console.log(playlist)
        console.log(store.currentList)
        // update playlist
        async function updateList(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                console.log("api.updatePlaylistById response success");
                console.log(response.data.playlist)
                async function getListPairs(playlist) {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        console.log(`deleteSongByKey(${key})`)
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_LIST,
                            payload: playlist
                        });
                        store.hideDeleteSongModal()
                    }
                }
                getListPairs(playlist);
            }
        }
        updateList(playlist);
    }

    // add remove song transaction
    store.addRemoveSongTransaction = function (key) {
        let transaction = new RemoveSong_Transaction(store, key)
        tps.addTransaction(transaction)
        console.log(tps)
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}
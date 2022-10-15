import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteListModal() {
    const store = useContext(GlobalStoreContext);
    store.history = useHistory();
    let text = "";
    if (store.store.listMarkedForDeletion) {
        text = store.store.listMarkedForDeletion.name;
    }
    // console.log(text);

    function handleCancel() {
        console.log("delete list modal cancel");
        store.store.hideDeleteListModal();
    }

    function handleConfirm() {
        console.log("delete list modal confirm");
        store.store.deleteList();
    }

    return (
        <div 
            className="modal" 
            id="delete-list-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-list-root'>
                    <div className="modal-north">
                        Delete playlist?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently delete {text} playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-list-confirm-button" 
                            className="modal-button" 
                            onClick={handleConfirm}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-list-cancel-button" 
                            className="modal-button" 
                            onClick={handleCancel}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default DeleteListModal;
import { useEffect, useState } from 'react';
import axios from "axios";
import "./DeleteWarehouse.scss"
import closeIcon from "../../assets/icons/close-24px.svg";


function DeleteWarehouse({setWarehouses, selectedWarehouse, handleClassToggle, isActive }) {

    const [deleting, setDeleting] = useState(null);
    console.log(selectedWarehouse)

    function handleDeleting() {
        axios.delete(`http://localhost:8080/api/warehouses/${selectedWarehouse.id}`).then(response => {
            axios.get(`http://localhost:8080/api/warehouses`).then(response => {
                setDeleting(response.data)
                handleClassToggle();
                setWarehouses(response.data)
            })
        })
    }


    return (
        <div className={!isActive ? 'container' : 'deleting'}>
            <div className="flex-container">
                <img onClick={handleClassToggle} src={closeIcon} alt='ximg' />
                <div className="topflex">
                    <h2>Delete {selectedWarehouse.warehouse_name} warehouse?</h2>
                    <p>Please confirm that you'd like to delete the {selectedWarehouse.warehouse_name} from the list of warehouses. You won't be able to undo this action.</p>
                </div>
                <div className="flex-container__bottomflex">
                    <button id="none" onClick={() => handleClassToggle()}>Cancel</button>
                    <button id="red" onClick={() => handleDeleting()}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteWarehouse;
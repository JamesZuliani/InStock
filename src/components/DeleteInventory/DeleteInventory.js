import { useEffect, useState } from 'react';
import axios from "axios";
import "./DeleteInventory.scss"
import closeIcon from "../../assets/icons/close-24px.svg";


function DeleteInventory({ setInventory, selectedInventory, handleModel, modelActive, currentWarehouse }) {


    function handleDeleting() {
        axios.delete(`http://localhost:8080/api/inventories/${selectedInventory.id}`).then(response => {
            axios.get(`http://localhost:8080/api/inventories`).then(response => {

                // if we are in inventroty page
                if (!currentWarehouse) {
                    handleModel();
                    setInventory(response.data)
                }
                // if we are a specific item in warehouse pages

                else {
                    const filteredItems = response.data.filter((item) => {
                        return item.warehouse_name === currentWarehouse.warehouse_name;
                    });
                    handleModel();
                    setInventory(filteredItems)
                }
            })
        })
    }


    return (
        <div className={!modelActive ? 'container' : 'deleting'}>
            <div className="flex-container">
                <img onClick={handleModel} src={closeIcon} alt='ximg' />
                <div className="topflex">
                    <h2>Delete inventory item?</h2>
                    <p>Please confirm that you'd like to delete from the inventory list. You won't be able to undo this action.</p>
                </div>
                <div className="flex-container__bottomflex">
                    <button id="none" onClick={() => handleModel()}>Cancel</button>
                    <button id="red" onClick={() => handleDeleting()}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteInventory;

import "../pages/AddNewInventory.scss";
import BackButton from "../assets/icons/arrow_back-24px.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:8080";

// http://localhost:3005/inventory/new

//I think I need to first grab the form inputs and make them into an inventory object
//then I need to make a post request to api/inventories with the following in the request body
//   //{
//   "warehouse_id": "bfc9bea7-66f1-44e9-879b-4d363a888eb4",
//   "item_name": "Paper Towels",
//   "description": "Made out of military-grade synthetic materials, these paper towels are highly flammable, yet water resistant, and easy to clean.",
//   "category": "Gear",
//   "status": "Out of Stock",
//   "quantity": "0"
// }

//send the request body, wait for a successful post response from the api, then alert the user the add was
//successful and direct them to the inventory list page where they'd see their inventory?

function AddNewInventoryItem() {
  const navigate = useNavigate();

  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/api/warehouses`).then(({ data }) => {
      setWarehouses(data);
    });
  }, []);



  function publishItem(e) {
    e.preventDefault();
    const inventoryitem = {
      warehouse_id:e.target.warehouseId.value,
      item_name: e.target.itemname.value,
      description: e.target.description.value,
      category: e.target.category.value,
      status: e.target.status.value,
      quantity: e.target.quantity.value,
    };
    console.log(inventoryitem);


    const validationErrors = [];

    if (!inventoryitem.warehouseId) {
        validationErrors.push('Please enter a warehouse');
      }
      if (!inventoryitem.item_name) {
        validationErrors.push('Please enter an item name');
      }
      if (!inventoryitem.description) {
        validationErrors.push('Please enter a description');
      }
      if (!inventoryitem.category) {
        validationErrors.push('Please enter a category');
      }
    if (!inventoryitem.status) {
        validationErrors.push('Please enter a status');
      }
    if (!inventoryitem.quantity) {
        validationErrors.push('Please enter a quantity');
      }
      
      if (validationErrors.length > 0) {
        window.alert(validationErrors.join('\n'));
        return;
      }
    

    if (validationErrors.length === 0) {

    axios
      .post("http://localhost:8080/api/inventories/", inventoryitem)
      .then((res) => {
        window.alert("Your inventory item has been added to inventory");
        if (res.status === 200) {
          navigate("/inventory");
        }
      })
      .catch((e) => console.log(e.message));

    }
  }

//   const dynamicQuantity = 
//   inventoryitem.status === 'In Stock' ? "quantity" : "noquantity";

 

  return (
    <div className="add">
      <div className="add-header">
        <div className="add-header__container">
          <Link to={"/"}>
            <img
              className="add-header__backbutton"
              src={BackButton}
              alt="back button arrow"
            ></img>
          </Link>
          <div className="add-header__title">
            <h1>Add New Inventory Item</h1>
          </div>
        </div>
      </div>

      <form onSubmit={publishItem}>
        <div className="invitem">
          <div className="invitem-details">
            <h2 className="invitem-details__header">Item Details</h2>
            <div className="invitem-details__box">
              <h3 className="invitem-details__subtitle">Item Name</h3>
              <div className="invitem-details__form">
                <input
                  className="invitem-details__name"
                  type="text"
                  name="itemname"
                ></input>
                
              </div>
            </div>
            <div className="invitem-details__box">
              <h3 className="invitem-details__subtitle">Description</h3>
              <div className="invitem-details__form item-details__forml">
                <div className="invitem-details__description">
                  <input
                    className="invitem-details__name--large"
                    type="text"
                    name="description"
                  ></input>
                  
                </div>
              </div>

              <div className="invitem-details__box">
                <h3 className="invitem-details__subtitle">Category</h3>
                <div className="invitem-details__form">
                  <select
                    className="invitem-details__name"
                    name="category"
                    defaultValue=""
                  >
                    <option value="" selected>Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Gear">Gear</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Health">Health</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="invitem-details__availability">
            <h2 className="invitem-details__header">Item Availability</h2>
            <h3 className="invitem-details__subtitle">Status</h3>
            <div className="radio-buttons-container">
              <label className="radio-buttons__instock">
                <input
                  className="radio-buttons__input"
                  type="radio"
                  name="status"
                  value="In Stock"
                />
                In Stock
              </label>
              <label>
                <input
                  className="radio-buttons__input"
                  type="radio"
                  value="Out of Stock"
                  name="status"
                />
                Out of Stock
              </label>
            </div>
            {/* {inventoryitem && inventoryitem.status === "In Stock" && ()} */}
            <div > 
              <h3 className="invitem-details__subtitle">Quantity</h3>
              <div className="invitem-details__form">
                <div>
                  <input
                    className="invitem-details__name"
                    type="text"
                    name="quantity"
                  ></input>
                </div>
              </div>
            </div>
  

            <div className="invitem-details__box">
              <h3 className="invitem-details__subtitle">Warehouse</h3>
              <div className="invitem-details__form">
                <select
                  className="invitem-details__name"
                  name="warehouseId"
                
                >
                    <option value="" selected>Select a warehouse</option>
                    {warehouses.map(warehouse => {
                    return <option value={warehouse.id} key={warehouse.id}>{warehouse.warehouse_name}</option>

                    })};
                
                </select>
                
              </div>
            </div>
          </div>
        </div>
      

      <div className="item-footer">
        <Link to="/" className="item-footer__cancel">
          <h3 className="item-footer__canceltext">Cancel</h3>
        </Link>
        
          <button
            className="item--footer--addinv item-footer__add"
            type="submit"
            >
            Add Item
          </button>
        
        <div className="dropdown-button-container"></div>
      </div>
      </form>
    </div>
  );
}

export default AddNewInventoryItem;

import "../pages/EditInventory.scss";
import BackButton from "../assets/icons/arrow_back-24px.svg";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

// http://localhost:3000/inventory/226fd4a6-863c-459d-b69c-007262a64015/edit?

function EditInventory() {
  const { id } = useParams();
  const [InventoryDetails, setInventoryDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [allWarehouses, setAllWarehouses] = useState(null);
  const [warehouseName, setwarehouseName] = useState(null);
  console.log(selectedWarehouse);

  const categories = [
    "Accessories",
    "Gear",
    "Electronics",
    "Health",
    "Apparel",
  ];

  useEffect(() => {
    axios.get(`http://localhost:8080/api/inventories/${id}`).then((res) => {
      setInventoryDetails(res.data);
      setSelectedOption(res.data.status);
      setSelectedCategory(res.data.category);

      console.log("data!!", res.data);
      setSelectedWarehouse(res.data.warehouse_id);
      axios.get(`http://localhost:8080/api/warehouses`).then((res) => {
        setAllWarehouses(res.data);
      });
    });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleWarehouseChange = (event) => {
    setSelectedWarehouse(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const itemName = event.target.itemName.value;
    const description = event.target.description.value;
    const category = selectedCategory;
    const status = selectedOption;
    const quantity = event.target.quantity.value;
    const warehouseId = selectedWarehouse;
    console.log(warehouseId);
    axios
      .put(`http://localhost:8080/api/inventories/${id}`, {
        item_name: itemName,
        description: description,
        category: category,
        status: status,
        quantity: quantity,
        warehouse_id: warehouseId,
        jon: 123,
      })
      .then((res) => {})
      .catch((error) => {});
  };

  if (!InventoryDetails && !selectedOption) {
    return <div></div>;
  }

  return (
    <div className="edit">
      <div className="edit-header">
        <div className="edit-header__container">
          <Link to={"/"}>
            <img
              className="edit-header__backbutton"
              src={BackButton}
              alt="back button arrow"
            ></img>
          </Link>
          <div className="edit-header__title">
            <h1>Edit Inventory Item</h1>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="item">
          <div className="item-details">
            <h2 className="item-details__header">Item Details</h2>
            <div className="item-details__box">
              <h3 className="item-details__subtitle">Item Name</h3>
              <div className="item-details__form">
                <input
                  name="itemName"
                  className="item-details__name"
                  type="text"
                  defaultValue={InventoryDetails.item_name}
                ></input>
              </div>
            </div>
            <div className="item-details__box">
              <h3 className="item-details__subtitle">Description</h3>
              <div className="item-details__form item-details__forml">
                <div className="item-details__description">
                  <input
                    name="description"
                    className="item-details__name--large"
                    type="text"
                    defaultValue={InventoryDetails.description}
                  ></input>
                </div>
              </div>

              <div className="item-details__box">
                <h3 className="item-details__subtitle">Category</h3>
                <div className="item-details__form">
                  <select
                    name="category"
                    className="item-details__name"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => {
                      return (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="item-details__availability">
            <h2 className="item-details__header">Item Availability</h2>
            <h3 className="item-details__subtitle">Status</h3>
            <div className="radio-buttons-container">
              <label className="radio-buttons__instock">
                <input
                  name="status"
                  className="radio-buttons__input"
                  type="radio"
                  value="In Stock"
                  checked={selectedOption === "In Stock" ? true : false}
                  onChange={handleOptionChange}
                />
                In Stock
              </label>
              <label>
                <input
                  name="status"
                  className="radio-buttons__input"
                  type="radio"
                  value="Out of Stock"
                  checked={selectedOption === "Out of Stock" ? true : false}
                  onChange={handleOptionChange}
                />
                Out of Stock
              </label>
            </div>

            {selectedOption === "In Stock" && (
              <div className="item-details__quantity">
                <h3 className="item-details__subtitle">Quantity</h3>
                <div className="item-details__form">
                  <input
                    name="quantity"
                    className="item-details__name"
                    type="text"
                    defaultValue={InventoryDetails.quantity}
                  ></input>
                </div>
              </div>
            )}

            <div className="item-details__box">
              <h3 className="item-details__subtitle">Warehouse</h3>
              <div className="item-details__form">
                <select
                  name="warehouseName"
                  className="item-details__name"
                  value={selectedWarehouse}
                  onChange={handleWarehouseChange}
                >
                  {allWarehouses &&
                    allWarehouses.map((warehouse) => {
                      return (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.warehouse_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="item-footer">
          <Link to="/inventory" className="item-footer__cancel">
            <h3 className="item-footer__canceltext">Cancel</h3>
          </Link>
          <button type="submit" className="item-footer__save">
            <h3 className="item--footer--savetext">Save</h3>
          </button>
          <div className="dropdown-button-container"></div>
        </div>
      </form>
    </div>
  );
}

export default EditInventory;

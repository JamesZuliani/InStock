import WarehouseList from "../../components/WarehouseList/WarehouseList";
import "./Warehouse.scss";
import search from "../../assets/icons/search-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import { Link } from "react-router-dom";
import DeleteWarehouse from "../../components/DeleteWarehouse/DeleteWarehouse";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:8080";

function Warehouse() {

  const [selectedWarehouse, setSelectedWarehouse] = useState();

  const [isActive, setIsActive] = useState(false);

  function handleClassToggle(warehouse) {
    setIsActive(!isActive);
    const body = document.querySelector('body');
    body.classList.toggle('modal-open');
    setSelectedWarehouse(warehouse);
}

const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/api/warehouses`).then(({ data }) => {
      setWarehouses(data);
    });
  }, []);

  return (
    <div className="warehouse-list-page">
      <div className="warehouse-list-page__header">
        <h1 className="heading">Warehouses</h1>
        <div className="buttons">
          <div className="search-bar">
            <form>
              <input
                className="search-bar__input"
                type="text"
                placeholder="Search..."
              ></input>
            </form>
            <img
              className="search-bar__icon"
              src={search}
              alt="search-Icon"
            ></img>
          </div>
          <Link to="/warehouse/new" className="warehouse-list-page__add-button">
            + Add New Warehouse
          </Link>
        </div>
      </div>
      <div className="fullscreen-labels">
        <div className="warehouse-label label--fullscreen">
          <p className="warehouse-label__text">WAREHOUSE</p>
          <img
            className="warehouse-label__icon sort-icon"
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <div className="address-label label--fullscreen">
          <p className="address-label__text">ADDRESS</p>
          <img
            className="address-label__icon sort-icon"
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <div className="contact-name-label label--fullscreen">
          <p className="contact-name-label__text">CONTACT NAME</p>
          <img
            className="contact-name-label__icon sort-icon"
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <div className="contact-info-label label--fullscreen">
          <p className="contact-info-label__text">CONTACT INFORMATION</p>
          <img
            className="contact-info-label__icon sort-icon"
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <p className="actions-info-label label--fullscreen">ACTIONS</p>
      </div>
      <WarehouseList warehouses={warehouses} handleClassToggle={handleClassToggle} />
      {selectedWarehouse&&<DeleteWarehouse setWarehouses={setWarehouses} selectedWarehouse={selectedWarehouse} handleClassToggle={handleClassToggle} isActive={!isActive}/>}
    </div>
  );
}

export default Warehouse;

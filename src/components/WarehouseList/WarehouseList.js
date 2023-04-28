import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import vectorIcon from "../../assets/icons/chevron_right-24px.svg";
import "./WarehouseList.scss";

const baseUrl = "http://localhost:8080";

export default function WarehouseList() {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/api/warehouses`).then(({ data }) => {
      setWarehouses(data);
    });
  }, []);

  return warehouses.map((warehouse, index) => {
    return (
      <Link
        to={`/warehouse/details/${warehouse.id}`}
        key={warehouse.id}
        className="warehouse-link"
      >
        {/* mobile view  */}
        <div className="warehouse">
          <div className="warehouse-wrapper">
            <div className="location-container">
              <div className="warehouse-container">
                <h5 className="warehouse-container__label label">WAREHOUSE</h5>
                <div className="warehouse-link__name">
                  <p className="warehouse-container__title">
                    {warehouse.warehouse_name}
                  </p>
                  <img src={vectorIcon} alt="vector-icon"></img>
                </div>
              </div>
              <div className="address-container">
                <h5 className="address-container__label label">ADDRESS</h5>
                <p className="address-container__title">
                  {warehouse.address}, {warehouse.city}, {warehouse.country}
                </p>
              </div>
            </div>
            <div className="contacting-container">
              <div className="name-container">
                <h5 className="name-container__label label">CONTACT NAME</h5>
                <p className="name-container__title">
                  {warehouse.contact_name}
                </p>
              </div>
              <div className="information-container">
                <h5 className="information-container__label label">
                  CONTACT INFORMATION
                </h5>
                <p className="information-container__phone">
                  {warehouse.contact_phone}
                </p>
                <p className="information-container__email">
                  {warehouse.contact_email}
                </p>
              </div>
            </div>
          </div>
          <div className="button-container">
            <img
              className="action-icon"
              src={deleteIcon}
              alt="delete-icon"
            ></img>
            <img className="action-icon" src={editIcon} alt="edit-icon"></img>
          </div>
        </div>

        {/* this section of html is not rendered until tablet and desktop breakpoint */}
        <div
          className={
            index !== warehouses.length - 1
              ? "warehouse warehouse--fullscreen warehouse--border"
              : "warehouse warehouse--fullscreen"
          }
        >
          <div className="warehouse-link__name">
            <p className="warehouse-container__title">
              {warehouse.warehouse_name}
            </p>
            <img
              src={vectorIcon}
              alt="vector-icon"
              className="vector-icon"
            ></img>
          </div>
          <div className="address-container">
            <h5 className="address-container__label label">ADDRESS</h5>
            <p className="address-container__title">
              {warehouse.address}, {warehouse.city}, {warehouse.country}
            </p>
          </div>
          <div className="name-container">
            <h5 className="name-container__label label">CONTACT NAME</h5>
            <p className="name-container__title">{warehouse.contact_name}</p>
          </div>
          <div className="contact-container">
            <h5 className="contact-container__label label">
              CONTACT INFORMATION
            </h5>
            <p className="contact-container__phone">
              {warehouse.contact_phone}
            </p>
            <p className="contact-container__email">
              {warehouse.contact_email}
            </p>
          </div>
          <div className="button-container">
            <img
              className="action-icon"
              src={deleteIcon}
              alt="delete-icon"
            ></img>
            <img className="action-icon" src={editIcon} alt="edit-icon"></img>
          </div>
        </div>
      </Link>
    );
  });
}

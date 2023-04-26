import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import vectorIcon from "../../assets/icons/chevron_right-24px.svg";
import "./WarehouseList.scss";

export default function WarehouseList() {
  const [warehouses, setWarehouses] = useState([
    {
      id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      warehouse_name: "Manhattan",
      address: "503 Broadway",
      city: "New York",
      country: "USA",
      contact_name: "Parmin Aujla",
      contact_position: "Warehouse Manager",
      contact_phone: "+1 (646) 123-1234",
      contact_email: "paujla@instock.com",
    },
    {
      id: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",
      warehouse_name: "Washington",
      address: "33 Pearl Street SW",
      city: "Washington",
      country: "USA",
      contact_name: "Greame Lyon",
      contact_position: "Warehouse Manager",
      contact_phone: "+1 (646) 123-1234",
      contact_email: "glyon@instock.com",
    },
    {
      id: "90ac3319-70d1-4a51-b91d-ba6c2464408c",
      warehouse_name: "Jersey",
      address: "300 Main Street",
      city: "New Jersey",
      country: "USA",
      contact_name: "Brad MacDonald",
      contact_position: "Warehouse Manager",
      contact_phone: "+1 (646) 123-1234",
      contact_email: "bmcdonald@instock.com",
    },
    {
      id: "bfc9bea7-66f1-44e9-879b-4d363a888eb4",
      warehouse_name: "SF",
      address: "890 Brannnan Street",
      city: "San Francisco",
      country: "USA",
      contact_name: "Gary Wong",
      contact_position: "Warehouse Manager",
      contact_phone: "+1 (646) 123-1234",
      contact_email: "gwong@instock.com",
    },
    {
      id: "89898957-04ba-4bd0-9f5c-a7aea7447963",
      warehouse_name: "Santa Monica",
      address: "520 Broadway",
      city: "Santa Monica",
      country: "USA",
      contact_name: "Sharon Ng",
      contact_position: "Warehouse Manager",
      contact_phone: "+1 (646) 123-1234",
      contact_email: "sng@instock.com",
    },
    {
      id: "ade0a47b-cee6-4693-b4cd-a7e6cb25f4b7",
      warehouse_name: "Seattle",
      address: "1201 Third Avenue",
      city: "Seattle",
      country: "USA",
      contact_name: "Daniel Bachu",
      contact_position: "Warehouse Manager",
      contact_phone: "+1 (646) 123-1234",
      contact_email: "dbachu@instock.com",
    },
    {
      id: "bb1491eb-30e6-4728-a5fa-72f89feaf622",
      warehouse_name: "Miami",
      address: "2650 NW 5th Avenue",
      city: "Miami",
      country: "USA",
      contact_name: "Alana Thomas",
      contact_position: "Warehouse Manager",
      contact_phone: "+1 (646) 123-1234",
      contact_email: "athomas@instock.com",
    },
    {
      id: "150a36cf-f38e-4f59-8e31-39974207372d",
      warehouse_name: "Boston",
      address: "215 Essex Street",
      city: "Boston",
      country: "USA",
      contact_name: "Vanessa Mendoza",
      contact_position: "Warehouse Manager",
      contact_phone: "+1 (646) 123-1234",
      contact_email: "vmendoza@instock.com",
    },
  ]);
  return warehouses.map((warehouse) => {
    return (
      <>
        <Link to={"/#"} key={warehouse.id} className="warehouse-link">
          <div className="warehouse">
            <div className="warehouse-wrapper">
              <div className="location-container">
                <div className="warehouse-container">
                  <h5 className="warehouse-container__label label">
                    WAREHOUSE
                  </h5>
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
              <div className="contact-container">
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
              <img className="action-icon" src={deleteIcon} alt="delete-icon"></img>
              <img className="action-icon" src={editIcon} alt="edit-icon"></img>
            </div>
          </div>
        </Link>
      </>
    );
  });
}

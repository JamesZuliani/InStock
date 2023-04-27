import "../pages/WarehouseDetails.scss";
import BackButton from "../assets/icons/arrow_back-24px.svg";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function WarehouseDetails() {
  const { id } = useParams();
  const [warehouseDetails, setwarehouseDetails] = useState([]);

  useEffect(() => {
    const fetchsingleWarehouse = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/warehouses/${id}`
      );
      setwarehouseDetails(data);
      console.log(data);
    };
    fetchsingleWarehouse();
  });

  return (
    <div className="details">
      <div className="details__title--container">
        <div className="details__container--1">
          <Link to={"/"}>
            <img
              className="details__back-button"
              src={BackButton}
              alt="back button arrow"
            ></img>
          </Link>
          <div className="details__title">
            <h1>{warehouseDetails.warehouse_name || "-"}</h1>
          </div>
        </div>
        <Link to={`/warehouse/${id}/edit`} className="details__button--edit">
          <h3 className="details__button--text">Edit</h3>
        </Link>
      </div>

      <div className="details__section">
        <div className="details__address--container">
          <h3 className="details__subtitle">WAREHOUSE ADDRESS:</h3>
          <p>
            {warehouseDetails.address ? `${warehouseDetails.address}, ` : "-, "}
            {warehouseDetails.city ? `${warehouseDetails.city}, ` : "-, "}
            {warehouseDetails.country ? `${warehouseDetails.country}` : "-"}
          </p>
        </div>
        <div className="details__subtitle--container">
          <div>
            <h3 className="details__subtitle">CONTACT NAME:</h3>
            <p>{warehouseDetails.contact_name ? `${warehouseDetails.contact_name}` : "- "}</p>
            <p>{warehouseDetails.contact_position ? `${warehouseDetails.contact_position}` : "-"}</p>
          </div>
          <div className="details__contact--container">
            <h3 className="details__subtitle">CONTACT INFORMATION:</h3>
            <p>{warehouseDetails.contact_phone ? `${warehouseDetails.contact_phone}` : "- "}</p>
            <p>{warehouseDetails.contact_email ? `${warehouseDetails.contact_email}` : "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehouseDetails;

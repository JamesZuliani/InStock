import "./InventoryDetails.scss";
import BackButton from "../assets/icons/arrow_back-24px.svg";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function InventoryDetails() {
  const { id } = useParams();

  const [inventoryDetails, setinventoryDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchsingleInventory = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/inventories/${id}`
      );
      setinventoryDetails(data);
      console.log(data);
    };
    fetchsingleInventory();
  }, [id]);

  const dynamicTextColor =
    inventoryDetails.quantity > 0 ? "in-stock" : "out-of-stock";

  return (
    <div className="inv-details">
      <div className="inv-details__title--container">
        <div className="inv-details__container--1">
          <img
            onClick={() => navigate(-1)}
            className="inv-details__back-button"
            src={BackButton}
            alt="back button arrow"
          ></img>
          <div className="inv-details__title">
            <h1>{inventoryDetails.item_name || "-"}</h1>
          </div>
        </div>
        <Link to={`/inventory/${id}/edit`} className="inv-details__button--edit">
          <h3 className="inv-details__button--text">Edit</h3>
        </Link>
      </div>

      <div className="inv-details__section">
        <div className="inv-details__leftside--container">
          <h3 className="inv-details__subtitle">ITEM DESCRIPTION:</h3>
          <p className="inv-details__body">{inventoryDetails.description}</p>
          <h3 className="inv-details__subtitle">CATEGORY</h3>
          <p className="inv-details__body">{inventoryDetails.category}</p>
        </div>
        <div className="inv-details__subtitle--container">
          <div className="inv-details__rowcontainer">
            <div>
              <h3 className="inv-details__subtitle">STATUS:</h3>
              <h4 className={`inv-details__stock ${dynamicTextColor}`}>
                {inventoryDetails.status}
              </h4>
            </div>
            <div>
              <h3 className="inv-details__subtitle">QUANTITY:</h3>
              <p className="inv-details__body">{inventoryDetails.quantity}</p>
            </div>
          </div>
          <div className="inv-details__warehouse--container">
            <h3 className="inv-details__subtitle">WAREHOUSE:</h3>
            <p className="inv-details__body">{inventoryDetails.warehouse_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
// };

export default InventoryDetails;

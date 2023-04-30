import "./WarehouseDetails.scss";
import BackButton from "../../assets/icons/arrow_back-24px.svg";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import vectorIcon from "../../assets/icons/chevron_right-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import Loader from "react-spinners/GridLoader";
import DeleteInventory from "../../components/DeleteInventory/DeleteInventory";

function WarehouseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  // sort
  let sorted;
  // other state variables
  // const [warehouseDetails, setwarehouseDetails] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [currentWarehouse, setCurrentWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);
  // sort state variables
  const [sortToggle, setSortToggle] = useState({
    item_name: "asc",
    category: "asc",
    status: "asc",
    quantity: "asc",
  });

  //deleting inventory item starts here
  const [modelActive, setModelActive] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState();

  function handleModel(inventory) {
    setModelActive(!modelActive);
    const body = document.querySelector("body");
    body.classList.toggle("modal-on");
    setSelectedInventory(inventory);
  }

  //delete inventory ends here

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/warehouses/${id}`)
      .then((res) => {
        setCurrentWarehouse(res.data);
        return res.data;
      })
      .then((warehouse) => {
        axios.get(`http://localhost:8080/api/inventories`).then((res) => {
          console.log(warehouse);
          const filteredItems = res.data.filter((item) => {
            return item.warehouse_name === warehouse.warehouse_name;
          });

          setInventory(filteredItems);
          // setwarehouseDetails(currentWarehouse);
          setLoading(false);
        });
      });
  }, [id]);

  if (loading || !currentWarehouse || !inventory) {
    return (
      <div className="details__loading-container">
        <Loader
          color="#2e66e5"
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  // since there was no specific endpoint for this on backEnd,
  // we did the logic here.
  const toggleSortOrder = (key) => {
    setSortToggle({
      ...sortToggle,
      [key]: sortToggle[key] === "asc" ? "desc" : "asc",
    });
  };
  const sortItems = (key) => {
    if (key !== "quantity") {
      sorted = inventory.sort((a, b) =>
        sortToggle[key] === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key])
      );
      setInventory(sorted);
    } else {
      sorted = inventory.sort((a, b) =>
        sortToggle[key] === "asc" ? a[key] - b[key] : b[key] - a[key]
      );
      setInventory(sorted);
    }
    toggleSortOrder(key);
  };

  return (
    <>
      <section className="details">
        <div className="details__title-container">
          <div className="details__container">
            <img
              onClick={() => navigate(-1)}
              className="details__back-button"
              src={BackButton}
              alt="back button arrow"
            ></img>

            <div className="details__title">
              <h1>{currentWarehouse.warehouse_name}</h1>
            </div>
          </div>
          <Link to={`/warehouse/${id}/edit`} className="details__button-edit">
            <h3 className="details__button-text">Edit</h3>
          </Link>
        </div>

        <div className="details__section">
          <div className="details__address-container">
            <h3 className="details__subtitle">WAREHOUSE ADDRESS:</h3>
            <p className="details__subtitle-text">
              {`${currentWarehouse.address}, `}
              {`${currentWarehouse.city}, `}
              {currentWarehouse.country}
            </p>
          </div>
          <div className="details__subtitle-container">
            <div>
              <h3 className="details__subtitle">CONTACT NAME:</h3>
              <p>
                {currentWarehouse.contact_name
                  ? `${currentWarehouse.contact_name}`
                  : "- "}
              </p>
              <p>
                {currentWarehouse.contact_position
                  ? `${currentWarehouse.contact_position}`
                  : "-"}
              </p>
            </div>
            <div>
              <h3 className="details__subtitle">CONTACT INFORMATION:</h3>
              <p>
                {currentWarehouse.contact_phone
                  ? `${currentWarehouse.contact_phone}`
                  : "- "}
              </p>
              <p>
                {currentWarehouse.contact_email
                  ? `${currentWarehouse.contact_email}`
                  : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="fullscreen-labels-inv">
          <div className="inventory-label label--fullscreen">
            <p
              className="inventory-label__text"
              onClick={() => {
                sortItems("category");
                toggleSortOrder("category");
              }}
            >
              {" "}
              INVENTORY ITEM
            </p>

            <img
              className="warehouse-label__icon sort-icon"
              onClick={() => {
                sortItems("item_name");
                toggleSortOrder("item_name");
              }}
              src={sort}
              alt="sort-icon"
            ></img>
          </div>
          <div className="category-label label--fullscreen">
            <p
              className="category-label__text"
              onClick={() => {
                sortItems("category");
                toggleSortOrder("category");
              }}
            >
              CATEGORY
            </p>

            <img
              className="category-label__icon sort-icon"
              onClick={() => {
                sortItems("category");
                toggleSortOrder("category");
              }}
              src={sort}
              alt="sort-icon"
            ></img>
          </div>
          <div className="status-label label--fullscreen">
            <p
              className="status-label__text"
              onClick={() => {
                sortItems("status");
                toggleSortOrder("status");
              }}
            >
              STATUS
            </p>
            <img
              className="status-label__icon sort-icon"
              onClick={() => {
                sortItems("status");
                toggleSortOrder("status");
              }}
              src={sort}
              alt="sort-icon"
            ></img>
          </div>
          <div className="quantity-label label--fullscreen">
            <p
              className="quantity-label__text"
              onClick={() => {
                sortItems("quantity");
                toggleSortOrder("quantity");
              }}
            >
              QTY
            </p>
            <img
              className="quantity-label__icon sort-icon"
              onClick={() => {
                sortItems("quantity");
                toggleSortOrder("quantity");
              }}
              src={sort}
              alt="sort-icon"
            ></img>
          </div>
          <p className="actions-info-label label--fullscreen">ACTIONS</p>
        </div>
        <section>
          {/* if no item was in the warehouse: */}
          {inventory.length === 0 ? (
            <h3 className="details__no-item">No item is available...</h3>
          ) : null}
          {/* if we had items: */}
          {inventory &&
            inventory.map((item, index) => {
              return (
                <Link
                  to={`/inventory/details/${item.id}`}
                  key={item.id}
                  className="item-link"
                >
                  <div className="item">
                    <div className="item-wrapper">
                      <div className="item-name-container">
                        <div className="name-container">
                          <h5 className="name-container__label label">
                            INVENTORY ITEM
                          </h5>
                          <div className="item-link__name">
                            <p className="name-container__title-inv">
                              {item.item_name}
                            </p>
                            <img src={vectorIcon} alt="vector-icon"></img>
                          </div>
                        </div>
                        <div className="category-container">
                          <h5 className="category-container__label label">
                            CATEGORY
                          </h5>
                          <p className="category-container__title">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      <div className="information-container">
                        <div className="status-container">
                          <h5 className="status-container__label label">
                            STATUS
                          </h5>
                          <p
                            className={
                              "status-container__title" &&
                              item.status === "In Stock"
                                ? "status-container__title--instock"
                                : "status-container__title--outstock"
                            }
                          >
                            {item.status.toUpperCase()}
                          </p>
                        </div>
                        <div className="quantity-container">
                          <h5 className="quantity-container__label label">
                            QTY
                          </h5>
                          <p className="quantity-container__amount">
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="button-container">
                      <img
                        onClick={(e) => {
                          e.preventDefault();
                          handleModel(item.id);
                          setSelectedInventory(item);
                        }}
                        className="action-icon"
                        src={deleteIcon}
                        alt="delete-icon"
                      ></img>
                      <img
                        className="action-icon"
                        src={editIcon}
                        alt="edit-icon"
                      ></img>
                    </div>
                  </div>
                  {/* this section of html is not rendered until tablet and desktop breakpoint */}
                  <div
                    className={
                      index !== item.length - 1
                        ? "item item--fullscreen item--border"
                        : "item item--fullscreen"
                    }
                  >
                    <div className="item-link__name">
                      <p className="name-container__title-inv">
                        {item.item_name}
                      </p>
                      <img
                        src={vectorIcon}
                        alt="vector-icon"
                        className="vector-icon"
                      ></img>
                    </div>
                    <div className="category-container">
                      <h5 className="category-container__label label">
                        CATEGORY
                      </h5>
                      <p className="category-container__title">
                        {item.category}
                      </p>
                    </div>
                    <div className="status-container">
                      <h5 className="status-container__label label">STATUS</h5>
                      <p
                        className={
                          "status-container__title" &&
                          item.status === "In Stock"
                            ? "status-container__title--instock"
                            : "status-container__title--outstock"
                        }
                      >
                        {item.status.toUpperCase()}
                      </p>
                    </div>
                    <div className="quantity-container">
                      <h5 className="quantity-container__label label">QTY</h5>
                      <p className="information-container__amount">
                        {item.quantity}
                      </p>
                    </div>

                    <div className="button-container">
                      <img
                        onClick={(e) => {
                          e.preventDefault();
                          handleModel(item.id);
                          setSelectedInventory(item);
                        }}
                        className="action-icon"
                        src={deleteIcon}
                        alt="delete-icon"
                      ></img>
                      <img
                        className="action-icon"
                        src={editIcon}
                        alt="edit-icon"
                      ></img>
                    </div>
                  </div>
                </Link>
              );
            })}
        </section>
      </section>
      <DeleteInventory
        setInventory={setInventory}
        selectedInventory={selectedInventory}
        handleModel={handleModel}
        modelActive={!modelActive}
        currentWarehouse={currentWarehouse}
      />
    </>
  );
}

export default WarehouseDetails;

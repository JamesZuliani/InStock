import WarehouseList from "../../components/WarehouseList/WarehouseList";
import "./Warehouse.scss";
import search from "../../assets/icons/search-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import { Link } from "react-router-dom";
import DeleteWarehouse from "../../components/DeleteWarehouse/DeleteWarehouse";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-spinners/GridLoader";

const baseUrl = "http://localhost:8080";

function Warehouse() {
  const [selectedWarehouse, setSelectedWarehouse] = useState();
  const [loading, setLoading] = useState(true);
  const [sortToggle, setSortToggle] = useState({
    warehouse: "asc",
    address: "asc",
    contact_name: "asc",
    contact_info: "asc",
  });

  const [isActive, setIsActive] = useState(false);
  const toggleSortOrder = (key) => {
    setSortToggle({
      ...sortToggle,
      [key]: sortToggle[key] === "asc" ? "desc" : "asc",
    });
  };
  const [warehouses, setWarehouses] = useState([]);

  function handleClassToggle(warehouse) {
    setIsActive(!isActive);
    const body = document.querySelector("body");
    body.classList.toggle("modal-open");
    setSelectedWarehouse(warehouse);
  }

  useEffect(() => {
    axios.get(`${baseUrl}/api/warehouses`).then(({ data }) => {
      setWarehouses(data);
      setLoading(false)
    });
  }, []);

  if (loading) {
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
          <p
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=warehouse_name&order_by=${sortToggle.warehouse}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("warehouse");
                    })
                : axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=warehouse_name&order_by=${sortToggle.warehouse}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("warehouse");
                    });
            }}
            className="warehouse-label__text"
          >
            WAREHOUSE
          </p>

          <img
            className="warehouse-label__icon sort-icon"
            src={sort}
            alt="sort-icon"
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=warehouse_name&order_by=${sortToggle.warehouse}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("warehouse");
                    })
                : axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=warehouse_name&order_by=${sortToggle.warehouse}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("warehouse");
                    });
            }}
          ></img>
        </div>
        <div className="address-label label--fullscreen">
          <p
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=address&order_by=${sortToggle.address}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("address");
                    })
                : axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=address&order_by=${sortToggle.address}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("address");
                    });
            }}
            className="address-label__text"
          >
            ADDRESS
          </p>

          <img
            className="address-label__icon sort-icon"
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=address&order_by=${sortToggle.address}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("address");
                    })
                : axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=address&order_by=${sortToggle.address}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("address");
                    });
            }}
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <div className="contact-name-label label--fullscreen">
          <p
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=contact_name&order_by=${sortToggle.contact_name}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("contact_name");
                    })
                : axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=contact_name&order_by=${sortToggle.contact_name}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("contact_name");
                    });
            }}
            className="contact-name-label__text"
          >
            CONTACT NAME
          </p>

          <img
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=contact_name&order_by=${sortToggle.contact_name}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("contact_name");
                    })
                : axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=contact_name&order_by=${sortToggle.contact_name}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("contact_name");
                    });
            }}
            className="contact-name-label__icon sort-icon"
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <div className="contact-info-label label--fullscreen">
          <p onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=contact_email&order_by=${sortToggle.contact_info}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("contact_info");
                    })
                : axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=contact_email&order_by=${sortToggle.contact_info}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("contact_info");
                    });
            }}className="contact-info-label__text">CONTACT INFORMATION</p>

          <img
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=contact_email&order_by=${sortToggle.contact_info}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("contact_info");
                    })
                : axios
                    .get(
                      `${baseUrl}/api/warehouses?sort_by=contact_email&order_by=${sortToggle.contact_info}`
                    )
                    .then((res) => {
                      setWarehouses(res.data);
                      toggleSortOrder("contact_info");
                    });
            }}
            className="contact-info-label__icon sort-icon"
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <p className="actions-info-label label--fullscreen">ACTIONS</p>
      </div>
      <WarehouseList
        warehouses={warehouses}
        handleClassToggle={handleClassToggle}
      />
      {selectedWarehouse && (
        <DeleteWarehouse
          setWarehouses={setWarehouses}
          selectedWarehouse={selectedWarehouse}
          handleClassToggle={handleClassToggle}
          isActive={!isActive}
        />
      )}
    </div>
  );
}

export default Warehouse;

import InventoryList from "../../components/InventoryList/InventoryList";
import "./Inventory.scss";
import search from "../../assets/icons/search-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteInventory from "../../components/DeleteInventory/DeleteInventory";
import Loader from "react-spinners/GridLoader";

export default function Inventory() {
  const navigate = useNavigate()
  const baseUrl = "http://localhost:8080";
  const [modelActive, setModelActive] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);

  const [sortToggle, setSortToggle] = useState({
    inventory_item: "asc",
    category: "asc",
    status: "asc",
    quantity: "asc",
    warehouse: "asc",
  });
  
  useEffect(() => {
    axios.get(`${baseUrl}/api/inventories`).then(({ data }) => {
      setInventory(data);
      setLoading(false)
    });
  }, []);


  const toggleSortOrder = (key) => {
    setSortToggle({
      ...sortToggle,
      [key]: sortToggle[key] === "asc" ? "desc" : "asc",
    });
  };

  //delete inventory starts here
  function handleModel(inventory) {
    setModelActive(!modelActive);
    const body = document.querySelector("body");
    body.classList.toggle("modal-on");
    setSelectedInventory(inventory);
  }
  //delete inventory ends here
  if (loading || !inventory) {
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
    <div className="inventory-list-page">
      <div className="inventory-list-page__header">
        <h1 className="heading">Inventory</h1>
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
          <Link to="/inventory/new" className="inventory-list-page__add-button">
            + Add New Item
          </Link>
        </div>
      </div>
      <div className="fullscreen-labels-inv">
        <div className="inventory-label label-inv--fullscreen">
          <p
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=item_name&order_by=${sortToggle.inventory_item}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("inventory_item");
                  })
                : axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=item_name&order_by=${sortToggle.inventory_item}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("inventory_item");
                  });
            }}
            className="inventory-label__text"
          >
            {" "}
            INVENTORY ITEM
          </p>
          <img
            className="warehouse-label__icon sort-icon"
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=item_name&order_by=${sortToggle.inventory_item}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("inventory_item");
                  })
                : axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=item_name&order_by=${sortToggle.inventory_item}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("inventory_item");
                  });
            }}
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <div className="category-label label-inv--fullscreen">
          <p
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=category&order_by=${sortToggle.category}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("category");
                  })
                : axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=category&order_by=${sortToggle.category}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("category");
                  });
            }}
            className="category-label__text"
          >
            CATEGORY
          </p>
          <img
            className="category-label__icon sort-icon"
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=category&order_by=${sortToggle.category}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("category");
                  })
                : axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=category&order_by=${sortToggle.category}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("category");
                  });
            }}
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <div className="status-label label-inv--fullscreen">
          <p
            className="status-label__text"
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=status&order_by=${sortToggle.status}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("status");
                  })
                : axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=status&order_by=${sortToggle.status}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("status");
                  });
            }}
          >
            STATUS
          </p>
          <img
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=status&order_by=${sortToggle.status}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("status");
                  })
                : axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=status&order_by=${sortToggle.status}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("status");
                  });
            }}
            className="status-label__icon sort-icon"
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <div className="quantity-label label-inv--fullscreen">
          <p
            className="quantity-label__text"
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=quantity&order_by=${sortToggle.quantity}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("quantity");
                  })
                : axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=quantity&order_by=${sortToggle.quantity}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("quantity");
                  });
            }}
          >
            QUANTITY
          </p>
          <img
            className="quantity-label__icon sort-icon"
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=quantity&order_by=${sortToggle.quantity}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("quantity");
                  })
                : axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=quantity&order_by=${sortToggle.quantity}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("quantity");
                  });
            }}
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <div className="location-label label-inv--fullscreen">
          <p
            className="location-label__text"
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=warehouse_name&order_by=${sortToggle.warehouse_name}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("warehouse_name");
                  })
                : axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=warehouse_name&order_by=${sortToggle.warehouse_name}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("warehouse_name");
                  });
            }}
          >
            WAREHOUSE
          </p>
          <img
            className="location-label__icon sort-icon"
            onClick={() => {
              toggleSortOrder === "asc"
                ? axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=warehouse_name&order_by=${sortToggle.warehouse_name}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("warehouse_name");
                  })
                : axios
                  .get(
                    `${baseUrl}/api/inventories?sort_by=warehouse_name&order_by=${sortToggle.warehouse_name}`
                  )
                  .then((res) => {
                    setInventory(res.data);
                    toggleSortOrder("warehouse_name");
                  });
            }}
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <p className="actions-info-label-inv label-inv--fullscreen">ACTIONS</p>
      </div>
      <InventoryList inventory={inventory} handleModel={handleModel} />
      <DeleteInventory
        setInventory={setInventory}
        selectedInventory={selectedInventory}
        handleModel={handleModel}
        modelActive={!modelActive} />
    </div >
  );
}

import InventoryList from "../../components/InventoryList/InventoryList"
import "./Inventory.scss"
import search from "../../assets/icons/search-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";

export default function Inventory() {
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
          <div className="add-inventory">
            <p className="add-inventory__text"> + Add New Item</p>
          </div>
        </div>
      </div>
      <div className="fullscreen-labels">
        <div className="inventory-label label--fullscreen">
            <p className="inventory-label__text"> INVENTORY ITEM</p>
            <img
            className="warehouse-label__icon sort-icon"
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <div className="category-label label--fullscreen">
          <p className="category-label__text">CATEGORY</p>
          <img className="category-label__icon sort-icon" src={sort} alt="sort-icon"></img>
        </div>
        <div className="status-label label--fullscreen">
          <p className="status-label__text">STATUS</p>
          <img
            className="status-label__icon sort-icon"
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <div className="quantity-label label--fullscreen">
          <p className="quantity-label__text">QTY</p>
          <img
            className="quantity-label__icon sort-icon"
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <div className="location-label label--fullscreen">
          <p className="location-label__text">WAREHOUSE</p>
          <img
            className="location-label__icon sort-icon"
            src={sort}
            alt="sort-icon"
          ></img>
        </div>
        <p className="actions-info-label label--fullscreen">ACTIONS</p>
      </div>
      <InventoryList />
    </div>
  );
}

import WarehouseList from "../../components/WarehouseList/WarehouseList";
import "./Warehouse.scss";
import search from "../../assets/icons/search-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";

function Warehouse() {
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
          <div className="add-warehouse">
            <p className="add-warehouse__text">+ Add New Warehouse</p>
          </div>
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
          <img className="address-label__icon sort-icon" src={sort} alt="sort-icon"></img>
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
      <WarehouseList />
    </div>
  );
}

export default Warehouse;

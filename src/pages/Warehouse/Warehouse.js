import WarehouseList from "../../components/WarehouseList/WarehouseList";
import "./Warehouse.scss";
import search from "../../assets/icons/search-24px.svg";

function Warehouse() {
  return (
    <div className="warehouse-list-page">
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
          <img className="search-bar__icon" src={search} alt="search-Icon"></img>
        </div>
        <div className="add-warehouse">
          <p className="add-warehouse__text">+ Add New Warehouse</p>
        </div>
      </div>
      <WarehouseList />
    </div>
  );
}

export default Warehouse;

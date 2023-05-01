import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import vectorIcon from "../../assets/icons/chevron_right-24px.svg";
import "./InventoryList.scss";

const baseUrl = "http://localhost:8080";

export default function InventoryList({ inventory, handleModel }) {
  return inventory.map((item, index) => {
    return (
      <Link
        to={`/inventory/details/${item.id}`}
        key={item.id}
        className="item-link"
      >
        <div className="item">
          <div className="item-wrapper">
            <div className="item-name-wrapper">
              <div className="name-wrapper">
                <h5 className="name-wrapper__label label">INVENTORY ITEM</h5>
                <div className="item-link__name">
                  <p className="name-wrapper__title-inv">{item.item_name}</p>
                  <img src={vectorIcon} alt="vector-icon"></img>
                </div>
              </div>
              <div className="category-container">
                <h5 className="category-container__label label">CATEGORY</h5>
                <p className="category-container__title">{item.category}</p>
              </div>
            </div>
            <div className="status-wrapper">
              <div className="status-container">
                <h5 className="status-container__label label">STATUS</h5>
                <p
                  className={
                    "status-container__title" && item.status === "In Stock"
                      ? "status-container__title--instock"
                      : "status-container__title--outstock"
                  }
                >
                  {item.status.toUpperCase()}
                </p>
              </div>
              <div className="quantity-container">
                <h5 className="quantity-container__label label">QUANTITY</h5>
                <p className="quantity-container__amount">{item.quantity}</p>
              </div>
              <div className="location-container">
                <h5 className="location-container__label label">WAREHOUSE</h5>
                <p className="location-container__title">
                  {item.warehouse_name}
                </p>
              </div>
            </div>
          </div>
          <div className="button-container--inventory">
            <img
              className="action-icon--inventory"
              onClick={(e) => {
                e.preventDefault();
                handleModel(item);
              }}
              src={deleteIcon}
              alt="delete-icon"
            ></img>
            <img
              className="action-icon--inventory"
              src={editIcon}
              alt="edit-icon"
            ></img>
          </div>
        </div>
        {/* this section of html is not rendered until tablet and desktop breakpoint */}
        <div
          className={
            index !== inventory.length - 1
              ? "item item--fullscreen item--border"
              : "item item--fullscreen"
          }
        >
          <div className="item-link__name">
            <p className="name-wrapper__title-inv">{item.item_name}</p>
            <img
              src={vectorIcon}
              alt="vector-icon"
              className="vector-icon"
            ></img>
          </div>
          <div className="category-container">
            <h5 className="category-container__label label">CATEGORY</h5>
            <p className="category-container__title">{item.category}</p>
          </div>
          <div className="status-container">
            <h5 className="status-container__label label">STATUS</h5>
            <p
              className={
                "status-container__title" && item.status === "In Stock"
                  ? "status-container__title--instock"
                  : "status-container__title--outstock"
              }
            >
              {item.status.toUpperCase()}
            </p>
          </div>
          <div className="quantity-container">
            <h5 className="quantity-container__label label">QTY</h5>
            <p className="information-container__amount">{item.quantity}</p>
          </div>
          <div className="location-container">
            <h5 className="location-container__label label">WAREHOUSE</h5>
            <p className="location-container__title">{item.warehouse_name}</p>
          </div>
          <div className="button-container--inventory">
            <img
              onClick={(e) => {
                e.preventDefault();
                handleModel(item);
              }}
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

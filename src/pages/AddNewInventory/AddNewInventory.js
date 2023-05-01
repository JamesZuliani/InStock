import "./AddNewInventory.scss";
import BackButton from "../../assets/icons/arrow_back-24px.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import InvalidPhoneIcon from "../../assets/icons/error-24px.svg";
import { useFormik, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import Loader from "react-spinners/GridLoader";

const baseUrl = "http://localhost:8080";

function AddNewInventoryItem() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // inital values - similar to useState()
  const formik = useFormik({
    initialValues: {
      itemName: "",
      description: "",
      category: "",
      status: "",
      quantity: 0,
      warehouseName: "",
      allWarehouses: [],
    },

    // validation
    validationSchema: Yup.object({
      itemName: Yup.string().required("This field is required"),
      description: Yup.string().required("This field is required"),
      category: Yup.string().required("This field is required"),
      status: Yup.string().required("This field is required"),
      quantity: Yup.number().required("This field is required"),
      warehouseName: Yup.string().required("This field is required"),
    }),

    // onSubmit function for the form
    onSubmit: (values) => {
      const warehouse_id = values.allWarehouses.find(warehouse => warehouse.warehouse_name === values.warehouseName).id 
      const { itemName, description, category, status, quantity } = values;
      const body = {
        warehouse_id,
        item_name: itemName,
        description,
        category,
        status,
        quantity,
      };
      axios
        .post(`${baseUrl}/api/inventories/`, body)
        .then(() => {
          alert('Submitted successfully!')
          navigate(-1)
        })
        .catch((error) => {
          alert('error: ' + error.message)
        });
    },
  });

  const categories = [
    "Accessories",
    "Gear",
    "Electronics",
    "Health",
    "Apparel",
  ];

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/warehouses`)
      .then(({ data }) => {
        formik.setValues({ allWarehouses: data });
        setLoading(false)
      })
      .catch((e) => console.log(e));
  }, []);

  if (loading || formik.values.allWarehouses.length === 0) {
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
    <div className="add">
      <div className="add-header">
        <div className="add-header__container">
          <img
            onClick={() => navigate(-1)}
            className="add-header__backbutton"
            src={BackButton}
            alt="back button arrow"
          ></img>
          <div className="add-header__title">
            <h1>Add New Inventory Item</h1>
          </div>
        </div>
      </div>

      {/* this FormikProvider goes on the top of the form for its own functionality */}
      {/* it has nothing to do with anything else */}
      <FormikProvider value={formik}>
        {/* formik.handleSubmit refrences to the inital object where we initated the formik at the top */}
        <form onSubmit={formik.handleSubmit}>
          <div className="item-add">
            <div className="invitem-details">
              <h2 className="invitem-details__header">Item Details</h2>

              {/* item name input */}
              <div className="invitem-details__box">
                <h3 className="invitem-details__subtitle">Item Name</h3>
                <input
                  value={formik.values.itemName || ""}
                  placeholder="Item Name"
                  name="itemName"
                  className={`invitem-details__inputs ${
                    formik.touched.itemName && formik.errors.itemName
                      ? "invitem-details__inputs--invalid"
                      : null
                  }`}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>

                {/* if there is any errors, this block runs and shows the error */}
                {formik.touched.itemName && formik.errors.itemName ? (
                  <div className="invitem-details__error">
                    <img
                      src={InvalidPhoneIcon}
                      alt="Error icon"
                      title="Input Error"
                      className="invitem-details__error-icon"
                    />
                    <span className="invitem-details__error-msg">
                      {formik.errors.itemName}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* description input */}
              <div className="invitem-details__box">
                <h3 className="invitem-details__subtitle">Description</h3>
                <textarea
                  placeholder="Please enter a brief item description..."
                  name="description"
                  className={`invitem-details__description ${
                    formik.touched.itemName && formik.errors.itemName
                      ? "invitem-details__inputs--invalid"
                      : null
                  }`}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>

                {/* if there is any errors, this block runs and shows the error */}
                {formik.touched.description && formik.errors.description ? (
                  <div className="invitem-details__error">
                    <img
                      src={InvalidPhoneIcon}
                      alt="Error icon"
                      title="Input Error"
                      className="invitem-details__error-icon"
                    />
                    <span className="invitem-details__error-msg">
                      {formik.errors.description}
                    </span>
                  </div>
                ) : null}
              </div>
              {/* Category input */}
              <div className="invitem-details__subtitle-container">
                <h3 className="invitem-details__subtitle">Category</h3>

                {/* instead of `select` element,
                     we imported this similar component from formik to make our job easier
                     it manages the `onChange` and everthing by itself...
                     */}
                <Field
                  as="select"
                  name="category"
                  className="invitem-details__name"
                  onChange={(e) => formik.handleChange(e)}
                  value={formik.values.category || ""}
                >
                  {/* generating the options */}
                  <option value="" disabled>
                    Please select
                  </option>
                  {categories.map((category) => {
                    return (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </Field>
              </div>
            </div>

            <div className="invitem-details__availability">
              <h2 className="invitem-details__header">Item Availability</h2>
              <div>
                <h3 className="invitem-details__subtitle">Status</h3>
                {/* status radio buttons input */}
                <div className="radio-buttons">
                  <label
                    className={`radio-buttons__instock ${
                      formik.values.status === "Out of Stock"
                        ? "radio-buttons--inactive"
                        : ""
                    }`}
                  >
                    <Field
                      name="status"
                      className="radio-buttons__input"
                      type="radio"
                      value="In Stock"
                      checked={
                        formik.values.status === "In Stock" ? true : false
                      }
                      onChange={(e) => {
                        formik.handleChange(e);
                        formik.setFieldValue(
                          "quantity",
                          formik.values.quantity || ""
                        );
                      }}
                    />
                    In Stock
                  </label>

                  <label
                    className={`radio-buttons__outstock ${
                      formik.values.status === "In Stock"
                        ? "radio-buttons--inactive"
                        : ""
                    }`}
                  >
                    <Field
                      name="status"
                      className="radio-buttons__input"
                      type="radio"
                      value="Out of Stock"
                      checked={
                        formik.values.status === "Out of Stock" ? true : false
                      }
                      onChange={(e) => {
                        formik.handleChange(e);
                        formik.setFieldValue("quantity", 0);
                      }}
                    />
                    Out of Stock
                  </label>
                </div>
              </div>
              {/* showing the quantity page based on the status */}
              {formik.values.status === "In Stock" && (
                <div className="invitem-details__quantity-container">
                  <h3 className="invitem-details__subtitle">Quantity</h3>
                  <input
                    name="quantity"
                    className="invitem-details__quantity"
                    type="text"
                    onChange={formik.handleChange}
                  ></input>

                  {/* if there is any errors {not being a number or being empty} , this block runs and shows the error */}
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <div className="invitem-details__error">
                      <img
                        src={InvalidPhoneIcon}
                        alt="Error icon"
                        title="Input Error"
                        className="invitem-details__error-icon"
                      />
                      <span className="invitem-details__error-msg">
                        {formik.errors.quantity}
                      </span>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Warehouse dropDown */}
              <div className="invitem-details__box">
                <h3 className="invitem-details__subtitle">Warehouse</h3>
                <div className="invitem-details__form">
                  {/* instead of `select` element,
                     we imported this similar component from formik to make our job easier
                     it manages the `onChange` and everthing by itself...
                     */}
                  <Field
                    name="warehouseName"
                    className="invitem-details__name"
                    value={formik.values.warehouseName || ""}
                    as="select"
                    onChange={(e) => formik.handleChange(e)}
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    {/* generating the options */}
                    {formik.values.allWarehouses &&
                      formik.values.allWarehouses.map((warehouse) => {
                        return (
                          <option
                            key={warehouse.id}
                            value={warehouse.warehouse_name}
                          >
                            {warehouse.warehouse_name}
                          </option>
                        );
                      })}
                  </Field>
                </div>
              </div>
            </div>
          </div>
          <div className="invitem-footer">
            <button
              type="button"
              onClick={() => navigate("/inventory")}
              className="invitem-footer__form-button invitem-footer__form-button--secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="invitem-footer__form-button invitem-footer__form-button--primary"
            >
              + Add Item
            </button>
            <div className="dropdown-button-container"></div>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
}

export default AddNewInventoryItem;

import "./EditInventory.scss";
import BackButton from "../../assets/icons/arrow_back-24px.svg";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import InvalidPhoneIcon from "../../assets/icons/error-24px.svg";
import { useFormik, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import Loader from "react-spinners/GridLoader";

function EditInventory() {
  const [loading, setLoading] = useState(true);

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
      quantity: Yup.string()
        .matches(/^[0-9]+$/, "quantity should be a number")
        .required("This field is required"),
      warehouseName: Yup.string().required("This field is required"),
    }),

    // onSubmit function for the form
    onSubmit: async (values) => {
      // Handle form submission here
      axios
        .put(`http://localhost:8080/api/inventories/${id}`, {
          item_name: values.itemName,
          description: values.description,
          category: values.category,
          status: values.status,
          quantity:
            values.status.toLowerCase() === "in stock" ? values.quantity : "0",
          warehouse_id: values.allWarehouses.find(
            (id) => id.warehouse_name === formik.values.warehouseName
          ).id,
        })
        .then((res) => {
          alert("submitted");
          navigate(-1);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const categories = [
    "Accessories",
    "Gear",
    "Electronics",
    "Health",
    "Apparel",
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/inventories/${id}`)
      .then((res) => {
        const { data } = res;
        // setting each field with its corresponding inital value, similarly set the state variables
        const initialValues = {
          itemName: data.item_name,
          description: data.description,
          category: data.category,
          status: data.status,
          quantity: data.quantity,
          warehouseName: data.warehouse_name,
          allWarehouses: [],
        };
        formik.setValues(initialValues);

        // getting all the warehouses
        axios.get(`http://localhost:8080/api/warehouses`).then((res) => {
          const values = {
            ...initialValues,
            allWarehouses: res.data,
          };
          formik.setValues(values);
          setLoading(false)
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  // instead of checking each state variable, formik has a function that holds all of them
  // if its there we would pass this guard condition
  if (loading || !formik.values) {
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
    <div className="edit">
      <div className="edit-header">
        <div className="edit-header__container">
          <img
            onClick={() => navigate(-1)}
            className="edit-header__backbutton"
            src={BackButton}
            alt="back button arrow"
          ></img>
          <div className="edit-header__title">
            <h1>Edit Inventory Item</h1>
          </div>
        </div>
      </div>

      {/* this FormikProvider goes on the top of the form for its own functionality */}
      {/* it has nothing to do with anything else */}
      <FormikProvider value={formik}>
        {/* formik.handleSubmit refrences to the inital object where we initated the formik at the top */}
        <form onSubmit={formik.handleSubmit}>
          <div className="item-edit">
            <div className="item-details">
              <h2 className="item-details__header">Item Details</h2>

              {/* item name input */}
              <div className="item-details__box">
                <h3 className="item-details__subtitle">Item Name</h3>
                <input
                  placeholder="Item Name"
                  name="itemName"
                  className={`item-details__inputs`}
                  type="text"
                  value={formik.values.itemName}
                  onChange={formik.handleChange}
                ></input>

                {/* if there is any errors, this block runs and shows the error */}
                {formik.touched.itemName && formik.errors.itemName ? (
                  <div className="item-edit__error">
                    <img
                      src={InvalidPhoneIcon}
                      alt="Error icon"
                      title="Input Error"
                      className="item-edit__error-icon"
                    />
                    <span className="item-edit__error-msg">
                      {formik.errors.itemName}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* description input */}
              <div className="item-details__box">
                <h3 className="item-details__subtitle">Description</h3>
                <textarea
                  placeholder="Please enter a brief item description..."
                  name="description"
                  className="item-details__description "
                  type="text"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                ></textarea>

                {/* if there is any errors, this block runs and shows the error */}
                {formik.touched.description && formik.errors.description ? (
                  <div className="item-edit__error">
                    <img
                      src={InvalidPhoneIcon}
                      alt="Error icon"
                      title="Input Error"
                      className="item-edit__error-icon"
                    />
                    <span className="item-edit__error-msg">
                      {formik.errors.description}
                    </span>
                  </div>
                ) : null}
              </div>
              {/* Category input */}
              <div className="item-details__subtitle-container">
                <h3 className="item-details__subtitle">Category</h3>

                {/* instead of `select` element,
                     we imported this similar component from formik to make our job easier
                     it manages the `onChange` and everthing by itself...
                     */}
                <Field
                  as="select"
                  name="category"
                  className="item-details__name"
                  value={formik.values.category}
                  onChange={(e) => formik.handleChange(e)}
                >
                  {/* generating the options */}
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

            <div className="item-details__availability">
              <h2 className="item-details__header">Item Availability</h2>
              <div>
                <h3 className="item-details__subtitle">Status</h3>
                {/* status radio buttons input */}
                <div className="radio-buttons">
                  <label
                    className={`radio-buttons__instock ${
                      formik.values.status === "Out of Stock"
                        ? "radio-buttons--inactive"
                        : ""
                    }`}
                  >
                    <input
                      name="statusIn"
                      className="radio-buttons__input"
                      type="radio"
                      value="In Stock"
                      checked={
                        formik.values.status === "In Stock" ? true : false
                      }
                      onChange={() =>
                        formik.setFieldValue("status", "In Stock")
                      }
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
                    <input
                      name="statusOut"
                      className="radio-buttons__input"
                      type="radio"
                      value="Out of Stock"
                      checked={
                        formik.values.status === "Out of Stock" ? true : false
                      }
                      onChange={() =>
                        formik.setFieldValue("status", "Out of Stock")
                      }
                    />
                    Out of Stock
                  </label>
                </div>
              </div>
              {/* showing the quantity page based on the status */}
              {formik.values.status === "In Stock" && (
                <div className="item-details__quantity-container">
                  <h3 className="item-details__subtitle">Quantity</h3>
                  <input
                    name="quantity"
                    className="item-details__quantity"
                    type="text"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                  ></input>

                  {/* if there is any errors {not being a number or being empty} , this block runs and shows the error */}
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <div className="item-edit__error">
                      <img
                        src={InvalidPhoneIcon}
                        alt="Error icon"
                        title="Input Error"
                        className="item-edit__error-icon"
                      />
                      <span className="item-edit__error-msg">
                        {formik.errors.quantity}
                      </span>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Warehouse dropDown */}
              <div className="item-details__box">
                <h3 className="item-details__subtitle">Warehouse</h3>
                <div className="item-details__form">
                  {/* instead of `select` element,
                     we imported this similar component from formik to make our job easier
                     it manages the `onChange` and everthing by itself...
                     */}
                  <Field
                    name="warehouseName"
                    className="item-details__name"
                    value={formik.values.warehouseName}
                    as="select"
                    onChange={(e) => formik.handleChange(e)}
                  >
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
          <div className="item-footer">
            <button
              type="button"
              onClick={() => navigate("/inventory")}
              className="item-footer__form-button item-footer__form-button--secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="item-footer__form-button item-footer__form-button--primary"
            >
              Save
            </button>
            <div className="dropdown-button-container"></div>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
}

export default EditInventory;

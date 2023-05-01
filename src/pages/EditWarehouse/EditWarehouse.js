import { useEffect, useState } from "react";
import axios from "axios";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import InvalidPhoneIcon from "../../assets/icons/error-24px.svg";
import Loader from "react-spinners/GridLoader";
import "./EditWarehouse.scss";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const baseUrl = "http://localhost:8080";

function EditWarehouse() {

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      warehouse_name: "",
      address: "",
      city: "",
      country: "",
      contact_name: "",
      contact_position: "",
      contact_phone: "",
      contact_email: "",
    },
    validationSchema: Yup.object({
      warehouse_name: Yup.string()
        .matches(
          /^(?! )\S+(?: \S+)*$/,
          "Warehouse name shoudn't only contain, start or end with space character"
        )
        .required("This field is required"),
      address: Yup.string()
        .matches(
          /^(?! )\S+(?: \S+)*$/,
          "Address shoudn't only contain, start or end with space character"
        )
        .required("This field is required"),
      city: Yup.string()
        .matches(
          /^(?! )\S+(?: \S+)*$/,
          "City shoudn't only contain, start or end with space character"
        )
        .required("This field is required"),
      country: Yup.string()
        .matches(
          /^(?! )\S+(?: \S+)*$/,
          "Country shoudn't only contain, start or end with space character"
        )
        .required("This field is required"),
      contact_name: Yup.string()
        .matches(
          /^(?! )\S+(?: \S+)*$/,
          "Contact name shoudn't only contain, start or end with space character"
        )
        .required("This field is required"),
      contact_position: Yup.string()
        .matches(
          /^(?! )\S+(?: \S+)*$/,
          "Contact position shoudn't only contain, start or end with space character"
        )
        .required("This field is required"),
      contact_phone: Yup.string()
        .matches(/^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/, "Invalid phone number")
        .required("This field is required"),
      contact_email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
          "Invalid email address"
        )
        .required("This field is required"),
    }),

    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
      axios
        .put(`http://localhost:8080/api/warehouses/${id}`, values)
        .then((response) => {
          navigate("/warehouse");
        });
    },
  });

  useEffect(() => {
    axios.get(`${baseUrl}/api/warehouses/${id}`).then(({ data }) => {
      formik.setValues({
        warehouse_name: data.warehouse_name,
        address: data.address,
        city: data.city,
        country: data.country,
        contact_name: data.contact_name,
        contact_position: data.contact_position,
        contact_phone: data.contact_phone,
        contact_email: data.contact_email,
      });
      setLoading(false)
    });
  }, [id]);
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
    <div className="editWarehouse">
      <div className="editWarehouse__header">
        <Link to="/warehouse">
          <img
            className="editWarehouse__back-icon"
            src={backArrowIcon}
            alt="back button arrow"
          />
        </Link>
        <h2>Edit Warehouse</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="editWarehouse__form-wrapper">
          <div className="editWarehouse__warehouse-details">
            <h2 className="editWarehouse__sub-header">Warehouse Details</h2>

            {/* warehouse_name input */}
            <label className="editWarehouse__input-label">
              Warehouse Name
              <input
                type="text"
                name="warehouse_name"
                value={formik.values.warehouse_name}
                onChange={formik.handleChange}
                className={`editWarehouse__input ${
                  formik.touched.warehouse_name && formik.errors.warehouse_name
                    ? "editWarehouse__input--invalid"
                    : null
                }`}
              />
              {formik.touched.warehouse_name && formik.errors.warehouse_name ? (
                <div className="editWarehouse__error">
                  <img
                    src={InvalidPhoneIcon}
                    alt="Error icon"
                    title="Input Error"
                    className="editWarehouse__error-icon"
                  />
                  <span className="editWarehouse__error-msg">
                    {formik.errors.warehouse_name}
                  </span>
                </div>
              ) : null}
            </label>

            {/* Address input */}
            <label className="editWarehouse__input-label">
              Street address
              <input
                className={`editWarehouse__input ${
                  formik.touched.address && formik.errors.address
                    ? "editWarehouse__input--invalid"
                    : null
                }`}
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="editWarehouse__error">
                  <img
                    src={InvalidPhoneIcon}
                    alt="Error icon"
                    title="Input Error"
                    className="editWarehouse__error-icon"
                  />
                  <span className="editWarehouse__error-msg">
                    {formik.errors.address}
                  </span>
                </div>
              ) : null}
            </label>

            {/* City input */}
            <label className="editWarehouse__input-label">
              City
              <input
                className={`editWarehouse__input ${
                  formik.touched.city && formik.errors.city
                    ? "editWarehouse__input--invalid"
                    : null
                }`}
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="editWarehouse__error">
                  <img
                    src={InvalidPhoneIcon}
                    alt="Error icon"
                    title="Input Error"
                    className="editWarehouse__error-icon"
                  />
                  <span className="editWarehouse__error-msg">
                    {formik.errors.city}
                  </span>
                </div>
              ) : null}
            </label>

            {/* Country input */}
            <label className="editWarehouse__input-label">
              country
              <input
                className={`editWarehouse__input ${
                  formik.touched.country && formik.errors.country
                    ? "editWarehouse__input--invalid"
                    : null
                }`}
                type="text"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
              />
              {formik.touched.country && formik.errors.country ? (
                <div className="editWarehouse__error">
                  <img
                    src={InvalidPhoneIcon}
                    alt="Error icon"
                    title="Input Error"
                    className="editWarehouse__error-icon"
                  />
                  <span className="editWarehouse__error-msg">
                    {formik.errors.country}
                  </span>
                </div>
              ) : null}
            </label>
          </div>

          {/* Contact details inputs */}
          <div className="editWarehouse__contact-details">
            <h2 className="editWarehouse__sub-header">Contact Details</h2>

            {/* Contact Name input */}
            <label className="editWarehouse__input-label">
              Contact Name
              <input
                className={`editWarehouse__input ${
                  formik.touched.contact_name && formik.errors.contact_name
                    ? "editWarehouse__input--invalid"
                    : null
                }`}
                type="text"
                name="contact_name"
                value={formik.values.contact_name}
                onChange={formik.handleChange}
              />
              {formik.touched.contact_name && formik.errors.contact_name ? (
                <div className="editWarehouse__error">
                  <img
                    src={InvalidPhoneIcon}
                    alt="Error icon"
                    title="Input Error"
                    className="editWarehouse__error-icon"
                  />
                  <span className="editWarehouse__error-msg">
                    {formik.errors.contact_name}
                  </span>
                </div>
              ) : null}
            </label>

            {/* Position input */}
            <label className="editWarehouse__input-label">
              Position
              <input
                className={`editWarehouse__input ${
                  formik.touched.contact_position &&
                  formik.errors.contact_position
                    ? "editWarehouse__input--invalid"
                    : null
                }`}
                type="text"
                name="contact_position"
                placeholder="Position"
                value={formik.values.contact_position}
                onChange={formik.handleChange}
              />
              {formik.touched.contact_position &&
              formik.errors.contact_position ? (
                <div className="editWarehouse__error">
                  <img
                    src={InvalidPhoneIcon}
                    alt="Error icon"
                    title="Input Error"
                    className="editWarehouse__error-icon"
                  />
                  <span className="editWarehouse__error-msg">
                    {formik.errors.contact_position}
                  </span>
                </div>
              ) : null}
            </label>

            {/* Phone Number input */}
            <label className="editWarehouse__input-label">
              Phone Number
              <input
                className={`editWarehouse__input ${
                  formik.touched.contact_phone && formik.errors.contact_phone
                    ? "editWarehouse__input--invalid"
                    : null
                }`}
                placeholder="Phone Number"
                type="tel"
                name="contact_phone"
                value={formik.values.contact_phone}
                onChange={formik.handleChange}
              />
              {formik.touched.contact_phone && formik.errors.contact_phone ? (
                <div className="editWarehouse__error">
                  <img
                    src={InvalidPhoneIcon}
                    alt="Error icon"
                    title="Input Error"
                    className="editWarehouse__error-icon"
                  />
                  <span className="editWarehouse__error-msg">
                    {formik.errors.contact_phone}
                  </span>
                </div>
              ) : null}
            </label>

            {/* Email input */}
            <label className="editWarehouse__input-label">
              Email
              <input
                className={`editWarehouse__input ${
                  formik.touched.contact_email && formik.errors.contact_email
                    ? "editWarehouse__input--invalid"
                    : null
                }`}
                placeholder="Email"
                type="email"
                name="contact_email"
                value={formik.values.contact_email}
                onChange={formik.handleChange}
              />
              {formik.touched.contact_email && formik.errors.contact_email ? (
                <div className="editWarehouse__error">
                  <img
                    src={InvalidPhoneIcon}
                    alt="Error icon"
                    title="Input Error"
                    className="editWarehouse__error-icon"
                  />
                  <span className="editWarehouse__error-msg">
                    {formik.errors.contact_email}
                  </span>
                </div>
              ) : null}
            </label>
          </div>
        </div>
        <div className="editWarehouse__button-wrapper">
          <button
            onClick={() => (navigate(-1))}
            className="editWarehouse__form-button editWarehouse__form-button--secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="editWarehouse__form-button editWarehouse__form-button--primary"
          >
            + Add Warehouse
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditWarehouse;

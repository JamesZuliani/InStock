import "./AddNewWarehouse.scss";
import BackButton from "../../assets/icons/arrow_back-24px.svg";
import InvalidPhoneIcon from "../../assets/icons/error-24px.svg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function AddNewWarehouse() {
  const navigate = useNavigate();
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
      warehouse_name: Yup.string().required("This field is required"),
      address: Yup.string().required("This field is required"),
      city: Yup.string().required("This field is required"),
      country: Yup.string().required("This field is required"),
      contact_name: Yup.string().required("This field is required"),
      contact_position: Yup.string().required("This field is required"),
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

    onSubmit: async (values, e) => {
      // Handle form submission here
      try {
        await axios.post("http://localhost:8080/api/warehoues", values);
        e.resetForm();
        alert("Successfully submitted");
        navigate("/warehouse");
      } catch (err) {
        e.resetForm();
        alert(
          `${err.message} (${err.response.statusText})\n\nTry again later...`
        );
      }
    },
  });

  return (
    <>
      <section className="new-warehouse">
        <div className="new-warehouse__header">
          <Link to="/warehouse">
            <img
              className="new-warehouse__back-icon"
              src={BackButton}
              alt="back button arrow"
            />
          </Link>
          <h1>Add New Warehouse</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="new-warehouse__form-wrapper">
            <div className="new-warehouse__warehouse-details">
              <h2 className="new-warehouse__sub-header">Warehouse Details</h2>

              {/* warehouse_name input */}
              <label className="new-warehouse__input-label">
                Warehouse Name
                <input
                  name="warehouse_name"
                  id="warehouse_name"
                  type="text"
                  className={`new-warehouse__input ${
                    formik.touched.warehouse_name &&
                    formik.errors.warehouse_name
                      ? "new-warehouse__input--invalid"
                      : null
                  }`}
                  placeholder="Warehouse Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.warehouse_name}
                />
                {formik.touched.warehouse_name &&
                formik.errors.warehouse_name ? (
                  <div className="new-warehouse__error">
                    <img
                      src={InvalidPhoneIcon}
                      alt="Error icon"
                      title="Input Error"
                      className="new-warehouse__error-icon"
                    />
                    <span className="new-warehouse__error-msg">
                      {formik.errors.warehouse_name}
                    </span>
                  </div>
                ) : null}
              </label>

              {/* Address input */}
              <label className="new-warehouse__input-label">
                Street Address
                <input
                  name="address"
                  id="address"
                  type="text"
                  className={`new-warehouse__input ${
                    formik.touched.address && formik.errors.address
                      ? "new-warehouse__input--invalid"
                      : null
                  }`}
                  placeholder="Street Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="new-warehouse__error">
                    <img
                      src={InvalidPhoneIcon}
                      alt="Error icon"
                      title="Input Error"
                      className="new-warehouse__error-icon"
                    />
                    <span className="new-warehouse__error-msg">
                      {formik.errors.address}
                    </span>
                  </div>
                ) : null}
              </label>

              {/* City input */}
              <label className="new-warehouse__input-label">
                City
                <input
                  name="city"
                  id="city"
                  type="text"
                  className={`new-warehouse__input ${
                    formik.touched.city && formik.errors.city
                      ? "new-warehouse__input--invalid"
                      : null
                  }`}
                  placeholder="City"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city ? (
                  <div className="new-warehouse__error">
                    <img
                      src={InvalidPhoneIcon}
                      alt="Error icon"
                      title="Input Error"
                      className="new-warehouse__error-icon"
                    />
                    <span className="new-warehouse__error-msg">
                      {formik.errors.city}
                    </span>
                  </div>
                ) : null}
              </label>

              {/* Country input */}
              <label className="new-warehouse__input-label">
                Country
                <input
                  name="country"
                  id="country"
                  type="text"
                  className={`new-warehouse__input ${
                    formik.touched.country && formik.errors.country
                      ? "new-warehouse__input--invalid"
                      : null
                  }`}
                  placeholder="Country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                />
                {formik.touched.country && formik.errors.country ? (
                  <div className="new-warehouse__error">
                    <img
                      src={InvalidPhoneIcon}
                      alt="Error icon"
                      title="Input Error"
                      className="new-warehouse__error-icon"
                    />
                    <span className="new-warehouse__error-msg">
                      {formik.errors.country}
                    </span>
                  </div>
                ) : null}
              </label>
            </div>

            {/* Contact details inputs */}
            <div className="new-warehouse__contact-details">
              <h2 className="new-warehouse__sub-header">Contact Details</h2>

              {/* Contact Name input */}
              <label className="new-warehouse__input-label">
                Contact Name
                <input
                  name="contact_name"
                  id="contact_name"
                  type="text"
                  className={`new-warehouse__input ${
                    formik.touched.contact_name && formik.errors.contact_name
                      ? "new-warehouse__input--invalid"
                      : null
                  }`}
                  placeholder="Contact Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contact_name}
                />
                {formik.touched.contact_name && formik.errors.contact_name ? (
                  <div className="new-warehouse__error">
                    <img
                      src={InvalidPhoneIcon}
                      alt="Error icon"
                      title="Input Error"
                      className="new-warehouse__error-icon"
                    />
                    <span className="new-warehouse__error-msg">
                      {formik.errors.contact_name}
                    </span>
                  </div>
                ) : null}
              </label>

              {/* Position input */}
              <label className="new-warehouse__input-label">
                Position
                <input
                  name="contact_position"
                  id="contact_position"
                  type="text"
                  className={`new-warehouse__input ${
                    formik.touched.contact_position &&
                    formik.errors.contact_position
                      ? "new-warehouse__input--invalid"
                      : null
                  }`}
                  placeholder="Position"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contact_position}
                />
                {formik.touched.contact_position &&
                formik.errors.contact_position ? (
                  <div className="new-warehouse__error">
                    <img
                      src={InvalidPhoneIcon}
                      alt="Error icon"
                      title="Input Error"
                      className="new-warehouse__error-icon"
                    />
                    <span className="new-warehouse__error-msg">
                      {formik.errors.contact_position}
                    </span>
                  </div>
                ) : null}
              </label>

              {/* Phone Number input */}
              <label className="new-warehouse__input-label">
                Phone Number
                <input
                  name="contact_phone"
                  id="contact_phone"
                  type="text"
                  className={`new-warehouse__input ${
                    formik.touched.contact_phone && formik.errors.contact_phone
                      ? "new-warehouse__input--invalid"
                      : null
                  }`}
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contact_phone}
                />
                {formik.touched.contact_phone && formik.errors.contact_phone ? (
                  <div className="new-warehouse__error">
                    <img
                      src={InvalidPhoneIcon}
                      alt="Error icon"
                      title="Input Error"
                      className="new-warehouse__error-icon"
                    />
                    <span className="new-warehouse__error-msg">
                      {formik.errors.contact_phone}
                    </span>
                  </div>
                ) : null}
              </label>

              {/* Email input */}
              <label className="new-warehouse__input-label">
                Email
                <input
                  name="contact_email"
                  id="contact_email"
                  type="text"
                  className={`new-warehouse__input ${
                    formik.touched.contact_email && formik.errors.contact_email
                      ? "new-warehouse__input--invalid"
                      : null
                  }`}
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contact_email}
                />
                {formik.touched.contact_email && formik.errors.contact_email ? (
                  <div className="new-warehouse__error">
                    <img
                      src={InvalidPhoneIcon}
                      alt="Error icon"
                      title="Input Error"
                      className="new-warehouse__error-icon"
                    />
                    <span className="new-warehouse__error-msg">
                      {formik.errors.contact_email}
                    </span>
                  </div>
                ) : null}
              </label>
            </div>
          </div>
          <div className="new-warehouse__button-wrapper">
            <button
              onClick={() => (window.location.pathname = "/warehouse")}
              className="new-warehouse__form-button new-warehouse__form-button--secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="new-warehouse__form-button new-warehouse__form-button--primary"
            >
              + Add Warehouse
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddNewWarehouse;

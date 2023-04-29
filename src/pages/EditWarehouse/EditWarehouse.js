import { useEffect, useState } from 'react';
import axios from "axios";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import "./EditWarehouse.scss"
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const baseUrl = "http://localhost:8080";

function EditWarehouse() {
    const navigate = useNavigate();

    const { id } = useParams()

    const formik = useFormik({
        initialValues: {
            warehouse_name: "",
            address: "",
            city: "",
            country: "",
            contact_name: "",
            contact_position: "",
            contact_phone: "",
            contact_email: ""
        },
        validationSchema: Yup.object({
            warehouse_name: Yup.string().matches(
                /^(?! )\S+(?: \S+)*$/,
                "Warehouse name shoudn't only contain, start or end with space character"
            ).required("This field is required"),
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
                .matches(/^(?! )\S+(?: \S+)*$/, "Contact position shoudn't only contain, start or end with space character")
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
            console.log(values)
            // Handle form submission here
            axios.put(`http://localhost:8080/api/warehouses/${id}`, values).then(response => {
            navigate('/warehouse')
            })
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
                contact_email: data.contact_email
            })
        });
    }, [id]);
    if (!formik.values) {
        return <div>Loading...</div>
    }

    return (
        <div className="editWarehouse">
            <div className="editWarehouse__topflex">
                <img src={backArrowIcon} alt="arrowIcon" onClick={()=>{navigate(-1)}}/>
                <h2>Edit Warehouse</h2>
            </div>
            <form className="editWarehouse__form" onSubmit={formik.handleSubmit}>
                <div className="editWarehouse__form--flexdiv">
                    <div className='editWarehouse__form--warehouse'>
                        <h3>Warehouse Name</h3>
                        <label htmlFor="name">Warehouse Name
                            <input type="text" name="warehouse_name" value={formik.values.warehouse_name} onChange={formik.handleChange} />
                        </label>
                        <label htmlFor="street">Street address
                            <input type="text" name="address" value={formik.values.address} onChange={formik.handleChange} /></label>
                        <label htmlFor="city">City
                            <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange} />
                        </label>
                        <label htmlFor="country">country
                            <input type="text" name="country" value={formik.values.country} onChange={formik.handleChange} />
                        </label>
                    </div>
                    <div className='editWarehouse__form--contact'>
                        <h3>Contact Details</h3>
                        <label htmlFor="contact">Contact Name
                            <input type="text" name="contact_name" value={formik.values.contact_name} onChange={formik.handleChange} />
                        </label>
                        <label htmlFor="position">Position
                            <input type="text" name="contact_position" value={formik.values.contact_position} onChange={formik.handleChange} /></label>
                        <label htmlFor="phone">Phone Number
                            <input type="tel" name="contact_phone" value={formik.values.contact_phone} onChange={formik.handleChange} />
                        </label>
                        <label htmlFor="email">Email
                            <input type="email" name="contact_email" value={formik.values.contact_email} onChange={formik.handleChange} />
                        </label>
                    </div>
                </div>
                <div className="editWarehouse__button">
                    <button type="button" id="btn-1" onClick={() => { navigate("/warehouse") }}>Cancel</button>
                    <button type="submit" id="btn-2">Save</button>
                </div>
            </form>
        </div>
    )
};

export default EditWarehouse;
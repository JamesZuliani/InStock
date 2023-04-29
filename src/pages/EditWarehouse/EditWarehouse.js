import { useEffect, useState } from 'react';
import axios from "axios";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import "./EditWarehouse.scss"
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = "http://localhost:8080";

function EditWarehouse() {

    const [arrWarehouses, setArrWarehouses] = useState();
    const [displayEditedWarehouses, setDisplayEditedWarehouses] = useState();
    const { id } = useParams()
    const [currentWarehouse, setCurrentWarehouse] = useState({})

    useEffect(() => {
        axios.get(`${baseUrl}/api/warehouses`).then(({ data }) => {
            setArrWarehouses(data);
        });
        axios.get(`${baseUrl}/api/warehouses/${id}`).then(({ data }) => {
            setCurrentWarehouse({
                warehouse_name: data.warehouse_name,
                address: data.address,
                city: data.city,
                country: data.country,
                contact_name: data.contact_name,
                contact_position: data.contact_position,
                contact_phone: data.contact_phone,
                contact_email: data.contact_email
            })
        })

    }, [id]);

    // const warehouse = arrWarehouses.find(warehouse => warehouse.id === id)
    if (!currentWarehouse) {
        return <div>Loading...</div>
    }
    function updateWarehouse(formData, id) {
        axios.put(`http://localhost:8080/api/warehouses/${id}`, formData).then(response => {
            setCurrentWarehouse(response.data)
            
        })
        // console.log(formData);
        // console.log(id)
    }

    return (
        <div className="editWarehouse">
            <div className="editWarehouse__topflex">
                <img src={backArrowIcon} alt="arrowIcon" />
                <h2>Edit Warehouse</h2>
            </div>
            <form className="editWarehouse__form" onSubmit={(e) => {
                e.preventDefault()

                const formData = {
                    warehouse_name: e.target.name.value,
                    address: e.target.street.value,
                    city: e.target.city.value,
                    country: e.target.country.value,
                    contact_name: e.target.contact.value,
                    contact_position: e.target.position.value,
                    contact_phone: e.target.phone.value,
                    contact_email: e.target.email.value,
                }
                // console.log(formData)
                updateWarehouse(formData, id)
            }}>
                <div className="editWarehouse__form--flexdiv">
                    <div className='editWarehouse__form--warehouse'>
                        <h3>Warehouse Name</h3>
                        <label htmlFor="name">Warehouse Name
                            <input type="text" name="name" defaultValue={currentWarehouse.warehouse_name} />
                        </label>
                        <label htmlFor="street">Street address
                            <input type="text" name="street" defaultValue={currentWarehouse.address}/></label>
                        <label htmlFor="city">City
                            <input type="text" name="city" defaultValue={currentWarehouse.city}/>
                        </label>
                        <label htmlFor="country">country
                            <input type="text" name="country" defaultValue={currentWarehouse.country}/>
                        </label>
                    </div>
                    <div className='editWarehouse__form--contact'>
                        <h3>Contact Details</h3>
                        <label htmlFor="contact">Contact Name
                            <input type="text" name="contact" defaultValue={currentWarehouse.contact_name}/>
                        </label>
                        <label htmlFor="position">Position
                            <input type="text" name="position" defaultValue={currentWarehouse.contact_position}/></label>
                        <label htmlFor="phone">Phone Number
                            <input type="tel" name="phone" defaultValue={currentWarehouse.contact_phone}/>
                        </label>
                        <label htmlFor="email">Email
                            <input type="email" name="email" defaultValue={currentWarehouse.contact_email}/>
                        </label>
                    </div>
                </div>
                <div className="editWarehouse__button">
                    <button id="btn-1">Cancel</button>
                    <button id="btn-2">Save</button>
                </div>
            </form>
        </div>
    )
};

export default EditWarehouse;
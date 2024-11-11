import React, { useState, useEffect } from 'react';
import img from '../Assest/icon/user.png';
import './Admin.css';
import Hi from '../Assest/icon/hand.png';
import Cross from '../Assest/icon/cross.png';
import Correct from '../Assest/icon/correct.png';
import toast from 'react-hot-toast';
import axios from 'axios';
import Allproducts from '../Assest/all_light.js'

const Admin = () => {
    const [email, setEmail] = useState('');
    const [username, setName] = useState('');
    const [number, setNumber] = useState('');

    // Fetch User Details
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                toast.error('You need to be logged in', { position: 'top-right' });
                return;
            }

            try {
                const response = await axios.get('http://localhost:4000/userdetails', {
                    headers: { 'auth-token': token }
                });

                if (response.data.success) {
                    setName(response.data.user.name);
                    setNumber(response.data.user.number);
                    setEmail(response.data.user.email);
                } else {
                    toast.error(response.data.message, { position: 'top-right' });
                }
            } catch (err) {
                console.error(err);
                toast.error('Failed to load user details.', { position: 'top-right' });
            }
        };
        fetchData();
    }, []);

    // State for Contacts
    const [conDetails, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/contactdetails');
                if (response.data.success) {
                    setContacts(response.data.data);
                } else {
                    toast.error(response.data.message, { position: 'top-right' });
                }
            } catch (err) {
                console.error(err);
                toast.error('Failed to load contact details.', { position: 'top-right' });
            }
        };
        fetchContacts();
    }, []);


    // Delete Contact
    const deleteContact = async (email, bt) => {
        console.log("hi", bt);
        // try {
        //     const response = await axios.delete(`http://localhost:4000/deletecontact/${email}`);
        //     if (response.data.success) {
        //         if(bt){
        //             toast.success('Contact successfully', { position: 'top-right' });
        //         } else {
        //             toast.success('Contact deleted successfully', { position: 'top-right' });
        //         }
        //         setContacts(conDetails.filter(contact => contact.email !== email));
        //     }
        // } catch (err) {
        //     toast.error('Failed to delete contact.', { position: 'top-right' });
        // }
    };

    // State CarBooks:-
    const [carbooks, setCarBooks] = useState([]);
    useEffect(() => {
        const fetchCarBooks = async () => {
            try {
                const response = await axios.get('http://localhost:4000/carbookdetails');
                if (response.data.success) {
                    setCarBooks(response.data.data);

                } else {
                    toast.error("Any", { position: 'top-right' });
                }
            } catch (err) {
                console.error(err);
                toast.error('Failed to load carbook details.', { position: 'top-right' });
            }
        };
        fetchCarBooks();
    }, []);

    // delete or complete carbooks:-
    const deleteCarBooks = (id) => {
        console.log("delete Carbboks");
    }

    // formate change of pickup time:-
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'Asia/Kolkata',
        });
    };

    // State for Orders
    const [orderDetails, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:4000/orderdetails');
                if (response.data.success) {
                    setOrders(response.data.data);
                } else {
                    toast.error(response.data.message, { position: 'top-right' });
                }
            } catch (err) {
                console.error(err);
                toast.error('Failed to load order details.', { position: 'top-right' });
            }
        };
        fetchOrders();
    }, []);


    // handle all items and price of all:
    function getItemById(id) {
        const item = Allproducts.find(item => item.id === id);
        if (!item) {
            return null;
        }

        return { name: item.name + " || " + item.catagori, price: item.new_price };
    }

    // handle order to items:-

    const orderItem = (data) => {
        if (!data || data.length === 0) {
            return;
        }
        let s = "";
        let tPrice = 0;
        data.forEach((i) => {
            const { name, price } = getItemById(i.itemId);
            s += `${name}; `;
            tPrice +=price * i.quantity;
        });
        return {name:s, tPrice};
    }

    // Delete Order
    const deleteOrder = async (id) => {
        console.log("delete order");
        // try {
        //     const response = await axios.delete(`http://localhost:4000/orderdetails/${id}`);
        //     if (response.data.success) {
        //         toast.success('Order deleted successfully', { position: 'top-right' });
        //         setOrders(orderDetails.filter(order => order._id !== id));
        //     }
        // } catch (err) {
        //     toast.error('Failed to delete order.', { position: 'top-right' });
        // }
    };

    return (
        <div className='admin'>

            {/* Admin Details */}
            <div className="admin-detail">
                <div className="img-side">
                    <div className="img">
                        <img src={img} alt="user" />
                    </div>
                </div>
                <div className="details-side">
                    <h2>Hey, Admin <img src={Hi} alt="wave" /></h2>
                    <ul>
                        <li><h3>Name :</h3> {username}</li>
                        <li><h3>Mobile number :</h3> {number}</li>
                        <li><h3>Email :</h3> {email}</li>
                    </ul>
                </div>
            </div>
            <div className='table-section'> 
                {/* Contact Details */}
                <div className="contact-details">
                    <h2 className='t-heading'>Contacts:</h2>
                    <table className='table'>
                        <thead>
                            <tr className='t-row'>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile No.</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conDetails.length > 0 ? (
                                conDetails.map((contact) => (
                                    <tr key={contact._id}>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.mobile}</td>
                                        <td>{contact.message}</td>
                                        <td className='buttons-cell'>
                                            <button id='delete' className='action-button' onClick={() => deleteContact(contact.email, false)}>
                                                <img src={Cross} alt="Delete" />
                                            </button>
                                            <button id='complete' className='action-button' onClick={() => deleteContact(contact.email, true)}>
                                                <img src={Correct} alt="right" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No contacts available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Order Details */}
                <div className="order-details">
                    <h2 className='t-heading'>Orders:</h2>
                    <table className='table'>
                        <thead>
                            <tr className='t-row'>
                                <th>User Name</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile No.</th>
                                <th>Items</th>
                                <th>Total price</th>
                                <th>Address</th>
                                <th>Landmark</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.length > 0 ? (
                                orderDetails.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order.username}</td>
                                        <td>{order.name}</td>
                                        <td>{order.email}</td>
                                        <td>{order.mobile}</td>
                                        <td>{orderItem(order.items).name}</td>
                                        <td>{orderItem(order.items).tPrice.toFixed(2)}</td>
                                        <td>{order.address}</td>
                                        <td>{order.landmark}</td>
                                        <td>{formatDate(order.orderDate)}</td>
                                        <td className='buttons-cell'>
                                            <button id='delete' className='action-button' onClick={() => deleteOrder(order._id,false)}>
                                                <img src={Cross} alt="Delete" />
                                            </button>
                                            <button id='complete' className='action-button' onClick={() => deleteOrder(order._id,true)}>
                                                <img src={Correct} alt="right"/></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>No orders available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* CarBooks Handle */}
                <div className="carbook-details">
                    <h2 className='t-heading'>Car Bookings:</h2>
                    <table className='table'>
                        <thead>
                            <tr className='t-row'>
                                <th>Name</th>
                                <th>Pickup Place</th>
                                <th>Destination Place</th>
                                <th>Mobile No.</th>
                                <th>Date of Pickup</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {carbooks.length > 0 ? (
                                carbooks.map((carb) => (
                                    <tr key={carb._id}>
                                        <td>{carb.name}</td>
                                        <td>{carb.pickUpPlace}</td>
                                        <td>{carb.destinationPlace}</td>
                                        <td>{carb.mobile}</td>
                                        <td>{formatDate(carb.dateOfPickup)}</td>
                                        <td className='buttons-cell'>
                                            <button id='delete' className='action-button' onClick={() => deleteCarBooks(carb._id, false)}>
                                                <img src={Cross} alt="Delete" />
                                            </button>
                                            <button id='complete' className='action-button' onClick={() => deleteCarBooks(carb._id, true)}>
                                                <img src={Correct} alt="right" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No Car booked</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;

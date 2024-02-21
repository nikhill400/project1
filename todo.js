import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './todo.css';

function Todo() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ Name: '', Email: '', PhoneNumber: '' });
    const [updateItem, setUpdateItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Fetch data from your API endpoint
        axios.get('http://localhost:3000/api/dataget')
            .then(response => {
                setItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const validationSchema = Yup.object().shape({
        Name: Yup.string().required('Name is required'),
        Email: Yup.string().email('Invalid email').required('Email is required'),
        PhoneNumber: Yup.string()
            .matches(/^\d{10}$/, 'Phone number must contain only numeric digits')
            .required('Phone number is required'),
    });
    


    


    
    const handleUpdateItem = (id) => {
        const itemToUpdate = items.find(item => item._id === id);
        setUpdateItem(itemToUpdate);
    };

    const handleSaveItem = () => {
        if (updateItem) {
            axios.put(`http://localhost:3000/api/dataupdate/${updateItem._id}`, updateItem)
                .then(response => {
                    const updatedItems = items.map(item => (item._id === updateItem._id ? response.data : item));
                    setItems(updatedItems);
                    setUpdateItem(null);
                })
                .catch(error => {
                    console.error('Error updating item:', error);
                });
        }
    };





    const handleDeleteItem = (id) => {
        axios.delete(`http://localhost:3000/api/datadelete/${id}`)
            .then(() => {
                const updatedItems = items.filter(item => item._id !== id);
                setItems(updatedItems);
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };

    return (
        <div>
            <Card className='card1'>
                <Card.Header>ToDoList</Card.Header>
                <Card.Body>
                    <Formik
                        initialValues={newItem}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => handleSaveItem(values, actions)}
                    >
                        
                        <Form>
                            <Field
                                type="text"
                                name="Name"
                                placeholder="Name"
                                className='f1'
                            />
                            <ErrorMessage name="Name" component="div" className="error-message" />

                            <Field
                                type="email"
                                name="Email"
                                placeholder="Email"
                                className='f2'
                            />
                            <ErrorMessage name="Email" component="div" className="error-message" />

                            <Field
                                type="tel"
                                name="PhoneNumber"
                                placeholder="Phone Number"
                                className='f3'
                            />
                            <ErrorMessage name="PhoneNumber" component="div" className="error-message" />

                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                           
                        </Form>
                    </Formik>
                </Card.Body>
               
            </Card>

            <div></div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Row>
                    {items.map(item => (
                        <Col key={item._id}>
                            <Card border="primary" style={{ width: '18rem' }}>
                                <Card.Header>Details</Card.Header>
                                <Card.Body>
                                    <Card.Text>

                                        <div className='font'>Name-{item.Name}</div>


                                        <div className='font'>Email-{item.Email}</div>


                                        <div className='font'>PhoneNumber-{item.PhoneNumber}</div>


                                        <Row>
                                            <Col>
                                                <Button className='b1' onClick={() => handleUpdateItem(item._id)}>Update</Button>
                                            </Col>
                                            <Col>
                                                <Button className='b2' onClick={() => handleDeleteItem(item._id)}>Delete</Button>
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Update form */}
            {updateItem && (
                <div>
                    <h2>Update Item</h2>
                    <Formik
                        initialValues={updateItem}
                        validationSchema={validationSchema}
                        onSubmit={(values) =>handleUpdateItem(values)}
                    >
                        <Form>
                            <Field
                                type="text"
                                name="Name"
                                placeholder="Name"
                            />
                            <ErrorMessage name="Name" component="div" className="error-message" />

                            <Field
                                type="email"
                                name="Email"
                                placeholder="Email"
                            />
                            <ErrorMessage name="Email" component="div" className="error-message" />

                            <Field
                                type="tel"
                                name="PhoneNumber"
                                placeholder="Phone Number"
                            />
                            <ErrorMessage name="PhoneNumber" component="div" className="error-message" />

                            <Button variant="primary" type="submit">
                                Save Update
                            </Button>
                        </Form>
                    </Formik>
                </div>
            )}
        </div>
    );
}

export default Todo;

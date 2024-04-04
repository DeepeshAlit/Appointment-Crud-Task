import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ItemModal = ({ show, handleClose, handleSave, selectedItem,item,setItem,handleChange,itemError }) => {
    
    const[error,setError]= useState({
        item: false
    })

    useEffect(() => {
        console.log("selectedItem",selectedItem)
        if (selectedItem) {
            setItem({...item,itemName:selectedItem.ItemName});
        }
    }, [selectedItem]);
   

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedItem ? 'Edit' : 'Add'} Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="itemName">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control type="text" value={item.itemName} onChange={handleChange} name='itemName'/>
                        <p style={{ fontSize: "x-small", color: "red" }}>{itemError.itemName ? "Please Enter Item Name" : ""}</p>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>{selectedItem ? 'Update' : 'Save'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ItemModal;
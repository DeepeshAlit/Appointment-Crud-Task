import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ItemModal = ({ show, handleClose, handleSave, selectedItem, item, setItem, handleChange, itemError, darkMode,duplicateError }) => {
    useEffect(() => {
        if (selectedItem) {
            setItem({...item, itemName: selectedItem.ItemName});
        }
    }, [selectedItem]);

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
                <Modal.Title>{selectedItem ? 'Edit' : 'Add'} Item</Modal.Title>
            </Modal.Header>
            <Modal.Body className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
                <Form>
                    <Form.Group controlId="itemName">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control type="text" value={item.itemName} onChange={handleChange} name='itemName' className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}/>
                        <p style={{ fontSize: "x-small", color: "red" }}>{itemError.itemName ? "Please Enter Item Name" : ""}</p>
                        <p style={{ fontSize: "x-small", color: "red" }}>{duplicateError ? "This Item Already Exist" : ""}</p>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>{selectedItem ? 'Update' : 'Save'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ItemModal;

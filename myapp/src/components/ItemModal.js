import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ItemModal = ({ show, handleClose, handleSave, item }) => {
    const [itemName, setItemName] = useState('');
    const[error,setError]= useState({
        item: false
    })

    useEffect(() => {
        if (item) {
            setItemName(item.ItemName);
        }
    }, [item]);

    const handleInputChange = (e) => {
        setItemName(e.target.value);
        setError({...error,item:false})
    };

   

    const handleSaveItem = () => {
        if(itemName){
        handleSave(itemName,item);
        setItemName('')
        }
        else{
            setError({...error,item:true})
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{item ? 'Edit' : 'Add'} Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="itemName">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control type="text" value={itemName} onChange={handleInputChange} />
                        {error.item ? "Item is empty":""}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSaveItem}>{item ? 'Update' : 'Save'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ItemModal;
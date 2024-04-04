import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ItemModal from './ItemModal';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ItemList = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemsList, setItemsList] = useState([]);
    const initialData = {
        itemName: ""
    }
    const [item, setItem] = useState(initialData);
    const initialError = {
        itemName: false
    }
    const [itemError, setItemError] = useState(initialError)

    useEffect(()=>{
        if(!token){
            navigate('/')
        }
    },[])

    const getItemsList = async () => {
        try {
            const response = await axios.get('https://localhost:7137/api/Item/GetList', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data;
            setItemsList(data)
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }


    useEffect(() => {
        getItemsList();
    }, [])

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
        setItemError(initialData)
        setItem(initialData)
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const validateItem = () => {
        debugger
        let hasError = false;
        const newErrors = {};

        for (const key in item) {
            if (!item[key]) {
                newErrors[key] = true;
                hasError = true;
            } else {
                newErrors[key] = false;
            }
        }

        setItemError(newErrors);

        return hasError;
    };

    const handleSave = async () => {
        debugger
        if (validateItem()) {
            return;
        }
        if (selectedItem) {
            const updatedItemData = {
                itemID: selectedItem.ItemID,
                itemName: item.itemName
            };

            try {

                const response = await axios.put(`https://localhost:7137/api/Item/Update/`, updatedItemData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                handleCloseModal();
                getItemsList();
            } catch (error) {
                console.error('Error updating item:', error.message);
                throw error;
            }
        } else {
            // Add new item
            const newItem = { ItemName: item.itemName };
            try {

                const response = await axios.post('https://localhost:7137/api/Item/Insert', newItem, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                getItemsList();
                console.log('Item inserted successfully');
            } catch (error) {
                console.error('Error inserting item:', error.message);
            }
        }
        handleCloseModal();
    };



    const handleEditClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (itemId) => {
        console.log("ItemID", itemId)
        try {
            const response = await axios.delete(`https://localhost:7137/api/Item/Delete/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            getItemsList();
        } catch (error) {
            console.error('Error deleting item:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prevState => ({
            ...prevState,
            [name]: value
        }));
        setItemError({
            ...itemError, [name]: false
        })
    };


    return (
        <div className="container" style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Item List</h3>
                <Button variant="primary" onClick={handleAddClick}>Add</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Item Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsList.map((item, index) => (
                        <tr key={item.ItemID}>
                            <td>{index + 1}</td>
                            <td>{item.ItemName}</td>
                            <td className="d-flex">
                                <Button className="mx-2" variant="info" onClick={() => handleEditClick(item)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteClick(item.ItemID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ItemModal
                show={isModalOpen}
                handleClose={handleCloseModal}
                handleSave={handleSave}
                selectedItem={selectedItem}
                item={item}
                setItem={setItem}
                handleChange={handleChange}
                itemError={itemError}

            />
        </div>
    );
};

export default ItemList;
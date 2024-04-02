import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ItemModal from './ItemModal';
import axios from "axios";

const ItemList = () => {
    const token = localStorage.getItem("token");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState([]);
    

    const getItemsList = async () => {
        try {
            const response = await axios.get('https://localhost:7137/api/Item/GetList', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data;
            setItems(data)
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
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    // const checkDuplicate=async(itemName)=>{
    //     console.log("Duplicate",itemName)
    //     try {
    //         const response = await axios.get(`https://localhost:7137/api/Item/CheckDuplicateItemName/${itemName}`, {
    //           headers: {
    //             Authorization: `Bearer ${token}`
    //           }
    //         });
    //         const isDuplicate = response;
    //         console.log(`Item nam`,isDuplicate);
    //       } catch (error) {
    //         console.error('Error checking duplicate item name:', error.message);
    //       }
    // }

    const handleSave = async (itemName, item) => {
        if (selectedItem) {
            const updatedItemData = {
                itemID: item.ItemID,
                itemName: itemName
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
            const newItem = { ItemName: itemName };
            // checkDuplicate(itemName)
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

    return (
        <div className="container" style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Item List</h3>
                <Button variant="primary" onClick={handleAddClick}>Add</Button>
            </div>
            <table className="container text-center">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Item Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
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
            </table>
            <ItemModal
                show={isModalOpen}
                handleClose={handleCloseModal}
                handleSave={handleSave}
                item={selectedItem}
            />
        </div>
    );
};

export default ItemList;
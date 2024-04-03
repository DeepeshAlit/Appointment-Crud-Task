// ReceiptList.js
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ReceiptModal from './ReceiptModal';
import axios from 'axios';

const ReceiptList = () => {
  const token = localStorage.getItem("token");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [receipts, setReceipts] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    const [receiptData, setReceiptData] = useState({
      receiptID: 0,
      receiptNo: 0,
      personName:"",
      receiptDate: "2024-04-03T12:47:38.383Z",
      doctorID: 0,
      netAmount: 0,
      remarks: "",
      receiptDetail: [
        {
          receiptDetailID: 0,
          receiptID: 0,
          itemID: 0,
          quantity: 0,
          rate: 0,
          discount: 0,
          amount: 0,
          itemName:'',
          unit:'',
          grossAmount:null,
          discountPercent:null,
        }
      ]
    });



    const fetchReceiptList=async()=>{
      try {
        const response = await axios.get('https://localhost:7137/api/Receipt/GetList', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const receiptList = response.data;
        setReceipts(receiptList)
        console.log('Receipt list:', receiptList);
      } catch (error) {
        console.error('Error fetching receipt list:', error.message);
      }
    }


    useEffect(()=>{
      fetchReceiptList();
    },[])

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedReceipt(null);
    };

    const handleAddClick = () => {
        setSelectedReceipt(null); // Clear selected receipt
        setIsModalOpen(true);
    };

    const handleSave = (updatedReceipt) => {
      // console.log('updatedReceipt', billData);
      // setReceipts({...receipts,billData})
        // if (updatedReceipt.id) {
        //     // Update existing receipt
        //     const updatedReceipts = receipts.map(item =>
        //         item.id === updatedReceipt.id ? updatedReceipt : item
        //     );
        //     setReceipts(updatedReceipts);
        // } else {
        //     // Add new receipt
        //     setReceipts([...receipts, { ...updatedReceipt, id: new Date().getTime() }]);
        // }
        console.log("dataAdd",receiptData)
        handleCloseModal();
    };

    const handleEditClick = (receipt) => {
        setSelectedReceipt(receipt);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        const updatedReceipts = receipts.filter(item => item.id !== id);
        setReceipts(updatedReceipts);
    };

    const handleDateChange = (value) => {
      setReceiptData({ ...receiptData, receiptDate: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setReceiptData(prevState => ({
        ...prevState,
        [name]: value
    }));
    // setPatientAppointmentError({
    //     ...patientAppointmentError, [name]: false
    // })
};
const handleItemChange = (e) => {
  const { name, value } = e.target;
  
  setReceiptData(prevState => ({
      ...prevState,
      receiptDetail: {
          ...prevState.receiptDetail,
          [name]: value
      }
  }));
};
    return (
        <div className="container" style={{ height: '100vh' }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Receipt List</h3>
                <Button variant="primary" onClick={handleAddClick}>
                    Add
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Receipt No</th>
                        <th>Receipt Date</th>
                        <th>Person Name</th>
                        <th>Total Qty</th>
                        <th>Net Amount</th>
                        <th>Remarks</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.ReceiptNo}</td>
                            <td>{item.ReceiptDate}</td>
                            <td>{item.personName}</td>
                            <td>{item.totalQty}</td>
                            <td>{item.NetAmount}</td>
                            <td>{item.remarks}</td>
                            <td className="d-flex">
                                <Button
                                    className="mx-2"
                                    variant="info"
                                    onClick={() => handleEditClick(item)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteClick(item.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ReceiptModal
                show={isModalOpen}
                handleClose={handleCloseModal}
                handleSave={handleSave}
                receipt={selectedReceipt} 
                receiptData={receiptData}
                setReceiptData={setReceiptData}
                handleDateChange={handleDateChange}
                handleChange={handleChange}
                handleItemChange={handleItemChange}
            />
        </div>
    );
};

export default ReceiptList;
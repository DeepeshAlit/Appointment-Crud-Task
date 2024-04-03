// ReceiptModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReceiptModal = ({ show, handleClose, handleSave, receipt, receiptData, handleDateChange, handleChange, handleItemChange, setReceiptData }) => {
    // const [totalAmount, setTotalAmount] = useState(0);
    // const [netAmount, setNetAmount] = useState(0);
    // const [items, setItems] = useState(receipt ? receipt.billItems : []);

    // useEffect(() => {
    //     if (receipt && receipt.totalDiscountAmount !== undefined) {
    //         const calculateTotalAmount = () => {
    //             const total = items.reduce((total, row) => total + row.amount, 0);
    //             setTotalAmount(total);
    //             setNetAmount(total - parseFloat(receipt.totalDiscountAmount));
    //         };
    //         calculateTotalAmount();
    //     }
    // }, [receipt, items]);

    const handleRowChange = (index, field, value) => {
        // const updatedItems = [...items];
        // updatedItems[index][field] = value;
        // setItems(updatedItems);
    };

    const handleAddRow = () => {
        setReceiptData(prevState => ({
            ...prevState,
            receiptDetail: [
                ...prevState.receiptDetail,
                {
                    receiptDetailID: 0,
                    receiptID: 0,
                    itemID: 0,
                    quantity: 0,
                    rate: 0,
                    discount: 0,
                    amount: 0,
                    itemName: '',
                    unit: '',
                    grossAmount: null,
                    discountPercent: null,
                }
            ]
        }));
    };

    // Calculate gross amount
    const calculateGrossAmount = (item) => {
        return item.quantity * item.rate;
    };

    // Calculate discount amount
    const calculateDiscountAmount = (item) => {
        return (item.quantity * item.rate * item.discountPercent) / 100;
    };

    // Calculate total amount
    const calculateAmount = (item) => {
        const grossAmount = calculateGrossAmount(item);
        const discountAmount = calculateDiscountAmount(item);
        const amnt =grossAmount - discountAmount;
         
        return grossAmount - discountAmount;
    };



    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Receipt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="receiptNo">
                        <Form.Label>Receipt No</Form.Label>
                        <Form.Control type="text" readOnly value={receiptData.receiptNo} name='receiptNo' />
                    </Form.Group>
                    <Form.Group controlId="formReceiptDate">
                        <Form.Label>Receipt Date</Form.Label>
                        <DatePicker
                            selected={receiptData.receiptDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                        />
                    </Form.Group>
                    <Form.Group controlId="personName">
                        <Form.Label>Person Name</Form.Label>
                        <Form.Control type="text" value={receiptData.personName} onChange={handleChange} name='personName' />
                    </Form.Group>
                    <Form.Group controlId="formItems" className=''>
                        <Form.Label>Items</Form.Label>
                        {receiptData.receiptDetail.map((item, index) => (
                            <div key={index}>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Item Name"
                                        value={receiptData.receiptDetail.itemName}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].itemName = e.target.value;
                                            setReceiptData({ ...receiptData, receiptDetail: updatedItems });
                                        }}
                                        name='itemName'
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Unit"
                                        value={receiptData.receiptDetail.unit}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].unit = e.target.value;
                                            setReceiptData({ ...receiptData, receiptDetail: updatedItems });
                                        }}
                                        name='unit'
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="rate"
                                        value={receiptData.receiptDetail.rate}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].rate = e.target.value;
                                            setReceiptData({ ...receiptData, receiptDetail: updatedItems });
                                        }}
                                        name='rate'
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="quantity"
                                        value={receiptData.receiptDetail.quantity}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].quantity = e.target.value;
                                            setReceiptData({ ...receiptData, receiptDetail: updatedItems });
                                        }}
                                        name='quantity'
                                    />
                                </Col>
                                <Col>
                                    {/* <Form.Control
                                        type="text"
                                        placeholder="Gross Amount"
                                        value={receiptData.receiptDetail.grossAmount}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].grossAmount = e.target.value; 
                                            setReceiptData({ ...receiptData, receiptDetail: updatedItems }); 
                                        }}
                                        name='grossAmount'
                                    /> */}
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            placeholder="Gross Amount"
                                            value={calculateGrossAmount(item)}
                                            disabled
                                            name='grossAmount'
                                        />
                                    </Col>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Discount %"
                                        value={receiptData.receiptDetail.discountPercent}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].discountPercent = e.target.value;
                                            setReceiptData({ ...receiptData, receiptDetail: updatedItems });
                                        }}
                                        name='discountPercent'
                                    />
                                </Col>
                                <Col>
                                    {/* <Form.Control
                                        type="text"
                                        placeholder="Discount Amount"
                                        value={receiptData.receiptDetail.discount}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].discount = e.target.value;
                                            setReceiptData({ ...receiptData, receiptDetail: updatedItems });
                                        }}
                                        name='discount'
                                    /> */}
                                    <Form.Control
                                        type="number"
                                        placeholder="Discount Amount"
                                        value={calculateDiscountAmount(item)}
                                        disabled
                                        name='discount'
                                    />
                                </Col>
                                <Col>
                                    {/* <Form.Control
                                        type="text"
                                        placeholder="Amount"
                                        value={receiptData.receiptDetail.amount}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].amount = e.target.value;
                                            setReceiptData({ ...receiptData, receiptDetail: updatedItems });
                                        }}
                                        name='amount'
                                    /> */}
                                    <Form.Control
                                        type="number"
                                        placeholder="Amount"
                                        value={calculateAmount(item)}
                                        disabled
                                        name='amount'
                                    />
                                </Col>

                            </div>
                        ))}
                        <Button variant="primary" onClick={handleAddRow}>
                            Add Item
                        </Button>
                    </Form.Group>
                    <Form.Group controlId="formTotalQty">
                        <Form.Label>Total Qty</Form.Label>
                        <Form.Control type="number" value={receipt ? receipt.totalQty : 0} onChange={(e) => handleSave({ ...receipt, totalQty: parseInt(e.target.value) })} />
                    </Form.Group>
                    <Form.Group controlId="formNetAmount">
                        <Form.Label>Net Amount</Form.Label>
                        <Form.Control type="number" value={receipt ? receipt.netAmount : 0} onChange={(e) => handleSave({ ...receipt, netAmount: parseFloat(e.target.value) })} />
                    </Form.Group>
                    <Form.Group controlId="remarks">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control type="text" value={receiptData.remarks} onChange={handleChange} name='remarks' />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSave(receipt)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReceiptModal;
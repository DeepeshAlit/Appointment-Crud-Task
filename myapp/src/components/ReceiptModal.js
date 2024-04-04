// ReceiptModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const ReceiptModal = ({
    show,
    handleClose,
    handleSave,
    selectedReceipt,
    receiptData,
    handleDateChange,
    handleChange,
    setReceiptData,
    itemList,
    receiptError,
    setReceiptError
}) => {

  

 
    const formattedItemOptions = itemList.map(item => ({
        label: item.ItemName,
        value: item.ItemID
    }));

    console.log("formateditem", formattedItemOptions)


    const dataDetail = selectedReceipt?.ReceiptDetail.map((item) => {
        console.log("item", item.Rate)
        return {
            receiptDetailID: item.ReceiptDetailID,
            receiptID: item.ReceiptID,
            itemID: item.ItemID,
            quantity: item.Quantity,
            rate: item.Rate,
            discount: item.Discount,
            amount: item.Amount,
            itemName: "",
            unit: "",
            grossAmount: 0,
            discountPercent: 0,
        };
    })

    useEffect(() => {
        console.log("object", selectedReceipt)
        if (selectedReceipt) {
            setReceiptData({
                ...receiptData,
                receiptNo: selectedReceipt.ReceiptNo,
                personName: "",
                receiptDate: selectedReceipt.ReceiptDate,
                doctorID: selectedReceipt.DoctorID,
                netAmount: selectedReceipt.NetAmount,
                remarks: selectedReceipt.Remarks,
                receiptDetail: dataDetail
            });
        }
        console.log("received", receiptData.receiptDetail)
    }, [selectedReceipt]);

    const handleAddRow = () => {
        setReceiptData((prevState) => ({
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
                    itemName: "",
                    unit: "",
                    grossAmount: null,
                    discountPercent: null,
                },
            ],
        }));
    };

    // Calculate gross amount
    const calculateGrossAmount = (item) => {
        return item.quantity * item.rate;
    };

    // Calculate discount amount
    const calculateDiscountAmount = (item) => {
        console.log("calculated value", item)
        return (item.quantity * item.rate * item.discountPercent) / 100;
    };

    // Calculate total amount
    const calculateAmount = (item) => {
        const grossAmount = calculateGrossAmount(item);
        const discountAmount = calculateDiscountAmount(item);
        const amnt = grossAmount - discountAmount;
        item["amount"] = amnt;
        return grossAmount - discountAmount;
    };
    const totalAmount = receiptData.receiptDetail.reduce(
        (total, detail) => total + detail.amount,
        0
    );
    useEffect(() => {
        setReceiptData({
            ...receiptData,
            netAmount: totalAmount,
        });
    }, [totalAmount]);

    const totalQuantity = receiptData.receiptDetail.reduce(
        (total, detail) => total + parseInt(detail.quantity),
        0
    );

    const handleItemChange = (selectedItem, index, item) => {
        console.log("selectedItem", selectedItem, index, item);
        const updatedItems = [...receiptData.receiptDetail];
        updatedItems[index].itemID = selectedItem.value;
        setReceiptData({
            ...receiptData,
            receiptDetail: updatedItems,
        });
        item["itemID"] = selectedItem.value;
        setReceiptError({...receiptError,receiptDetail:false})
    };



    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Receipt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="receiptNo">
                        <Form.Label>Receipt No</Form.Label>
                        <Form.Control
                            type="text"
                            readOnly
                            value={receiptData.receiptNo}
                            name="receiptNo"
                        />
                    </Form.Group>
                    <Form.Group controlId="formReceiptDate" >
                        <Form.Label>Receipt Date</Form.Label>
                        <DatePicker className="mt-3 rounded border mx-2"
                            selected={receiptData.receiptDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                        />
                        <p style={{ fontSize: "x-small", color: "red" }}>{receiptError.receiptDate ? "Please Select Date" : ""}</p>

                    </Form.Group>
                    <Form.Group controlId="personName">
                        <Form.Label>Person Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={receiptData.personName}
                            onChange={handleChange}
                            name="personName"
                        />
                        <p style={{ fontSize: "x-small", color: "red" }}>{receiptError.personName ? "Please Enter Person Name" : ""}</p>

                    </Form.Group>
                    <Form.Group controlId="formItems" className="">
                        <Form.Label>Items</Form.Label>
                        {receiptData.receiptDetail.map((item, index) => (
                            <div key={index} className="d-flex gap-1">
                                {console.log("12344", item)}

                                <Col>
                                    <Form.Group controlId="itemName">
                                        <Select
                                            options={formattedItemOptions}
                                            value={
                                                formattedItemOptions &&
                                                formattedItemOptions.find(
                                                    option => option.value === (item.itemID)
                                                )
                                            }
                                            onChange={(selectedItem) => handleItemChange(selectedItem, index, item)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Unit"
                                        value={item.unit}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].unit = e.target.value;
                                            setReceiptData({
                                                ...receiptData,
                                                receiptDetail: updatedItems,
                                            });
                                            setReceiptError({...receiptError,receiptDetail:false})
                                        }}
                                        name="unit"
                                    />
                                </Col>
                                <Col>
                                    {console.log("adfgh", receiptData.receiptDetail[0].rate)}
                                    <Form.Control
                                        type="text"
                                        placeholder="rate"
                                        value={item.rate}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].rate = e.target.value;
                                            setReceiptData({
                                                ...receiptData,
                                                receiptDetail: updatedItems,
                                            });
                                            setReceiptError({...receiptError,receiptDetail:false})
                                        }}
                                        name="rate"
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="quantity"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].quantity = e.target.value;
                                            setReceiptData({
                                                ...receiptData,
                                                receiptDetail: updatedItems,
                                            });
                                            setReceiptError({...receiptError,receiptDetail:false})
                                        }}
                                        name="quantity"
                                    />
                                </Col>
                                <Col>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            placeholder="Gross Amount"
                                            value={calculateGrossAmount(item)}
                                            disabled
                                            name="grossAmount"
                                        />
                                    </Col>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        placeholder="Discount %"
                                        value={item.discountPercent}
                                        onChange={(e) => {
                                            const updatedItems = [...receiptData.receiptDetail];
                                            updatedItems[index].discountPercent = e.target.value;
                                            setReceiptData({
                                                ...receiptData,
                                                receiptDetail: updatedItems,
                                            });
                                            setReceiptError({...receiptError,receiptDetail:false})
                                        }}
                                        name="discountPercent"
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="number"
                                        placeholder="Discount Amount"
                                        value={calculateDiscountAmount(item)}
                                        disabled
                                        name="discount"
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="number"
                                        placeholder="Amount"
                                        value={calculateAmount(item)}
                                        disabled
                                        name="amount"
                                    />
                                </Col>
                            </div>
                        ))}
                                <p style={{ fontSize: "x-small", color: "red" }}>{receiptError.receiptDetail ? "Please Provide Item Details" : ""}</p>

                        <Button variant="primary" onClick={handleAddRow}>
                            Add Item
                        </Button>
                    </Form.Group>
                    <Form.Group controlId="formTotalQty">
                        <Form.Label>Total Qty</Form.Label>
                        <Form.Control type="number" value={totalQuantity} disabled />
                    </Form.Group>
                    <Form.Group controlId="formNetAmount">
                        <Form.Label>Net Amount</Form.Label>
                        <Form.Control
                            type="number"
                            value={receiptData.netAmount}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group controlId="remarks">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control
                            type="text"
                            value={receiptData.remarks}
                            onChange={handleChange}
                            name="remarks"
                        />
                        <p style={{ fontSize: "x-small", color: "red" }}>{receiptError.remarks ? "Please Enter Remark" : ""}</p>

                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReceiptModal;
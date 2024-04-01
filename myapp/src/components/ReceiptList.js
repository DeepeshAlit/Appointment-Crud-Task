import React, { useState } from 'react'
import { Modal, Button, Form,Row,Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const ReceiptList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [items,setItems] = useState([]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };
    const handleAddRow = () => {
        setItems( [...items, { descr: "", rate: 0, qty: 0, amount: 0 }])
          
    
      };

    const handleSave = () => {

        setIsModalOpen(false);
    };

    return (
        <div className="container " style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Receipt List</h3>
                <Button variant="primary" onClick={handleAddClick} >
                    Add
                </Button>
            </div>

            <table className="container text-center">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Receipt No</th>
                        <th>Receipt Date</th>
                        <th>Person Name</th>
                        <th>Total Qty</th>
                        <th>Net Amount</th>
                        <th>Remarks</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* {bills?.map((bill) => (
<tr key={bill?.primaryKeyID}>
  <td>{bill?.primaryKeyID}</td>
  <td>{bill?.billNo}</td>
  <td>{bill?.billDate.substr(0,10)}</td>
  <td>{bill?.customerName}</td>
  <td>{bill?.netAmount}</td>
  <td>{bill?.remarks && bill.remarks.replace(/<[^>]*>/g, '').substring(0, 50)}</td>
  <td className="d-flex">
    <Button className="mx-2" variant="info" onClick={() => handleEditClick(bill.billID)}>
      Edit
    </Button>
    <Button
      variant="danger"
      onClick={() => handleDeleteClick(bill.billID)}
    >
      Delete
    </Button>
  </td>
</tr>
))} */}
                </tbody>
            </table>

            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Receipt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div>
                            <Form.Group controlId="formBillNumber">
                                <Form.Label>Receipt No</Form.Label>
                                <Form.Control type="text" readOnly />
                            </Form.Group>
                            <Form.Group controlId="formBillDate">
                                <Form.Label>Bill Date</Form.Label>
                                <DatePicker
                                    // selected={new Date(billData.billDate)}
                                    // onChange={(date) =>
                                    //     setBillData({
                                    //         ...billData,
                                    //         billDate: date.toLocaleDateString("en-CA"),
                                    //     })
                                    // }
                                />
                            </Form.Group>
                            <Form.Group controlId="formBillNumber">
                                <Form.Label>Person Name</Form.Label>
                                <Form.Control type="text" readOnly />
                            </Form.Group>
                        </div>
                        <div>
                        <Form.Group controlId="formRows">
          {items.map((row, index) => (
            <Row key={index}>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={row.descr}
                //   onChange={(e) => handleRowChange(index, "descr", e.target.value)}
                  name={`descr_${index}`}
                  id={`descr_${index}`}
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Rate"
                  value={row.rate}
                //   onChange={(e) => handleRowChange(index, "rate", parseFloat(e.target.value))}
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Qty"
                  value={row.qty}
                //   onChange={(e) => handleRowChange(index, "qty", parseFloat(e.target.value))}
                />
              </Col>
              <Col>
                <Form.Control type="text" readOnly value={row.amount.toFixed(2)} />
              </Col>
            </Row>
          ))}
          <Button variant="primary" onClick={handleAddRow}>
            Add Row
          </Button>
        </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ReceiptList
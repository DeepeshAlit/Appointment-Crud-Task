import React, { useState } from 'react'
import { Modal, Button,Form } from 'react-bootstrap';


const SpecialtyList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [specialtyName, setSpecialtyName] = useState('');
    const [description, setDescription] = useState('');

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleSave = () => {

        setIsModalOpen(false);
    };

    return (
        <div className="container " style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Specialty List</h3>
                <Button variant="primary" onClick={handleAddClick} >
                    Add
                </Button>
            </div>

            <table className="container text-center">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Specialty Name  </th>
                        <th>Description</th>
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
                    <Modal.Title> Specialty Master</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="specialtyName">
                            <Form.Label>Specialty Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={specialtyName}
                                onChange={(e) => setSpecialtyName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Education</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
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

export default SpecialtyList
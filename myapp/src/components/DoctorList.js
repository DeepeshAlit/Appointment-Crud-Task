import { Button, Form, Modal } from 'react-bootstrap'
import React, { useState } from 'react'

const DoctorList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [doctorName, setDoctorName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [education, setEducation] = useState('');

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveDoctor = () => {
        console.log('Doctor Name:', doctorName);
        console.log('Specialty:', specialty);
        console.log('Education:', education);
        setIsModalOpen(false);
    };

    return (
        <div className="container " style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Doctor List</h3>
                <Button variant="primary" onClick={handleAddClick}>
                    Add
                </Button>
            </div>

            <table className="container text-center">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Doctor Name</th>
                        <th>Specialty</th>
                        <th>Education</th>
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
                    <Modal.Title>Add Doctor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="doctorName">
                            <Form.Label>Doctor Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={doctorName}
                                onChange={(e) => setDoctorName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="specialty">
                            <Form.Label>Specialty</Form.Label>
                            <Form.Control as="select" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                                <option value="">Select Specialty</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Dermatology">Dermatology</option>
                                <option value="Endocrinology">Endocrinology</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="education">
                            <Form.Label>Education</Form.Label>
                            <Form.Control
                                type="text"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveDoctor}>
                        Save Doctor
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default DoctorList
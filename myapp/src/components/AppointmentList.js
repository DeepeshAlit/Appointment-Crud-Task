import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';


const AppointmentList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [gender, setGender] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [education, setEducation] = useState('');

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
                <h3>Appointment List</h3>
                <Button variant="primary" onClick={handleAddClick} >
                    Add
                </Button>
            </div>

            <table className="container text-center">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Appt No</th>
                        <th>Appt Date & Time</th>
                        <th>Patient Name</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Mobile</th>
                        <th>Reason For Appointment</th>
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
                    <Modal.Title>Appointment Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <div className='d-flex '>
                            <Form.Group controlId="itemName">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="itemName">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="itemName">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className='d-flex flex-wrap'>
                            <Form.Group controlId="itemName">
                                <Form.Label>Patient First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="itemName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="itemName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="itemName">
                                <Form.Label>DOB</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="mobile">
                                <Form.Label>Mobile No.</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="marital">
                                <Form.Label>Marital Status</Form.Label>
                                <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="reason">
                                <Form.Label>Reason For Appointment</Form.Label>
                                <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div>
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

export default AppointmentList
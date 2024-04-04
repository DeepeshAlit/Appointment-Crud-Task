import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SpecialtyModal = ({ show, handleClose, handleSave,selectedSpecialty, handleChange,speciality,errors,setErrors,setSpeciality,specialtyError }) => {
   useEffect(() => {
    if (selectedSpecialty) {
        setSpeciality({
            ...speciality,
            SpecialityName:selectedSpecialty.SpecialityName,
            Description:selectedSpecialty.Description
        })
    }
}, [selectedSpecialty]);
   
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedSpecialty ? 'Edit' : 'Add'} Specialty</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="SpecialityName">
                        <Form.Label>Specialty Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={speciality.SpecialityName}
                            onChange={handleChange}
                            name="SpecialityName"
                        />
                          <p style={{ fontSize: "x-small", color: "red" }}>{specialtyError.SpecialityName ? "Please Enter Name" : ""}</p>
                    </Form.Group>
                    <Form.Group controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={speciality.Description}
                            onChange={handleChange}
                            name="Description"
                        />
                        <p style={{ fontSize: "x-small", color: "red" }}>{specialtyError.Description ? "Please Enter Description" : ""}</p>
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

export default SpecialtyModal;
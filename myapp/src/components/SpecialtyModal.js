import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SpecialtyModal = ({ show, handleClose, handleSave,selectedSpecialty, handleChange,speciality,errors,setErrors }) => {
   console.log("specialityqwer",selectedSpecialty)
   
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
                            value={selectedSpecialty?selectedSpecialty.SpecialityName:speciality.SpecialityName}
                            onChange={handleChange}
                            name="SpecialityName"
                        />
                        {errors.SpecialityName?"Speciality is Empty":""}
                    </Form.Group>
                    <Form.Group controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={selectedSpecialty?selectedSpecialty.Description:speciality.Description}
                            onChange={handleChange}
                            name="Description"
                        />
                        {errors.Description?"Description is Empty":""}
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
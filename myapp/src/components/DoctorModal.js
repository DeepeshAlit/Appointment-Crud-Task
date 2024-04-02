
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DoctorModal = ({ show, handleClose, handleSave, selectedDoctor,  doctor, handleChange }) => {
console.log("SelectedDR",selectedDoctor)

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedDoctor ? 'Edit' : 'Add'} Doctor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="DoctorName">
                        <Form.Label>Doctor Name</Form.Label>
                        <Form.Control type="text" value={selectedDoctor?selectedDoctor?.DoctorName:doctor?.DoctorName} onChange={handleChange} name="DoctorName" />
                    </Form.Group>
                    <Form.Group controlId="SpecialityID">
                        <Form.Label>Specialty</Form.Label>
                        <Form.Control as="select" value={selectedDoctor?selectedDoctor?.SpecialityID:doctor?.SpecialityID} onChange={handleChange} name="SpecialityID">
                            <option value="">Select Specialty</option>
                            <option value={1}>Gynaecologist</option>
                            <option value={3}>Dermatology</option>
                            <option value={6}>Dietician</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="education">
                        <Form.Label>Education</Form.Label>
                        <Form.Control type="text" value={selectedDoctor?selectedDoctor?.Education:doctor?.Education} onChange={handleChange} name='Education' />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>{selectedDoctor ? 'Update' : 'Save'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DoctorModal;

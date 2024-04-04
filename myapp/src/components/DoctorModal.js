
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from "react-select";

const DoctorModal = ({ show, handleClose, handleSave, selectedDoctor,  doctor, handleChange,setDoctor,doctorError,specialtiesList,handleSpecialtyChange }) => {
console.log("SelectedDR",selectedDoctor)
console.log("Errors",doctorError)
console.log("Specialty List ",specialtiesList)


useEffect(() => {
    console.log("selectedDoctor",selectedDoctor)
    if (selectedDoctor) {
        setDoctor({
            ...doctor,
            DoctorName: selectedDoctor.DoctorName,
            SpecialityID: selectedDoctor.SpecialityID,
            Education:selectedDoctor.Education,
        })
    }
}, [selectedDoctor]);

const formattedSpecialtyOptions = specialtiesList.map(specialty => ({
    label: specialty.SpecialityName,
    value: specialty.SpecialityID
}));

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedDoctor ? 'Edit' : 'Add'} Doctor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="DoctorName">
                        <Form.Label>Doctor Name</Form.Label>
                        <Form.Control type="text" value={doctor?.DoctorName} onChange={handleChange} name="DoctorName" />
                        <p style={{ fontSize: "x-small", color: "red" }}>{doctorError.DoctorName ? "Please Enter Name" : ""}</p>
                    </Form.Group>
                    <Form.Group controlId="SpecialityID">
                        <Form.Label>Specialty</Form.Label>
                        <Select
                                options={formattedSpecialtyOptions}
                                value={
                                    formattedSpecialtyOptions &&
                                    formattedSpecialtyOptions.find(
                                        option => option.value === (doctor.SpecialityID)
                                    )
                                }
                                onChange={handleSpecialtyChange}
                            />
                        <p style={{ fontSize: "x-small", color: "red" }}>{doctorError.SpecialityID ? "Please Select Specialty" : ""}</p>
                    </Form.Group>
                    <Form.Group controlId="education">
                        <Form.Label>Education</Form.Label>
                        <Form.Control type="text" value={doctor?.Education} onChange={handleChange} name='Education' />
                        <p style={{ fontSize: "x-small", color: "red" }}>{doctorError.Education ? "Please Enter Eduction" : ""}</p>
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

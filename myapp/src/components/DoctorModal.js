
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from "react-select";

const DoctorModal = ({ show, handleClose, handleSave, selectedDoctor,  doctor, handleChange,setDoctor,doctorError,specialtiesList,handleSpecialtyChange ,darkMode,duplicateError}) => {

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

const customStyles = {
    control: provided => ({
        ...provided,
        backgroundColor: darkMode ? 'bg-dark' : 'bg-light', // Change background color based on darkMode

    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? (darkMode ? '#333' : '#007bff') : (darkMode ? '#000' : '#fff'),
        color: state.isSelected ? '#fff' : (darkMode ? '#fff' : '#000'),
    }),
    singleValue: provided => ({
        ...provided,
        color: darkMode ? '#fff' : '#000', // Change text color of the selected value based on darkMode
    }),
};

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'}>
                <Modal.Title>{selectedDoctor ? 'Edit' : 'Add'} Doctor</Modal.Title>
            </Modal.Header>
            <Modal.Body className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'}>
                <Form>
                    <Form.Group controlId="DoctorName">
                        <Form.Label>Doctor Name</Form.Label>
                        <Form.Control type="text" value={doctor?.DoctorName} onChange={handleChange} name="DoctorName" className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'}/>
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
                                styles={customStyles}
                            />
                        <p style={{ fontSize: "x-small", color: "red" }}>{doctorError.SpecialityID ? "Please Select Specialty" : ""}</p>
                    </Form.Group>
                    <Form.Group controlId="education">
                        <Form.Label>Education</Form.Label>
                        <Form.Control type="text" value={doctor?.Education} onChange={handleChange} name='Education' className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'} />
                        <p style={{ fontSize: "x-small", color: "red" }}>{doctorError.Education ? "Please Enter Eduction" : ""}</p>
                    </Form.Group>
                </Form>
                <p style={{ fontSize: "x-small", color: "red" }}>{duplicateError ? "Doctor Already Exists." : ""}</p>
            </Modal.Body>
            <Modal.Footer className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'} >
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>{selectedDoctor ? 'Update' : 'Save'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DoctorModal;

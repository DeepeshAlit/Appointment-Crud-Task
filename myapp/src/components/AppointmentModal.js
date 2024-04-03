import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Select from "react-select";
import moment from 'moment';


const AppointmentModal = ({ show, handleClose, handleSave, selectedAppointment, handleChange, patientAppointment, handleDateChange, handleDateTimeChange, doctorsList, handleDoctorChange, specialtiesList, handleSpecialtyChange, stateList, handleStateChange, cityList, handleCityChange, setPatientAppointment, patientAppointmentError }) => {

    useEffect(() => {
        if (selectedAppointment) {
            setPatientAppointment({
                ...patientAppointment,
                appointmentID: selectedAppointment.AppointmentID,
                appointmentDateTime: selectedAppointment.AppointmentDateTime,
                firstName: selectedAppointment.FirstName,
                lastName: selectedAppointment.LastName,
                fullName: selectedAppointment.FullName,
                dob: selectedAppointment.DOB,
                gender: selectedAppointment.Gender,
                mobileNo: selectedAppointment.MobileNo,
                maritalStatus: selectedAppointment.MaritalStatus,
                address: selectedAppointment.Address,
                stateID: selectedAppointment.StateID,
                cityID: selectedAppointment.CityID,
                reasonForAppointment: selectedAppointment.ReasonForAppointment,
                specialityID: selectedAppointment.SpecialityID,
                doctorID: selectedAppointment.DoctorID
            })
        }
    }, [selectedAppointment]);

    console.log("last", selectedAppointment)

    const formattedDoctorOptions = doctorsList.map(doctor => ({
        label: doctor.DoctorName,
        value: doctor.DoctorID
    }));
    const formattedSpecialtyOptions = specialtiesList.map(specialty => ({
        label: specialty.SpecialityName,
        value: specialty.SpecialityID
    }));
    const formattedStateOptions = stateList.map(state => ({
        label: state.StateName,
        value: state.StateID
    }));
    const formattedCityOptions = cityList.map(city => ({
        label: city.CityName,
        value: city.CityID
    }));



    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedAppointment ? 'Edit' : 'Add'} Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className='d-flex '>
                        {/* <Form.Group controlId="itemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </Form.Group> */}
                        <Form.Group controlId="appointmentDateTime">
                            <Form.Label>Appointment Date and Time</Form.Label>
                            <Datetime
                                value={moment(patientAppointment.appointmentDateTime)}
                                onChange={handleDateTimeChange}
                                inputProps={{ placeholder: 'Select Date and Time' }}
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.appointmentDateTime ? "Select Appointment Date & Time" : ""}</p>
                        </Form.Group>

                    </div>
                    <div className='d-flex flex-wrap align-items-end'>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={patientAppointment.firstName}
                                onChange={handleChange}
                                name='firstName'
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.firstName ? "Enter First Name" : ""}</p>

                        </Form.Group>
                        <Form.Group controlId="lastName" className='mx-auto'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={patientAppointment.lastName}
                                onChange={handleChange}
                                name='lastName'
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.lastName ? "Enter Last Name" : ""}</p>

                        </Form.Group>
                        <Form.Group controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={patientAppointment.fullName}
                                onChange={handleChange}
                                name='fullName'
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.fullName ? "Enter Full Name" : ""}</p>
                        </Form.Group>
                        <Form.Group controlId="dob" className='d-flex flex-column mx-auto'>
                            <Form.Label>Date of Birth</Form.Label>
                            <DatePicker
                                selected={patientAppointment.dob}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.dob ? "Enter DOB" : ""}</p>
                        </Form.Group>
                        <Form.Group controlId="gender" className='mx-auto'>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" value={patientAppointment.gender} onChange={handleChange} name='gender'>
                                <option value="">Select Gender</option>
                                <option value={0}>Male</option>
                                <option value={1}>Female</option>
                                <option value={2}>Others</option>

                            </Form.Control>
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.gender ? "Enter Gender " : ""}</p>
                        </Form.Group>
                        <Form.Group controlId="mobileNo">
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control
                                type="number"
                                value={patientAppointment.mobileNo}
                                onChange={handleChange}
                                name='mobileNo'
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.mobileNo ? "Enter Mobile Number" : ""}</p>
                        </Form.Group>
                        <Form.Group controlId="maritalStatus" className='mx-auto'>
                            <Form.Label>Marital Status</Form.Label>
                            <Form.Control as="select" value={patientAppointment.maritalStatus} onChange={handleChange} name='maritalStatus'>
                                <option value="">Select Status</option>
                                <option value={0}>Married</option>
                                <option value={1}>UnMarried</option>
                            </Form.Control>
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.maritalStatus ? "Select Marital Status" : ""}</p>
                        </Form.Group>
                        <Form.Group controlId="address" className='mx-auto'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={patientAppointment.address}
                                onChange={handleChange}
                                name='address'
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.address ? "Enter Address" : ""}</p>
                        </Form.Group>
                        <Form.Group controlId="stateID">
                            <Form.Label>State</Form.Label>
                            <Select
                                options={formattedStateOptions}
                                value={
                                    formattedStateOptions &&
                                    formattedStateOptions.find(
                                        option => option.value === (patientAppointment.stateID)
                                    )
                                }
                                onChange={handleStateChange}
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.stateID ? "Select State" : ""}</p>
                        </Form.Group>
                        <Form.Group controlId="cityID" className='mx-auto'>
                            <Form.Label>City</Form.Label>
                            <Select
                                options={formattedCityOptions}
                                value={
                                    formattedCityOptions &&
                                    formattedCityOptions.find(
                                        option => option.value === (patientAppointment.cityID)
                                    )
                                }
                                onChange={handleCityChange}
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.cityID ? "Select City" : ""}</p>
                        </Form.Group>
                        <Form.Group controlId="reasonForAppointment">
                            <Form.Label>Reason For Appointment</Form.Label>
                            <Form.Control
                                type="text"
                                value={patientAppointment.reasonForAppointment}
                                onChange={handleChange}
                                name='reasonForAppointment'
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.reasonForAppointment ? "Enter Reason For Appointment" : ""}</p>
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group controlId="doctorID">
                            <Form.Label>Doctor Name</Form.Label>
                            <Select
                                options={formattedDoctorOptions}
                                value={
                                    formattedDoctorOptions &&
                                    formattedDoctorOptions.find(
                                        option => option.value === (patientAppointment.doctorID)
                                    )
                                }
                                onChange={handleDoctorChange}
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.doctorID ? "Select Doctor" : ""}</p>
                        </Form.Group>
                        <Form.Group controlId="specialityID">
                            <Form.Label>Specialty</Form.Label>
                            <Select
                                options={formattedSpecialtyOptions}
                                value={
                                    formattedSpecialtyOptions &&
                                    formattedSpecialtyOptions.find(
                                        option => option.value === (patientAppointment.specialityID)
                                    )
                                }
                                onChange={handleSpecialtyChange}
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.specialityID ? "Select Specialty" : ""}</p>
                        </Form.Group>
                        {/* <Form.Group controlId="education">
                            <Form.Label>Education</Form.Label>
                            <Form.Control
                                type="text"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                            />
                        </Form.Group> */}
                    </div>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>{selectedAppointment ? 'Update' : 'Save'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AppointmentModal;
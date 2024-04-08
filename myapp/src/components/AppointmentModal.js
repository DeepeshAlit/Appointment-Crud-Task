import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Select from "react-select";
import moment from 'moment';

const AppointmentModal = ({ show, handleClose, handleSave, selectedAppointment, handleChange, patientAppointment, handleDateChange, handleDateTimeChange, doctorsList, handleDoctorChange, specialtiesList, handleSpecialtyChange, stateList, handleStateChange, cityList, handleCityChange, setPatientAppointment, patientAppointmentError, darkMode, mobileValid,handleGenderChange ,handleMaritalStatusChange}) => {

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
    console.log("last", patientAppointment)

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

    const genderOptions = [
        { value: 0, label: 'Male' },
        { value: 1, label: 'Female' },
        { value: 2, label: 'Others' }
    ]
    const maritalStatusOptions = [
        { value: 0, label: 'Married' },
        { value: 1, label: 'UnMarried' },
    ]
    const inputStyle = darkMode ? darkModeStyle : lightModeStyle;

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

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 10);


    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
                <Modal.Title>{selectedAppointment ? 'Edit' : 'Add'} Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'}>
                <Form>
                    <div >
                        <Form.Group controlId="appointmentDateTime"  >
                            <Form.Label>Appointment Date and Time</Form.Label>
                            <Datetime
                                value={moment(patientAppointment.appointmentDateTime)}
                                onChange={handleDateTimeChange}
                                inputProps={{ placeholder: 'Please select Date and Time', style: inputStyle }}
                                className={'bg-light  text-dark'}
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.appointmentDateTime ? "Please select Appointment Date & Time" : ""}</p>
                        </Form.Group>
                    </div>
                    <div >
                        <div className='d-flex gap-3'>
                            <Form.Group controlId="firstName" className='w-25'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={patientAppointment.firstName}
                                    onChange={handleChange}
                                    name='firstName'
                                    className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}
                                />
                                <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.firstName ? "Please Enter First Name" : ""}</p>
                            </Form.Group>
                            <Form.Group controlId="lastName" className='w-25'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={patientAppointment.lastName}
                                    onChange={handleChange}
                                    name='lastName'
                                    className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'}
                                />
                                <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.lastName ? "Please Enter Last Name" : ""}</p>
                            </Form.Group>
                            <Form.Group controlId="fullName" className='w-50'>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={patientAppointment.fullName}
                                    onChange={handleChange}
                                    name='fullName'
                                    className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'}
                                />
                                <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.fullName ? "Please Enter Full Name" : ""}</p>
                            </Form.Group>
                        </div>
                        <div className='d-flex gap-3'>
                            <Form.Group controlId="dob" className='d-flex flex-column w-25'>
                                <Form.Label>Date of Birth</Form.Label>
                                <DatePicker className={`rounded border w-100 p-2 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
                                    selected={patientAppointment.dob}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    maxDate={minDate}
                                />
                                <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.dob ? "Please Enter DOB" : ""}</p>
                            </Form.Group>
                            <Form.Group controlId="gender" className='ms-auto w-25' >
                                <Form.Label>Gender</Form.Label>
                                {/* <Form.Control as="select" value={patientAppointment.gender} onChange={handleChange} name='gender'  className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'}>
                                    <option value="">Select Gender</option>
                                    <option value={0}>Male</option>
                                    <option value={1}>Female</option>
                                    <option value={2}>Others</option>

                                </Form.Control> */}
                                <Select
                                    options={genderOptions}
                                    value={
                                        genderOptions &&
                                        genderOptions.find(
                                            option => option.value === (patientAppointment.gender)
                                        )
                                    }
                                    onChange={handleGenderChange}
                                    styles={customStyles}

                                />
                                <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.gender ? "Please Select Gender " : ""}</p>
                            </Form.Group>
                            <Form.Group controlId="mobileNo" className='ms-auto w-25' >
                                <Form.Label>Mobile No.</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={patientAppointment.mobileNo}
                                    onChange={handleChange}
                                    name='mobileNo'
                                    className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'}
                                />
                                {(patientAppointmentError.mobileNo) ? (<p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.mobileNo ? "Please Enter Mobile Number" : ""}</p>) :
                                    (<p style={{ fontSize: "x-small", color: "red" }}>{mobileValid ? "Please Enter 10 digit" : ""}</p>)}

                            </Form.Group>
                            <Form.Group controlId="maritalStatus" className='ms-auto w-25'>
                                <Form.Label>Marital Status</Form.Label>
                                {/* <Form.Control as="select" value={patientAppointment.maritalStatus} onChange={handleChange} name='maritalStatus' className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'}>
                                    <option value="">Select Status</option>
                                    <option value={0}>Married</option>
                                    <option value={1}>UnMarried</option>
                                </Form.Control> */}
                                 <Select
                                    options={maritalStatusOptions}
                                    value={
                                        maritalStatusOptions &&
                                        maritalStatusOptions.find(
                                            option => option.value === (patientAppointment.maritalStatus)
                                        )
                                    }
                                    onChange={handleMaritalStatusChange}
                                    styles={customStyles}

                                />
                                <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.maritalStatus ? "Please Select Marital Status" : ""}</p>
                            </Form.Group>
                        </div>
                        <div className='d-flex justify-content-between gap-3'>
                            <Form.Group controlId="address" className='w-50' >
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={patientAppointment.address}
                                    onChange={handleChange}
                                    name='address'
                                    className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'}
                                />
                                <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.address ? "Please Enter Address" : ""}</p>
                            </Form.Group>
                            <Form.Group controlId="stateID" className='w-25'>
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
                                    styles={customStyles}

                                />
                                <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.stateID ? "Please Select State" : ""}</p>
                            </Form.Group>
                            <Form.Group controlId="cityID" className='w-25'>
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
                                    styles={customStyles}
                                />
                                <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.cityID ? "Please Select City" : ""}</p>
                            </Form.Group>

                        </div>
                    </div>
                    <div>
                        <Form.Group controlId="reasonForAppointment">
                            <Form.Label>Reason For Appointment</Form.Label>
                            <Form.Control
                                type="text"
                                value={patientAppointment.reasonForAppointment}
                                onChange={handleChange}
                                name='reasonForAppointment'
                                className={darkMode ? 'bg-dark text-light ' : 'bg-light  text-dark'}
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.reasonForAppointment ? "Please Enter Reason For Appointment" : ""}</p>
                        </Form.Group>
                    </div>
                    <div className='d-flex justify-content-between gap-3'>
                    <Form.Group controlId="specialityID" className='w-50'>
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
                                styles={customStyles}
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.specialityID ? "Please Select Specialty" : ""}</p>
                        </Form.Group>
                        <Form.Group controlId="doctorID" className='w-50 '>
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
                                styles={customStyles}
                            />
                            <p style={{ fontSize: "x-small", color: "red" }}>{patientAppointmentError.doctorID ? "Please Select Doctor" : ""}</p>
                        </Form.Group>
                        
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>{selectedAppointment ? 'Update' : 'Save'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AppointmentModal;



const darkModeStyle = {
    backgroundColor: '#212529',
    color: '#fff',
};

const lightModeStyle = {
    backgroundColor: '#fff',
    color: '#333',
};
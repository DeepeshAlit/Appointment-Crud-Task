import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import DoctorModal from './DoctorModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const DoctorList = ({darkMode}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctorsList, setDoctorsList] = useState([]);
    const [specialtiesList, setSpecialtiesList] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteDoctorId, setDeleteDoctorId] = useState(null);
    const initialData = {
        DoctorName: "",
        SpecialityID: null,
        Education: "",
    }
    const [doctor, setDoctor] = useState(initialData);
    const initialErrors = {
        DoctorName: false,
        SpecialityID: false,
        Education: false,
    }
    const [doctorError, setDoctorError] = useState(initialErrors)
    const [inUseError,setInUseError] = useState(false)
    const [duplicateError,setDuplicateError] = useState(false)
    const deleteMessage = "Are you sure you want to delete this Doctor?"

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])

    const fetchDoctorList = async () => {
        try {
            const response = await axios.get('https://localhost:7137/api/Doctor/GetList', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const doctorList = response.data;
            setDoctorsList(doctorList)
            console.log('Doctor list:', doctorList);
        } catch (error) {
            console.error('Error fetching doctor list:', error.message);
        }
    }

    const fetchSpecialtyList = async () => {
        try {
            const response = await axios.get('https://localhost:7137/api/Speciality/GetList', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const specialities = response.data;
            setSpecialtiesList(specialities)
            console.log('Speciality list:', specialities);
        } catch (error) {
            console.error('Error fetching speciality list:', error.message);
        }
    }

    useEffect(() => {
        fetchDoctorList();
        fetchSpecialtyList();
    }, [])

    const handleAddClick = () => {
        setSelectedDoctor(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setDoctorError(initialErrors)
        setDoctor(initialData)
        setDuplicateError(false)
    };

    const validateDoctor = () => {
        debugger
        let hasError = false;
        const newErrors = {};
        for (const key in doctor) {
            if (!doctor[key]) {
                newErrors[key] = true;
                hasError = true;
            } else {
                newErrors[key] = false;
            }
        }
        setDoctorError(newErrors);
        return hasError;
    };

    const handleSaveDoctor = async () => {
        debugger
        if (validateDoctor()) {
            return;
        }
        if (selectedDoctor) {
            console.log("Selected Doctor", selectedDoctor)
            const updatedDoctorData = {
                doctorID: selectedDoctor.DoctorID,
                doctorName: doctor.DoctorName,
                specialityID: doctor.SpecialityID,
                education: doctor.Education
            }
            try {
                const response = await axios.put(`https://localhost:7137/api/Doctor/Update/`, updatedDoctorData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                fetchDoctorList();
                setDoctor(initialData)
                console.log('Doctor updated successfully:');
                setIsModalOpen(false);
            } catch (error) {
                console.error('Error updating doctor:', error.message);
            }

        } else {
            // Add New Doctor
            try {
                const data = {
                    doctorName: doctor?.DoctorName,
                    specialityID: doctor?.SpecialityID,
                    education: doctor?.Education
                }
                const response = await axios.post('https://localhost:7137/api/Doctor/Insert', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                fetchDoctorList();
                setDoctor(initialData)
                console.log('Doctor inserted successfully:');
                setIsModalOpen(false);
            } catch (error) {
                console.error('Error inserting doctor:', error.message);
                if (error.response.data.includes("Cannot accept duplicate doctor name") ){
                    setDuplicateError(true);
                }
            }
        }
        
    };

    const handleEditDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleDeleteDoctor = async (id) => {
        setDeleteDoctorId(id)
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        try {
            const response = await axios.delete(`https://localhost:7137/api/Doctor/Delete/${deleteDoctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchDoctorList();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting item:', error.message);
            if (error.response.data.includes("Selected record exists in Patients") ){
                setInUseError(true);
            }
        }
    };

    const handleChange = (e) => {
        debugger
        setDuplicateError(false)
        const { name, value } = e.target;
        setDoctor(prevState => ({
            ...prevState,
            [name]: value
        }));
        setDoctorError({
            ...doctorError, [name]: false
        })
    };

    console.log("first", doctorError)

    const handleSpecialtyChange = (selectedOption) => {
        setDuplicateError(false)
        setDoctor({ ...doctor, SpecialityID: selectedOption.value });
        setDoctorError({ ...doctorError, SpecialityID: false })
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="container " style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between my-2">
                <h3>Doctor List</h3>
                <Button variant="primary" onClick={handleAddClick}>Add</Button>
            </div>
            <Table striped bordered hover variant={darkMode?"dark":"light"}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Doctor Name</th>
                        <th>Specialty</th>
                        <th>Education</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {doctorsList.map((doctor, index) => (
                        <tr key={doctor.id}>
                            <td>{index + 1}</td>
                            <td>{doctor.DoctorName}</td>
                            <td>{doctor.SpecialityName}</td>
                            <td>{doctor.Education}</td>
                            <td>
                                <Button variant="info" onClick={() => handleEditDoctor(doctor)} className="mx-2">Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteDoctor(doctor.DoctorID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <DoctorModal
                show={isModalOpen}
                handleClose={handleCloseModal}
                handleSave={handleSaveDoctor}
                selectedDoctor={selectedDoctor}
                doctor={doctor}
                handleChange={handleChange}
                setDoctor={setDoctor}
                doctorError={doctorError}
                specialtiesList={specialtiesList}
                handleSpecialtyChange={handleSpecialtyChange}
                darkMode={darkMode}
                duplicateError={duplicateError}
            />
            <DeleteConfirmationModal
                show={isDeleteModalOpen}
                handleClose={handleDeleteModalClose}
                handleDelete={handleDeleteConfirmed}
                deleteMessage={deleteMessage}
                darkMode={darkMode}
                inUseError={inUseError}
            />
        </div>
    );
};

export default DoctorList;

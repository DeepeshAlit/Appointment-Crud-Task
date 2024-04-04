import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import DoctorModal from './DoctorModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorList = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctorsList, setDoctorsList] = useState([]);
    const [specialtiesList, setSpecialtiesList] = useState([]);
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


    useEffect(()=>{
        if(!token){
            navigate('/')
        }
    },[])

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
            } catch (error) {
                console.error('Error updating doctor:', error.message);
            }

        } else {

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
            } catch (error) {
                console.error('Error inserting doctor:', error.message);
            }


        }
        setIsModalOpen(false);
    };

    const handleEditDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleDeleteDoctor = async (doctorId) => {
        console.log("Doctor", doctorId)
        try {
            const response = await axios.delete(`https://localhost:7137/api/Doctor/Delete/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchDoctorList();
        } catch (error) {
            console.error('Error deleting doctor:', error.message);
        }
    };

    const handleChange = (e) => {
        debugger
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
        setDoctor({ ...doctor, SpecialityID: selectedOption.value });
        setDoctorError({ ...doctorError, SpecialityID: false })
    };

    return (
        <div className="container " style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Doctor List</h3>
                <Button variant="primary" onClick={handleAddClick}>Add</Button>
            </div>

            <Table striped bordered hover>
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
                                <Button variant="info" onClick={() => handleEditDoctor(doctor)}className="mx-2">Edit</Button>
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


            />
        </div>
    );
};

export default DoctorList;

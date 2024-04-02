
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DoctorModal from './DoctorModal';
import axios from 'axios';

const DoctorList = () => {
    const token = localStorage.getItem("token");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctorsList, setDoctorsList] = useState([]);
    const [doctorName, setDoctorName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [education, setEducation] = useState('');
    const [doctor, setDoctor] = useState({
        DoctorName: "",
        SpecialityID: null,
        Education: "",
    });

    const fetchDoctorList=async()=>{
        try {
            const response = await axios.get('https://localhost:7137/api/Doctor/GetList', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            // Assuming the response contains a list of doctors
            const doctorList = response.data;
            setDoctorsList(doctorList)
            console.log('Doctor list:', doctorList);
          } catch (error) {
            console.error('Error fetching doctor list:', error.message);
          }
    }

    useEffect(()=>{
        fetchDoctorList();
    },[])

    const handleAddClick = () => {
        setSelectedDoctor(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveDoctor = async() => {
        debugger
        if (selectedDoctor) {
            console.log("Selected Doctor",selectedDoctor)
            const updatedDoctorData={
                doctorID:selectedDoctor?.DoctorID,
                doctorName:selectedDoctor?.DoctorName,
                specialityID:selectedDoctor?.SpecialityID,
                education:selectedDoctor?.Education
            }
            try {
                const response = await axios.put(`https://localhost:7137/api/Doctor/Update/`, updatedDoctorData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
                });
                fetchDoctorList();
                console.log('Doctor updated successfully:');
              } catch (error) {
                console.error('Error updating doctor:', error.message);
              }
        
        } else {
            
            try {
                const data={
                    doctorName: doctor?.DoctorName,
                    specialityID:doctor?.SpecialityID,
                    education: doctor?.Education
                }
                const response = await axios.post('https://localhost:7137/api/Doctor/Insert', data, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
                });
                fetchDoctorList();
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

    const handleDeleteDoctor = async(doctorId) => {
        console.log("Doctor",doctorId)
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
        if (selectedDoctor) {
            setSelectedDoctor(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setDoctor(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    return (
        <div className="container " style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Doctor List</h3>
                <Button variant="primary" onClick={handleAddClick}>Add</Button>
            </div>

            <table className="container text-center">
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
                                <Button variant="info" onClick={() => handleEditDoctor(doctor)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteDoctor(doctor.DoctorID)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DoctorModal
                show={isModalOpen}
                handleClose={handleCloseModal}
                handleSave={handleSaveDoctor}
                selectedDoctor={selectedDoctor}
                doctor={doctor}
                handleChange={handleChange}

            />
        </div>
    );
};

export default DoctorList;

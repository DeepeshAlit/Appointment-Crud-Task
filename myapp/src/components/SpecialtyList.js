import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import SpecialtyModal from './SpecialtyModal';
import axios from 'axios';

const SpecialtyList = () => {
    const token = localStorage.getItem("token");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    // const [specialtyName, setSpecialtyName] = useState('');
    // const [description, setDescription] = useState('');
    const [speciality, setSpeciality] = useState({
        SpecialityName: '',
        Description: ''
    });
    const [errors,setErrors] = useState({
        SpecialityName:false,
        Description:false
    })



    const getSpecialityList = async () => {
        try {
            const response = await axios.get('https://localhost:7137/api/Speciality/GetList', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const specialities = response.data;
            setSpecialties(specialities)
            console.log('Speciality list:', specialities);
        } catch (error) {
            console.error('Error fetching speciality list:', error.message);
        }
    }

    useEffect(() => {
        getSpecialityList();
    }, [])

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSpecialty(null);
        // setSpecialtyName('');
        // setDescription('');
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const validateSpeciality = () => {
        debugger
        let hasError = false;
        const newErrors = {};

        if(selectedSpecialty){
            const requiredFields = ['SpecialityName', 'Description'];

            requiredFields.forEach(field => {
                if (!selectedSpecialty[field]) {
                    newErrors[field] = true;
                    hasError = true;
                } else {
                    newErrors[field] = false;
                }
            });
        
            setErrors(newErrors);
            return hasError;
        }else{
    
        for (const key in speciality) {
            if (!speciality[key].trim()) {
                newErrors[key] = true;
                hasError = true;
            } else {
                newErrors[key] = false;
            }
        }
    
        setErrors(newErrors);
        return hasError;
        }
        
    };

    

    const handleSave = async () => {
       debugger
        
        if (selectedSpecialty) {
            if (validateSpeciality()) {
                return;
            }
            
            const updatedData ={
                
                    specialityID: selectedSpecialty?.SpecialityID,
                    specialityName:selectedSpecialty?.SpecialityName,
                    isGynac: false,
                    description: selectedSpecialty?.Description
                  
            }
            
            console.log("selectedSpecialty",updatedData)
            try {
                const response = await axios.put(`https://localhost:7137/api/Speciality/Update/`, updatedData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
                });
                getSpecialityList();
                console.log('Speciality updated successfully:');
              } catch (error) {
                console.error('Error updating speciality:', error.message);
              }


        } else {
            if (validateSpeciality()) {
                return;
            }
            try {
                // Add new Specialty
                const data = {
                    "specialityName": speciality.SpecialityName,
                    "description": speciality.Description
                }
                const response = await axios.post('https://localhost:7137/api/Speciality/Insert', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const resData = response.data;
                getSpecialityList();
                console.log('Speciality inserted successfully:', resData);
            } catch (error) {
                console.error('Error inserting speciality:', error.message);
            }
        }
        handleCloseModal();
    };

    const handleEditClick = (specialt) => {
        setSelectedSpecialty(specialt);
        // setSpeciality({
        //     specialtyName: specialt.SpecialityName,
        //     description: specialt.Description
        // });
        setIsModalOpen(true);
    };
    const handleDeleteClick = async(id) => {
        try {
            const response = await axios.delete(`https://localhost:7137/api/Speciality/Delete/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            getSpecialityList();
            console.log('Speciality deleted successfully:');
          } catch (error) {
            console.error('Error deleting speciality:', error.message);
          }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (selectedSpecialty) {
            setSelectedSpecialty(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setSpeciality(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    return (
        <div className="container " style={{ height: "100vh" }}>
            <div className="w-100 d-flex justify-content-between">
                <h3>Specialty List</h3>
                <Button variant="primary" onClick={handleAddClick}>
                    Add
                </Button>
            </div>
            <table className="container text-center">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Specialty Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {specialties.map((specialt, index) => (
                        <tr key={specialt.id}>
                            <td>{index + 1}</td>
                            <td>{specialt.SpecialityName}</td>
                            <td>{specialt.Description}</td>
                            <td className="d-flex">
                                <Button className="mx-2" variant="info" onClick={() => handleEditClick(specialt)}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteClick(specialt.SpecialityID)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <SpecialtyModal
                show={isModalOpen}
                handleClose={handleCloseModal}
                handleSave={handleSave}
                handleChange={handleChange}
                speciality={speciality}
                selectedSpecialty={selectedSpecialty}
                errors={errors}
                setErrors={setErrors}
            />
        </div>
    );
};

export default SpecialtyList;
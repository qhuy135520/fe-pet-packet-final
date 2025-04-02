"use client";

import { sendRequest } from '@/utils/api';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

export default function Pets() {

    const { data: session, status } = useSession();

    const [pets, setPets] = useState([]);
    const [petTypes, setPetTypes] = useState([]);
    const [newPet, setNewPet] = useState({
        petName: '',
        petBirthDate: '',
        petGender: '',
        petType: { petTypeId: '' },
        petWeight: '',
        description: '',
        petPicture: ''
    });
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const token = session?.user?.access_token;
    const userId = session?.user?.userId;

    useEffect(() => {

        async function fetchPets() {
            try {
                const res = await sendRequest({
                    method: 'GET',
                    url: `${process.env.NEXT_PUBLIC_API_URL}/api/pets/user/${userId}`,
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    // }
                });
                setPets(res.data);
            } catch (error) {
                console.error('Failed to fetch pets:', error);
            }
        }

        async function fetchPetTypes() {
            try {
                const res = await sendRequest({
                    method: 'GET',
                    url: `${process.env.NEXT_PUBLIC_API_URL}/api/types`,
                });
                setPetTypes(res.data);
            } catch (error) {
                console.error('Failed to fetch pet Pet types:', error);
            }
        }

        fetchPetTypes();
        fetchPets();
        // if (userId && token) {
            // fetchPets();
        // }

    }, [token, userId]);

    // Unified handleChange for newPet form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPet((prevPet) => {
            // Handle nested petType object for petTypeId
            if (name === 'petTypeId') {
                return { ...prevPet, petType: { petTypeId: value } };
            }
            return { ...prevPet, [name]: value };
        });
    };

    const handleAddPet = async (e) => {
        e.preventDefault();
        try {
            const res = await sendRequest({
                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_API_URL}/api/pets/${userId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: newPet
            });
            setShowModal(false);  // Close modal on success
            setPets((prevPets) => [...prevPets, res.data]); // Update pets list with the new pet
        } catch (error) {
            console.error('Failed to add pet:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center" style={{ marginTop: "160px" }}>
                <div className="col-md">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span>Pets</span>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => setShowModal(true)} // Open modal on button click
                            >
                                <i className="fa fa-plus"></i> Add Pet
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {pets.length > 0 ? (
                                    pets.map((pet) => (
                                        <div className="col-md-4" key={pet.petId}>
                                            <div className="card mb-4">
                                                <img
                                                    src="/img/services/pet-grooming-huyltq2.jpg"
                                                    className="card-img-top"
                                                    alt={pet.petName}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title text-center text-danger">{pet.petName}</h5>
                                                    <div className="d-flex justify-content-between">
                                                        <p className="card-text mb-0">{pet.petType?.petTypeName || 'Unknown'}</p>
                                                        <p className="card-text mb-0">{pet.petWeight} kg</p>
                                                    </div>
                                                    <p className="card-text">
                                                        <small className="text-muted">Born on: {pet.petBirthDate}</small>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">No pets found</h5>
                                                <p className="card-text">You have not added any pets yet.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Add Pet Modal start */}
                    {showModal && (
                        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="addPetModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="addPetModalLabel">Add a New Pet</h5>
                                        <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleAddPet}>
                                            <div className="form-group">
                                                <label>Pet Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="petName"
                                                    value={newPet.petName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Pet Birth Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="petBirthDate"
                                                    value={newPet.petBirthDate}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Pet Gender</label>
                                                <select
                                                    className="form-control"
                                                    name="petGender"
                                                    value={newPet.petGender}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Pet Type</label>
                                                <select
                                                    className="form-control"
                                                    name="petTypeId"
                                                    value={newPet.petType.petTypeId}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Pet Type</option>
                                                    {petTypes.map((type) => (
                                                        <option key={type.petTypeId} value={type.petTypeId}>
                                                            {type.petTypeName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Pet Weight</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="petWeight"
                                                    value={newPet.petWeight}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea
                                                    className="form-control"
                                                    name="description"
                                                    value={newPet.description}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Pet Picture URL</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="petPicture"
                                                    value={newPet.petPicture}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                                <button type="submit" className="btn btn-primary">Add Pet</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Add Pet Modal end */}

                </div>
            </div>
        </div>
    );
}

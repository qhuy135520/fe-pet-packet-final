"use client";

import { sendRequest, sendRequestFile } from "@/utils/api";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

export default function PetsDev2() {
  const { data: session, status } = useSession();

  const [image, setImage] = useState();
  const [imageName, setImageName] = useState("Choose file");
  const [pets, setPets] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [newPet, setNewPet] = useState({
    petName: "",
    petBirthDate: "",
    petGender: "",
    petType: { petTypeId: "", petTypeName: "" },
    petWeight: "",
    description: "",
    petPicture: "",
  });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const token = session?.user?.access_token;
  const userId = session?.user?.userId;

  useEffect(() => {
    async function fetchPets() {
      try {
        const res = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/pets/user/${userId}`,
          // headers: {
          //     Authorization: `Bearer ${token}`,
          // }
        });
        setPets(res.data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    }

    async function fetchPetTypes() {
      try {
        const res = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/types`,
        });
        setPetTypes(res.data);
      } catch (error) {
        console.error("Failed to fetch pet Pet types:", error);
      }
    }

    fetchPetTypes();
    // fetchPets();
    if (userId && token) {
      fetchPets();
    }
  }, [token, userId]);

  // Unified handleChange for newPet form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPet((prevPet) => {
      if (name === "petTypeId") {
        // Find the selected pet type object based on petTypeId
        const selectedPetType = petTypes.find(
          (type) => type.petTypeId === value
        );
        return {
          ...prevPet,
          petType: {
            petTypeId: value,
            petTypeName: selectedPetType?.petTypeName || "",
          },
        };
      }
      return { ...prevPet, [name]: value };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file ? file.name : "Choose file"); // Display the file name
    setNewPet((prevPet) => ({ ...prevPet, petPicture: imageName }));
  };

  const sendJson = async () => {
    try {
      const res = await sendRequest({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/pets/${userId}`,
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
        body: newPet,
      });
    } catch (error) {
      console.error("Failed to add pet:", error);
    }
  };

  const sendImage = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await sendRequestFile({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/pets/add/image`,
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
        body: formData,
      });
    } catch (error) {
      console.error("Failed to add pet:", error);
    }
  };

  const handleAddPet = async (e) => {
    e.preventDefault();

    sendJson();
    sendImage();

    setShowModal(false); // Close modal on success
    setPets((prevPets) => [...prevPets, { ...newPet }]);
  };

  return (
    <>
      <div
        className="breadcrumb-area set-bg"
        data-setbg="/img/breadcrumb/breadcrumb-blog.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>My pets 2</h2>
                <div className="breadcrumb__option">
                  <a href="#">
                    <i className="fa fa-home" /> Home
                  </a>
                  <span>My pets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="blog-section spad">
        <div className="container">
          <div className="text-right mb-2">
            {" "}
            {/* Center and add margin-bottom */}
            <button
              className="btn btn-primary btn-md"
              onClick={() => setShowModal(true)} // Open modal on button click
            >
              <i className="fa fa-plus"></i> Add Pet
            </button>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                {pets.map((pet) => (
                  <div className="col-lg-4 col-md-4" key={pet.petId}>
                    <div className="blog__item">
                      <img
                        className="blog__item__pic set-bg"
                        // data-setbg="img/blog/bp-1.jpg"
                        alt={pet.petPicture}
                        src={`/img/pets/${pet.petPicture}`}
                        // src='/img/blog/Screenshot 2024-09-21 173400.png'
                      />
                      <div className="blog__item__text">
                        <ul className="blog__item__tags">
                          <li>
                            <i className="fa fa-tags" />{" "}
                            {pet.petType.petTypeName}
                          </li>
                          {/* <li>Videos</li> */}
                        </ul>
                        <h5>
                          <a href="#">{pet.petName}</a>
                        </h5>
                        <ul className="blog__item__widget">
                          <li>
                            <i className="fa fa-clock-o" /> {pet.petBirthDate}
                          </li>
                          <li>
                            <i className="fa fa-user" /> John Smith
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="blog__pagination">
                <a href="#">
                  <i className="fa fa-long-arrow-left" /> Pre
                </a>
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">
                  Next <i className="fa fa-long-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="addPetModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addPetModalLabel">
                  Add a New Pet
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddPet}>
                  {/* Pet Name */}
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

                  {/* Pet Birth Date and Pet Gender */}
                  <div className="form-group row">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                  </div>

                  {/* Pet Type and Pet Weight */}
                  <div className="form-group row">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                      <label>Pet Weight</label>
                      <input
                        type="number"
                        className="form-control"
                        name="petWeight"
                        min={0}
                        max={100}
                        value={newPet.petWeight}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
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

                  {/* Pet Picture URL */}
                  <div className="form-group">
                    <label>Pet Picture</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="petPicture"
                        name="petPicture"
                        onChange={handleImageChange}
                      />
                      <label className="custom-file-label" htmlFor="petPicture">
                        {imageName}
                      </label>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Pet
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

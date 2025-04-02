"use client";

import React, { useEffect, useState } from "react";
import "./profile.css";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Preloder from "@/components/Preloder";
import { uploadImage } from "@/utils/upload";
import { toast } from "react-toastify";

export default function Profile() {
  const { data: session, update } = useSession();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const router = useRouter();

  const [user, setUser] = useState({});
  const [cities, setCities] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const token = session?.user?.access_token;
  const userId = session?.user?.userId;

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const res = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/cities`,
        });
        setCities(res.data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    }

    fetchProvinces();

    async function fetchUser() {
      try {
        const res = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data); // Set the user state based on fetched data
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
    // fetchUser();
    if (userId && token) {
      fetchUser();
    }
  }, [userId, token]);

  // Track whether the form is in edit mode

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Validation
    if (
      !user.name ||
      user.name.length < 5 ||
      user.name.length > 20 ||
      !/^[A-Za-z\s]+$/.test(user.name)
    ) {
      toast.error(
        "Name must be between 5 and 30 characters and contain only alphabets."
      );
      return;
    }

    const phoneRegex = /^0\d{9}$/; // Phone number starts with 0 and is exactly 10 digits
    if (!user.phone || !phoneRegex.test(user.phone)) {
      toast.error("Phone number must start with 0 and be exactly 10 digits.");
      return;
    }

    // if(!image){
    //   toast.error("Please choose an image!")
    //   return;
    // }

    try {
      if (!userId || !token) {
        console.error("User ID or token missing");
        return;
      }

      const pictureUrl = await uploadImage(image);
      const formInput = { ...user, userPicture: pictureUrl };

      const res = await sendRequest({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formInput,
      });

      if (res.statusCode === 200) {
        setUser(res.data); // Update with the saved data if needed
        toast.success("Update profile successfully!");
        await update();
        // window.location.reload();
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setIsEditMode(false);
    }
  };

  // Handle the Edit button click to enable editing
  const handleEdit = () => {
    setIsEditMode(true);
  };

  // Handle the Cancel button click to reset fields and disable editing
  const handleCancel = () => {
    // fetchUser(); // Reset to the latest fetched data
    setIsEditMode(false);
    setImage(null);
    setPreview(null);
  };

  // Handler to navigate to the pets page
  const handleNavigateToPets = () => {
    router.push("/user/pets");
  };

  const userCityDisplayName =
    cities.find((city) => city.value === user.city)?.displayName || "";

  if (Object.keys(user).length === 0) {
    return <Preloder />;
  }
  return (
    <div className="container rounded bg-white top-move mb-5">
      <div className="row">
        {/* Avatar section start */}
        <div className="col-md-5 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            {user?.userPicture == null ? (
              <img
                className="rounded-circle mt-5"
                width="150px"
                height="150px"
                src="/img/user/default-avatar.png"
              />
            ) : (
              <img
                className="rounded-circle mt-5"
                width="150px"
                height="150px"
                src={user.userPicture}
              />
            )}
            {/* <span className="font-weight-bold">{session?.user.name}</span>
            <span className="text-black-50">{session?.user.role}</span> */}
            <span> </span>
          </div>
        </div>
        {/* Avatar section end */}

        {/* Information section start */}
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Information</h4>
              {!isEditMode && (
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
              )}
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  name="username"
                  disabled
                  value={user.username || ""}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  name="name"
                  minLength={3}
                  value={user.name || ""}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Email</label>
                <input
                  type="email"
                  disabled
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={user.email || ""}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone"
                  name="phone"
                  value={user.phone || ""}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Address</label>
                {isEditMode ? (
                  <select
                    className="form-control"
                    name="city"
                    value={user.city || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city.value} value={city.value}>
                        {city.displayName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter address"
                    name="city"
                    value={userCityDisplayName}
                    readOnly
                  />
                )}
              </div>
              {isEditMode && (
                <>
                  <div className="col-md-12">
                    <label className="labels">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      placeholder="Enter phone"
                      name="userPicture"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e)}
                    />
                  </div>
                  {preview && <img src={preview} alt="Preview" width={200} />}
                </>
              )}
            </div>
            {isEditMode && (
              <div className="mt-5 text-center">
                <button
                  className="btn btn-danger profile-button mr-2"
                  type="button"
                  onClick={handleSave}
                >
                  Save Profile
                </button>
                <button
                  className="btn btn-danger profile-button"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Information section end */}

        {/* <div className="col-md-2">
          <button className="btn btn-primary" onClick={handleNavigateToPets}>
            View My Pets
          </button>
        </div> */}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { sendRequest } from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function UserUpdate({ user }) {
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await sendRequest({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.userId}`,
        body: formData,
      });
      if (response.statusCode === 200) {
        toast.success("User updated successfully!");
        router.push("/admin/user");
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update User Information</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData?.name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={formData?.gender || ""}
            onChange={handleChange}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData?.phone || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-4">
          <button
            type="button"
            className="btn btn-success mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => router.push("/admin/user")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

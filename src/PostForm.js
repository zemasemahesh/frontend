import React, { useEffect, useState } from "react";
import axios from "axios";

function PostForm({ selectedPost, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        dob: "",
    });

    useEffect(() => {
        if (selectedPost) {
            // Populate form for editing
            setFormData({
                name: selectedPost.name || "",
                email: selectedPost.email || "",
                password: "",
                dob: selectedPost.dob || "",
            });
        } else {
            // Reset form after create/update
            setFormData({
                name: "",
                email: "",
                password: "",
                dob: "",
            });
        }
    }, [selectedPost]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (selectedPost && selectedPost.id) {
                // ✅ EDIT user
                await axios.put(`http://localhost:8000/api.php?id=${selectedPost.id}`, formData);

                alert("User Updated!");
            } else {
                // ✅ CREATE user
                await axios.post("http://localhost:8000/api.php", formData);
                alert("User Created!");
            }

            // Reset form
            setFormData({ name: "", email: "", password: "", dob: "" });

            // Refresh list and reset edit mode
            onSave();

        } catch (err) {
            console.error(err);
            alert("Error occurred");
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <h4 className="mb-3">{selectedPost ? "Edit User" : "Create User"}</h4>

            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            {!selectedPost && (
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}


            <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                    type="date"
                    name="dob"
                    className="form-control"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                {!selectedPost ? (
                    <button type="submit" className="btn btn-success">
                        Create User
                    </button>
                ) : (
                    <>
                        <button type="submit" className="btn btn-primary me-2">
                            Update User
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                setFormData({ name: "", email: "", password: "", dob: "" });
                                onSave(); // clears selectedPost
                            }}
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>

        </form>
    );
}

export default PostForm;

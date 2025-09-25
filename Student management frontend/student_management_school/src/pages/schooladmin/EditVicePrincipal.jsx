import React, { useState, useEffect } from "react";
import Inputfield from "../../components/common/Inputfield.jsx";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditVicePrincipal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // optional
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);

  // ✅ Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewPic(URL.createObjectURL(file)); // preview before upload
    }
  };

  // ✅ Fetch VP details
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://127.0.0.1:8000/schoolapp/vpdetails/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        if (res.data.profile_picture) {
          setPreviewPic(res.data.profile_picture);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch Vice Principal details");
      });
  }, [id]);

  // ✅ Update VP
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      if (password) formData.append("password", password);
      if (profilePicture) formData.append("profile_picture", profilePicture);

      const response = await axios.put(
        `http://127.0.0.1:8000/schoolapp/vpdetails/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Vice Principal updated successfully!");
      console.log(response.data);

      // 🔹 adjust this path to your list route
      navigate("/admin/list/viceprincipal");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Vice Principal");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Edit Vice Principal
      </h2>

      <form onSubmit={handleUpdate}>
        <Inputfield
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Inputfield
          label="Password (leave blank if unchanged)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Inputfield
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Inputfield
          label="Phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Profile Picture */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {previewPic && (
            <div className="mt-3 text-center">
              <img
                src={previewPic}
                alt="Preview"
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
            </div>
          )}
        </div>

        <Button type="submit" label="Update Vice Principal" />
      </form>
    </div>
  );
}

export default EditVicePrincipal;

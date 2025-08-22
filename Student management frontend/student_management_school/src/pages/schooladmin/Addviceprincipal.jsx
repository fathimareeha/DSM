import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
import Inputfield from "../../components/common/Inputfield";


function AddVicePrincipal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // File state
  const [previewPic, setPreviewPic] = useState(null); // Preview state

  const vpcreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('phone', phone);
      if (profilePicture) {
        formData.append('profile_picture', profilePicture);
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/schoolapp/createvp/',
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response);
      toast.success('VP Created');

      // Clear form
      setUsername('');
      setPassword('');
      setEmail('');
      setPhone('');
      setProfilePicture(null);
      setPreviewPic(null);
    } catch (error) {
      console.log(error);
      toast.error('Failed to create VP');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreviewPic(file ? URL.createObjectURL(file) : null);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Vice Principal</h2>
      <form onSubmit={vpcreate}>
        <Inputfield
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Inputfield
          label="Password"
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

        {/* Profile Picture Field */}
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

        <Button type="submit" label="Add Vice Principal" />
      </form>
    </div>
  );
}

export default AddVicePrincipal;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    username: '',
    gender: '',
    email: '',
    phone: '',
    profile_picture: '',
  });

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`http://127.0.0.1:8000/schoolapp/teachers/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(res => {
        setTeacher({
          username: res.data.username || '',
          gender: res.data.gender || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
          profile_picture: res.data.profile_picture || '',
        });
      })
      .catch(err => {
        toast.error('Failed to fetch teacher details');
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('username', teacher.username || '');
    formData.append('gender', teacher.gender || '');
    formData.append('email', teacher.email || '');
    formData.append('phone', teacher.phone || '');
    if (password.trim() !== '') formData.append('password', password);
    if (newProfilePic) formData.append('profile_picture', newProfilePic);

    try {
      await axios.patch(
        `http://127.0.0.1:8000/schoolapp/teachers/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success('Teacher updated successfully');

      // Delay navigation so toast is visible
      setTimeout(() => {
        navigate('/admin/list/teachers');
      }, 1500);
    } catch (error) {
      toast.error('Failed to update teacher');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/schoolapp/teachers/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      toast.success('Teacher deleted successfully');
      navigate('/admin/list/teachers');
    } catch (error) {
      toast.error('Failed to delete teacher');
      console.error(error);
    }
  };

  return (
    <div className="container max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Teacher</h2>

      {/* Current Profile Picture */}
      {teacher.profile_picture && !previewPic && (
        <div className="mb-4 text-center">
          <img
            src={teacher.profile_picture}
            alt="Current Profile"
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
        </div>
      )}

      {/* Preview New Picture */}
      {previewPic && (
        <div className="mb-4 text-center">
          <img
            src={previewPic}
            alt="Preview"
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            name="username"
            value={teacher.username || ""}
            onChange={handleChange}
            placeholder="Enter username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <div className="flex space-x-6">
            {['Male', 'Female', 'Other'].map((g) => (
              <label key={g} className="inline-flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={teacher.gender === g}
                  onChange={handleChange}
                  className="form-radio text-blue-600"
                />
                <span className="text-gray-700">{g}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={teacher.email || ""}
            onChange={handleChange}
            placeholder="Enter email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            name="phone"
            value={teacher.phone || ""}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep unchanged"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            {showPassword ? 'Hide' : 'Show'} Password
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </form>

      {/* Delete */}
      <button
        onClick={handleDelete}
        className="w-full mt-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
      >
        Delete Teacher
      </button>
    </div>
  );
}

export default EditTeacher;

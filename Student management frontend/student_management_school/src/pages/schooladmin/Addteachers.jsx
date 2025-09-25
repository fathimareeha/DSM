import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function AddTeachers() {
  const [teacherName, setTeacherName] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const createTeacher = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!teacherName || !gender || !password || !phone || !email || !profilePic) {
      toast.error('All fields including profile picture are required');
      return;
    }

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('username', teacherName);
      formData.append('gender', gender);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('profile_picture', profilePic); // Backend field name should match

      const response = await axios.post(
        'http://127.0.0.1:8000/schoolapp/teachercreate/',
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success('Teacher Created Successfully');

      // Clear form
      setTeacherName('');
      setGender('');
      setPassword('');
      setPhone('');
      setEmail('');
      setProfilePic(null);

    } catch (error) {
      console.error(error);
      toast.error('Failed to create teacher');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Teacher Profile</h2>

      <form onSubmit={createTeacher} className="space-y-6">
        <fieldset className="border border-gray-300 p-4 rounded">
          <legend className="text-lg font-semibold text-gray-700">Teacher Details</legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Full Name */}
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block font-medium mb-2">Gender</label>
              <div className="flex items-center space-x-4">
                {['Male', 'Female', 'Other'].map((g) => (
                  <label key={g} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={gender === g}
                      onChange={(e) => setGender(e.target.value)}
                      className="mr-2"
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Profile Picture */}
            <div>
              <label className="block font-medium">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-6"
        >
          Register Teacher
        </button>
      </form>
    </div>
  );
}

export default AddTeachers;

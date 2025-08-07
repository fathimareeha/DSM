import React, { useState } from 'react';
import axios from 'axios';
import Input from '../Input'; // Your custom Input component

function UniversityForm() {
  const [universityName, setUniversityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const handleUniversitySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setError('');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/superadmin_app/university',
        { name: universityName },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setSuccessMessage('University created successfully!');
      setUniversityName('');
    } catch (err) {
      setError('Error creating university.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Create University</h1>

        <form onSubmit={handleUniversitySubmit} className="space-y-4">
          <Input
            label="University Name"
            type="text"
            placeholder="Ex: Anna University"
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
            required={true}
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create University'}
            </button>
          </div>
        </form>

        {/* Messages */}
        {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default UniversityForm;

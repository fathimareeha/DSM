import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  console.log(token);
  
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const emailFromURL = query.get('email');
    if (emailFromURL) {
      setEmail(emailFromURL);
    }
  }, [location]);
  console.log(email);
  

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('email', email);
  formData.append('token', token);
  formData.append('password', password);

  try {
    const res = await axios.post(
      'http://127.0.0.1:8000/superadmin_app/api/password-reset/confirm/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    setMsg(res.data.detail);
    setTimeout(() => navigate('/institution_login'), 2000);
  } catch (err) {
    console.log(err);
    setMsg(err.response?.data?.detail || 'Reset failed');
  }
};
  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default ResetPassword;

import React, { useContext, useState } from 'react';
import Inputfield from '../../components/common/Inputfield';
import Button from '../../components/common/Button';
import { Authcontext } from '../../context/institution/Authcontext';

function Login() {
  const { collegelogin } = useContext(Authcontext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      alert("Username and Password are required");
      return;
    }
    collegelogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <div className="space-y-4">
          <Inputfield
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Inputfield
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button label="Login" onclick={handleLogin} />
        </div>
      </div>
    </div>
  );
}

export default Login;

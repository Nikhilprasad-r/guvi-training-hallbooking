import { useState } from 'react';
import { handleRegister } from '../services/api';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const message = await handleRegister(username, password);
    if (message === "User registered successfully") {
      onRegister(); // Trigger authentication in MainApp
    } else {
      setError(message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

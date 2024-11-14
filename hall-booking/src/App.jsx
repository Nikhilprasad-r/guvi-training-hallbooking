import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Toggle between Login and Register components

  // Callback functions to handle login and register success
  const handleLoginSuccess = () => setIsAuthenticated(true);
  const handleRegisterSuccess = () => setIsAuthenticated(true);

  // Toggle between Login and Register forms
  const toggleAuthForm = () => setShowLogin((prev) => !prev);

  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <Dashboard /> // Show the dashboard if authenticated
      ) : (
        <div className="auth-container">
          {showLogin ? (
            <>
              <Login onLogin={handleLoginSuccess} />
              <p>
                Don't have an account?{' '}
                <button onClick={toggleAuthForm} className="text-blue-500">
                  Register here
                </button>
              </p>
            </>
          ) : (
            <>
              <Register onRegister={handleRegisterSuccess} />
              <p>
                Already have an account?{' '}
                <button onClick={toggleAuthForm} className="text-blue-500">
                  Login here
                </button>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

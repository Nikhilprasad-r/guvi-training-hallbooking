import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { handleLogout } from "./services/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [role, setRole] = useState("user");

  // Callback functions to handle login and register success
  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setRole(user.role);
  };
  const handleRegisterSuccess = (user) => {
    setIsAuthenticated(true);
    setRole(user.role);
  };
  const handleLogoutSucess = () => {
    console.log("tried logout")
    setIsAuthenticated(false);
    handleLogout();
    setRole("");
  };

  // Toggle between Login and Register forms
  const toggleAuthForm = () => setShowLogin((prev) => !prev);

  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <Dashboard role={role} handleLogout={handleLogoutSucess} /> // Show the dashboard if authenticated
      ) : (
        <div className="auth-container">
          {showLogin ? (
            <>
              <Login onLogin={handleLoginSuccess} />
              <p>
                Don&apos;t have an account?{" "}
                <button onClick={toggleAuthForm} className="text-blue-500">
                  Register here
                </button>
              </p>
            </>
          ) : (
            <>
              <Register onRegister={handleRegisterSuccess} />
              <p>
                Already have an account?{" "}
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

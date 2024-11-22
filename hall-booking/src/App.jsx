import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Messaging from "./components/Messaging";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("user");
  const [user, setUser] = useState("");

  // Callback functions to handle login and register success
  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setRole(user.role);
    setUser(user.username);
  };

  const handleRegisterSuccess = (user) => {
    setIsAuthenticated(true);
    setRole(user.role);
    setUser(user.username);
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          {/* Define routes for Login, Register, and Dashboard */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLoginSuccess} />
              ) : (
                <Dashboard role={role} />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register onRegister={handleRegisterSuccess} />
              ) : (
                <Dashboard role={role} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard role={role} />
              ) : (
                <Login onLogin={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/messaging"
            element={
              isAuthenticated ? (
                <Messaging sender={user} />
              ) : (
                <Login onLogin={handleLoginSuccess} />
              )
            }
          />
          {/* Default route */}
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLoginSuccess} />
              ) : (
                <Dashboard role={role} />
              )
            }
          />
        </Routes>

        {/* Links for navigating between Login, Register, and Dashboard */}
        {!isAuthenticated && (
          <div className="auth-container">
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
            <span> | </span>
            <Link to="/register" className="text-blue-500">
              Register here
            </Link>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

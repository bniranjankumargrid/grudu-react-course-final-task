import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/AuthForm/AuthForm";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { HomePage } from "./components/HomePage/HomePage";

function App() {
 
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

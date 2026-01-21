import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Dashboard } from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Builder } from "./Pages/Builder";
import { PublicSurvey } from "./Pages/PublicSurvey";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/builder/:id"
            element={
              <ProtectedRoute>
                <Builder />
              </ProtectedRoute>
            }
          />
          <Route path="/survey/:id" element={<PublicSurvey />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

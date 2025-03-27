import React, { useState } from "react";
import Auth from "./Pages/AuthPage";
import { Navigate, Route, Routes } from "react-router-dom";
import ToDoPage from "./Pages/HomePage";
import SidebarMenu from "./Pages/HomePage/Components/SidebarMenu";
import { useSelector } from "react-redux";



function App() {
  const [title,setTitle] = useState("All Tasks");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/auth" />;
  };

  const AuthRoute = ({ children }) => {
    return !isAuthenticated ? children : <Navigate to="/" />;
  };
  return (
    <div>
      <SidebarMenu setTitle={setTitle}/>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ToDoPage title={title}/>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainLayout from "./layouts/MainLayout";
import Manager from "./pages/Manager";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/manager" element={<Manager />} />

          <Route
            path=""
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
          />

          
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainLayout from "./layouts/MainLayout";
import Manager from "./pages/Manager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/manager" element={<Manager />} />
          <Route path="" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

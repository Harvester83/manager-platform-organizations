import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainLayout from "./layouts/MainLayout";
import Manager from "./pages/manager/Manager";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  //const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    console.log("App useEffect: ");
  }, []);




  return (
    <div>
      <Manager />
    </div>
  );
}

export default App;

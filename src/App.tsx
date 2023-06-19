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
  const [loader, setLoader] = React.useState(false);

  console.log("App.tsx");
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/manager" element={<Manager loader={loader} />} />
            <Route path="" element={<SignIn setLoader={setLoader} />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

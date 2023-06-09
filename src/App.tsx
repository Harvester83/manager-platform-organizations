import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainLayout from "./layouts/MainLayout";
import Manager from "./pages/manager/Manager";
import { Provider } from "react-redux";
import { store } from "./store";


// Create the Redux store
// const store = configureStore(rootReducer);

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;

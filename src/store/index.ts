import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// Создание хранилища
const store = configureStore({
  reducer: {
    //user,
    // task
  },
});

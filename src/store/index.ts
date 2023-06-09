import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { UserSlice } from "./user/slice";
import { CurrentUserSlice } from "./currentUser/slice";

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    currentUser: CurrentUserSlice.reducer
  },
});

export const useAppDispatch:() => typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

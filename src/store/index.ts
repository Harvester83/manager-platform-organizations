import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { UserSlice } from "./user/slice";
import { TaskSlice } from "./task/slice";
import { CurrentUserSlice } from "./currentUser/slice";

export const store = configureStore({
  reducer: {
    currentUser: CurrentUserSlice.reducer,
    user: UserSlice.reducer,
    task: TaskSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

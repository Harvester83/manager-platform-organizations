// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface CurrentUser {
//   id: number;
//   organization_id: number;
//   organization_name: string;
//   phone: string;
//   address: string;
//   username: string;
//   lastname: string;
//   email: string;
//   password: string;
//   role: "admin" | "user";
// }

// const initialState: CurrentUser | undefined = undefined;

// export const CurrentUserSlice = createSlice({
//   name: "currentUser",
//   initialState,

//   reducers: {
//     setCurrentUser: (
//       state,
//       action: PayloadAction<CurrentUser | null | any>
//     ) => {
//       return action.payload !== null ? action.payload : state;
//     },
//   },
// });

// export default CurrentUserSlice.reducer;
// export const { setCurrentUser } = CurrentUserSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentUser {
  id: number;
  organization_id: number;
  organization_name: string;
  phone: string;
  address: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

const initialState: CurrentUser | null = null;

export const CurrentUserSlice = createSlice({
  name: "currentUser",
  initialState,

  reducers: {
    setCurrentUser: (
      state,
      action: PayloadAction<CurrentUser | null | any>
    ) => {
      return action.payload !== null ? action.payload : initialState;
    },
  },
});

export default CurrentUserSlice.reducer;
export const { setCurrentUser } = CurrentUserSlice.actions;

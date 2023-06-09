import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  organization_id: number;
  organization_name: string;
  phone: string;
  address: string;
  username: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const UserSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    addUser: (
      state,
      action: PayloadAction<{
        id: number;
        organization_id: number;
        organization_name: string;
        phone: string;
        address: string;
        username: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
      }>
    ) => {
      state.users.push({
        id: Date.now(),
        organization_id: action.payload.organization_id,
        organization_name: action.payload.organization_name,
        phone: action.payload.phone,
        address: action.payload.address,
        username: action.payload.username,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password,
        role: action.payload.role,
      });
    },

    addUserArray: (
      state,
      action: PayloadAction<
        Array<{
          id: number;
          organization_id: number;
          organization_name: string;
          phone: string;
          address: string;
          username: string;
          lastName: string;
          email: string;
          password: string;
          role: string;
        }>
      >
    ) => {
      action.payload.forEach((user) => {
        state.users.push({
          id: user.id,
          organization_id: user.organization_id,
          organization_name: user.organization_name,
          phone: user.phone,
          address: user.address,
          username: user.username,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          role: user.role,
        });
      });
    },

    deleteUserArray: (state, action: PayloadAction<number[]>) => {
      state.users = state.users.filter(
        (user) => !action.payload.includes(user.id)
      );
    },
  },
});

export default UserSlice.reducer;
export const { addUser, addUserArray, deleteUserArray } = UserSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  organization_id: number;
  organization_name: string;
  phone: string | null;
  address: string | null;
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
        phone: string | null;
        address: string | null;
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

    saveUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },

    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },

    editUser: (
      state,
      action: PayloadAction<{
        id: number;
        organization_id: number;
        organization_name: string;
        phone: string | null;
        address: string | null;
        username: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
      }>
    ) => {
      const {
        id,
        organization_id,
        organization_name,
        phone,
        address,
        username,
        lastName,
        email,
        password,
        role,
      } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          id,
          organization_id,
          organization_name,
          phone,
          address,
          username,
          lastName,
          email,
          password,
          role,
        };
      }
    },
  },
});

export default UserSlice.reducer;
export const { addUser, deleteUser, editUser, saveUsers } = UserSlice.actions;

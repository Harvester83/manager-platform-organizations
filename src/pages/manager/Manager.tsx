import React from "react";
import { Box, Button, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useAppDispatch, useAppSelector } from "../../store";
import { User, addUser, deleteUser } from "../../store/user/slice";
import { Task, deleteTask } from "../../store/task/slice";
import ModalWindow from "../../components/ModalWindow";
import FormWrapper from "./FormWrapper";
import { useNavigate } from "react-router";
//import { setCurrentUser } from "../../store/currentUser/slice";

// export enum TypeForm {
//   EditUser,
//   AddUser,
//   EditTask,
//   AddTask,
// }

// export interface DataEdit {
//   userEditData: User | null;
//   taskEditData: Task | null;
// }

// interface ManagerProps {
//   loader: boolean;
// }

const Manager: React.FC = () => {
  // const currentUser = useAppSelector((state) => state.currentUser);
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const employees = useAppSelector((state) => state.user.users);
  // const tasks = useAppSelector((state) => state.task.tasks);

  // const [open, setOpen] = React.useState(false);
  // const [typeForm, setTypeForm] = React.useState<TypeForm | null>(null);
  // const [dataEdit, setDataEdit] = React.useState<DataEdit | null>(null);

  // const handleEditUser = (id: number) => {
  //   const editUserData = employees.find((employee: User) => employee.id === id);
  //   if (!editUserData) {
  //     return;
  //   }

  //   setDataEdit({ userEditData: editUserData, taskEditData: null });
  //   setTypeForm(TypeForm.EditUser);
  //   setOpen(true);
  // };

  // const handleEditTask = (id: number) => {
  //   const editTaskData = tasks.find((task: Task) => task.id === id);
  //   if (!editTaskData) {
  //     return;
  //   }

  //   setDataEdit({ userEditData: null, taskEditData: editTaskData });
  //   setTypeForm(TypeForm.EditTask);
  //   setOpen(true);
  // };

  // const handleAddUser = () => {
  //   setTypeForm(TypeForm.AddUser);
  //   setOpen(true);
  // };

  // const handleAddTask = () => {
  //   setTypeForm(TypeForm.AddTask);
  //   setOpen(true);
  // };

  // const closeModal = () => {
  //   setOpen(false);
  //   setTypeForm(null);
  //   setDataEdit(null);
  // };
  

  React.useEffect(() => {
    console.log("Manager useEffect: ");
  }, []);

  // React.useEffect(() => {
  //   console.log("Manager useEffect: ", 2);
  //   if (!currentUser) {
  //     console.log("Manager useEffect: ", 3);
  //     navigate("/");
  //     return;
  //   }

  //   console.log("Manager useEffect: ", 5);
  // }, [currentUser, dispatch]);

  // React.useEffect(() => {
  //   console.log("Manager useEffect: ", 2);
  //   dispatch(
  //     addUser({
  //       id: 5,
  //       organization_id: 24,
  //       organization_name: "FashionStore",
  //       phone: "+700000000",
  //       address: "Shopping Mall",
  //       username: "Sarah",
  //       email: "sarah@gmail.com",
  //       password: "pass1234",
  //       role: "user",
  //       lastName: "Surname5",
  //     })
  //   );
  // }, [dispatch]);

  return <div>Manager</div>;
};

export default Manager;

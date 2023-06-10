import React from "react";
import { Box, Button, Grid } from "@mui/material";
//import { Delete, AddIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useAppDispatch, useAppSelector } from "../../store";
import { User, addUser, deleteUser, saveUsers } from "../../store/user/slice";
import { Task, saveTasks } from "../../store/task/slice";
import ModalWindow from "../../components/ModalWindow";
import { UserEditForm } from "./UserEditForm";
import { UserAddForm } from "./UserAddForm";
import { mockUsers, mockTasks } from "../../data";
import FormWrapper from "./FormWrapper";

export enum TypeForm {
  EditUser,
  AddUser,
  EditTask,
  AddTask,
}

const Manager: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser);
  const employees = useAppSelector((state) => state.user.users);
  const tasks = useAppSelector((state) => state.task.tasks);

  const [open, setOpen] = React.useState(false);
  const [typeForm, setTypeForm] = React.useState<TypeForm | null>(null);
  const [userData, setUserData] = React.useState<User | null>(null);

  const handleEditUser = (id: number) => {
    const editUserData = employees.find((employee: User) => employee.id === id);
    if (!editUserData) {
      return;
    }

    setUserData(editUserData);
    setTypeForm(TypeForm.EditUser);
    setOpen(true);
  };

  const handleAddUser = () => {
    setTypeForm(TypeForm.AddUser);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTypeForm(null);
    setUserData(null);
  };

  React.useEffect(() => {
    if (!currentUser) {
      return;
    }

    const employeesOrganization = mockUsers.filter(
      (user) => user.organization_id === currentUser["organization_id"]
    );

    const tasksOrganization = mockTasks.filter(
      (task) => task.task_organization_id === currentUser["organization_id"]
    );

    console.log(tasksOrganization);

    dispatch(saveUsers(employeesOrganization));
    dispatch(saveTasks(tasksOrganization));
  }, [currentUser, dispatch]);

  return (
    <div style={{ padding: "50px 20px" }}>
      <h2 className="title-h2 title-h2_mb title-h2_center">Manager</h2>

      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: "space-between",
        }}
      >
        {currentUser ? (
          currentUser["role"] === "admin" ? (
            <Grid item xs={4}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <h2 className="title-h3 title-h3_mr title-h3_center">
                  Employees
                </h2>

                <Button onClick={handleAddUser} variant="contained">
                  <PersonAddIcon />
                </Button>
              </Box>

              <ul className="list">
                {employees?.map((employee) => (
                  <li key={employee.id}>
                    <div onClick={() => console.log(employee.id)}>
                      {`${employee.username} ${employee.lastName}`}
                    </div>

                    <div>
                      <IconButton
                        onClick={() => handleEditUser(employee.id)}
                        aria-label="edit"
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        onClick={() => dispatch(deleteUser(employee.id))}
                        aria-label="delete"
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </li>
                ))}
              </ul>
            </Grid>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}

        <Grid
          item
          xs={currentUser ? (currentUser["role"] === "admin" ? 6 : 12) : 12}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2 className="title-h3 title-h3_mr title-h3_center">Tasks</h2>

            <Button variant="contained">
              <PlaylistAddIcon />
            </Button>
          </Box>
          <ul className="list">
            {tasks.map((task: Task) => (
              <li key={task.id}>
                <div onClick={() => console.log(task.id)}>{task.name}</div>

                <div>
                  <IconButton
                    onClick={() => handleEditUser(task.id)}
                    aria-label="edit"
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    onClick={() => dispatch(deleteUser(task.id))}
                    aria-label="delete"
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>

      <ModalWindow open={open} handleClose={closeModal}>
        <FormWrapper type={typeForm} data={userData} handleClose={closeModal} />
      </ModalWindow>
    </div>
  );
};

export default Manager;
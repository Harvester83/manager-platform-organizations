import React from "react";
import { Box, Button, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useAppDispatch, useAppSelector } from "../../store";
import { User, addUser, deleteUser, saveUsers } from "../../store/user/slice";
import { Task, deleteTask } from "../../store/task/slice";
import ModalWindow from "../../components/ModalWindow";
import FormWrapper from "./FormWrapper";
import { useNavigate } from "react-router";
import { apiUsers } from "../../data/mock";

export enum TypeForm {
  EditUser,
  AddUser,
  EditTask,
  AddTask,
}

export interface DataEdit {
  userEditData: User | null;
  taskEditData: Task | null;
}

interface ManagerProps {
  loader: boolean;
}

const Manager: React.FC<ManagerProps> = ({ loader }) => {
  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const employees = useAppSelector((state) => state.user.users);
  const tasks = useAppSelector((state) => state.task.tasks);

  const [open, setOpen] = React.useState(false);
  const [typeForm, setTypeForm] = React.useState<TypeForm | null>(null);
  const [dataEdit, setDataEdit] = React.useState<DataEdit | null>(null);

  const handleEditUser = (id: number) => {
    const editUserData = employees.find((employee: User) => employee.id === id);
    if (!editUserData) {
      return;
    }

    setDataEdit({ userEditData: editUserData, taskEditData: null });
    setTypeForm(TypeForm.EditUser);
    setOpen(true);
  };

  const handleEditTask = (id: number) => {
    const editTaskData = tasks.find((task: Task) => task.id === id);
    if (!editTaskData) {
      return;
    }

    setDataEdit({ userEditData: null, taskEditData: editTaskData });
    setTypeForm(TypeForm.EditTask);
    setOpen(true);
  };

  const handleAddUser = () => {
    setTypeForm(TypeForm.AddUser);
    setOpen(true);
  };

  const handleAddTask = () => {
    setTypeForm(TypeForm.AddTask);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTypeForm(null);
    setDataEdit(null);
  };

  React.useEffect(() => {
    console.log("Manager useEffect");

    if (!currentUser) {
      navigate("/");
      return;
    }

    if (currentUser["username"] === "Romo") {
      const fetchUserData = async () => {
        try {
          const users = await apiUsers.get("/users", {
            params: { organization_id: 24 },
          });
          dispatch(saveUsers(users.data.users));
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();

      return;
    }
  }, [currentUser, dispatch]);

  return (
    <div>
      {loader ? (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
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
              xs={currentUser ? (currentUser["role"] === "admin" ? 8 : 12) : 12}
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

                <Button variant="contained" onClick={handleAddTask}>
                  <PlaylistAddIcon />
                </Button>
              </Box>

              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map((task: Task) => (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.deadline}</td>
                      <td>{task.status}</td>
                      <td>
                        <IconButton
                          onClick={() => handleEditTask(task.id)}
                          aria-label="edit"
                          size="small"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </td>
                      <td>
                        <IconButton
                          onClick={() => dispatch(deleteTask(task.id))}
                          aria-label="delete"
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Grid>
          </Grid>

          <ModalWindow open={open} handleClose={closeModal}>
            <FormWrapper
              type={typeForm}
              data={dataEdit}
              handleClose={closeModal}
            />
          </ModalWindow>
        </div>
      )}
    </div>
  );
};

export default Manager;

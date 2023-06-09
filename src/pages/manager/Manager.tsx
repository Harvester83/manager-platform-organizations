import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
//import { Delete, AddIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useAppDispatch, useAppSelector } from "../../store";
import { mockUsers } from "../../data";
import { User, addUser, deleteUser, saveUsers } from "../../store/user/slice";
import ModalWindow from "../../components/ModalWindow";
import { UserEditForm } from "./UserEditForm";
import { UserForm } from "./UserForm";

const Manager: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser);
  const employees = useAppSelector((state) => state.user.users);

  const [open, setOpen] = React.useState(false);
  const [editUser, setEditUser] = React.useState<User | null>(null);

  const handleEditUser = (id: number) => {
    const editUserData = employees.find((employee: User) => employee.id === id);
    if (!editUserData) {
      return;
    }

    setEditUser(editUserData);
    setOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!currentUser) {
      return;
    }

    const employeesOrganization = mockUsers.filter(
      (user) => user.organization_id === currentUser["organization_id"]
    );

    dispatch(saveUsers(employeesOrganization));
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
            <h2 className="title-h3 title-h3_mr title-h3_center">Employees</h2>

            <Button onClick={handleClickOpen} variant="contained">
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

        <Grid item xs={6}>
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
            <li>
              <div onClick={() => console.log("task")}>
                Employee work schedule
              </div>
              <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </li>
          </ul>
        </Grid>
      </Grid>

      <ModalWindow open={open} handleClose={closeModal}>
        <div className="modal-content">
          {editUser ? (
            <UserEditForm handleClose={closeModal} editUser={editUser} />
          ) : (
            <UserForm handleClose={closeModal} />
          )}
        </div>
      </ModalWindow>
    </div>
  );
};

export default Manager;

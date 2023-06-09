import React from "react";
import { Box, Button, Grid } from "@mui/material";
//import { Delete, AddIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useAppDispatch, useAppSelector } from "../store";
import { mockUsers } from "../data";
import { User, addUser, saveUsers } from "../store/user/slice";

const Manager: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser);
  const employees = useAppSelector((state) => state.user.users);

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

            <Button variant="contained">
              <PersonAddIcon />
            </Button>
          </Box>

          <ul className="list">
            {employees?.map((employee: any) => (
              <li key={employee.id}>
                <div onClick={() => console.log(employee.id)}>
                  {`${employee.username} ${employee.lastName}`}
                </div>
                <IconButton aria-label="delete" size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
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

      <div className="modal-container">
        <div className="modal-box">
          <h2 className="modal-title">Modal Title</h2>
          <div className="modal-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nobis
            quos, quisquam ipsum iure pariatur! Blanditiis cupiditate architecto
            quis repellendus rerum esse asperiores aliquam sit tenetur
            distinctio veniam, nihil saepe?
          </div>
          <div className="modal-buttons">
            <button>Button 1</button>
            <button>Button 2</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;

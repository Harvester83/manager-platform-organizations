import React, { FC } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
//import { Delete, AddIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
//import { data } from "../data";

interface UsersManager {
  id: number;
}

const Manager: FC = () => {
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    // const newData = data.users.filter((user) => user.id === 2);
    // console.log(newData);
    // setUserData(newData);
  }, []);

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
            <li>
              <div onClick={() => console.log(23)}>Tural Qaziyev</div>
              <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </li>
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
    </div>
  );
};

export default Manager;

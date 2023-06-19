import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { CurrentUser, setCurrentUser } from "../store/currentUser/slice";
import { saveUsers } from "../store/user/slice";
import { saveTasks } from "../store/task/slice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser: CurrentUser | null = useAppSelector(
    (state) => state.currentUser
  );

  const UserTitle = () => {
    if (!currentUser) {
      return <></>;
    }

    if (currentUser["role"] === "admin") {
      return (
        <h2 className="title-h2">
          Organization name: {currentUser["organization_name"]}
        </h2>
      );
    }

    if (currentUser["role"] === "user") {
      return <h2 className="title-h2">User: {currentUser["username"]}</h2>;
    }

    return <></>;
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    dispatch(saveUsers([]));
    dispatch(saveTasks([]));
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');  
    navigate("/");
  };

  return (
    <Box
      component="header"
      sx={{ backgroundColor: "#1976d2", justifyContent: "center" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          <UserTitle />
        </Grid>

        <Grid item xs={6}>
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <nav className="link-wrapper">
              {currentUser ? (
                <Button
                  onClick={signout}
                  className="link"
                  style={{ color: "#fff" }}
                >
                  SignOut
                </Button>
              ) : (
                <Link className="link" to="/">
                  SignIn
                </Link>
              )}

              <Link className="link" to="/signup">
                SignUp
              </Link>
            </nav>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;

import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store";
import { CurrentUser } from "../store/currentUser/slice";

const Header = () => {
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
              {/* <Link className="link" to="/manager">
                Manager
              </Link> */}

              <Link className="link" to="/">
                SignIn
              </Link>
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

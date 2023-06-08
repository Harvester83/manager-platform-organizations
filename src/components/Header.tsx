import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{ backgroundColor: "#1976d2", justifyContent: "center" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          <h2 className="title-h2">Organization name: Guba.</h2>
        </Grid>

        <Grid item xs={6}>
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <nav className="link-wrapper">
              <Link className="link" to="/manager">
                Manager
              </Link>

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

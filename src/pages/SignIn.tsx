import React from "react";
import { Button, Grid, TextField } from "@mui/material";

const SignIn = () => {
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid
        item
        xs={4}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2 className="title-h2 title-h2_mb title-h2_center">Sign In</h2>

        <div className="form">
          <TextField
            id="input-name"
            className="input-wrapper"
            label="Username"
            type="text"
          />

          <div className="input-wrapper">
            <TextField
              id="input-password"
              className="input-wrapper"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </div>

          <Button variant="contained">Sign in</Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignIn;

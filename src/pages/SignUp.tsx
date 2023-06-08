import React from "react";
import { Button, Grid, TextField } from "@mui/material";

const SignUp = () => {
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
        <h2 className="title-h2 title-h2_mb title-h2_center">Sign Up</h2>

        <div className="form">
          <TextField
            id="input-organization-name"
            className="input-wrapper"
            label="Organization name"
            type="text"
          />

          <TextField
            id="input-address"
            className="input-wrapper"
            label="Address"
            type="text"
          />

          <TextField
            id="input-phone"
            className="input-wrapper"
            label="Phone"
            type="text"
          />

          <TextField
            id="input-email"
            className="input-wrapper"
            label="Email"
            type="email"
          />

          <TextField
            id="input-name"
            className="input-wrapper"
            label="Username"
            type="text"
          />

          <TextField
            id="input-password"
            className="input-wrapper"
            label="Password"
            type="password"
            autoComplete="current-password"
          />

          <Button variant="contained">Sign Up</Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignUp;

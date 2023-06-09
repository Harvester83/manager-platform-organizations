import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data";
import { useAppDispatch } from "../store";

interface FormValue {
  username: string;
  password: string;
}

const SignUp = () => {
  const initialValues: FormValue = { username: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (values: FormValue) => {
  
    // fix
    if (values) {
      //dispatch(setCurrentUser(user));
      navigate("/manager");
    }
  };

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

        {/* <form className="form">
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
        </form> */}

        <Formik
          initialValues={initialValues}
          //validate={validate}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({
            handleChange,
            errors,
            isValid,
            dirty,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <TextField
                error={!!errors.username && !dirty}
                onBlur={handleBlur}
                onChange={handleChange}
                id="username"
                name="username"
                placeholder="Username"
                className="input-wrapper"
                label="Username"
                type="text"
                helperText={!!errors.username && !dirty ? errors.username : ""}
              />

              <TextField
                error={!!errors.password && !isValid && !dirty}
                onBlur={handleBlur}
                onChange={handleChange}
                id="password"
                name="password"
                className="input-wrapper"
                label="Password"
                type="password"
                autoComplete="current-password"
                helperText={!!errors.password && !dirty ? errors.password : ""}
              />

              <Button
                type="submit"
                variant="contained"
                //disabled={isValid && dirty ? false : true}
              >
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default SignUp;

import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data";
import { useAppDispatch } from "../store";

interface FormValue {
  organizationName: string;
  username: string;
  password: string;
}

const SignUp = () => {
  const initialValues: FormValue = { organizationName: "", username: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validate = (values: FormValue) => {
    const errors: Partial<FormValue> = {};

    if (values.organizationName) {
      errors.password = "organizationName is required";
    }

    if (!values.username) {
      errors.username = "Username is required";
    } else if (!values.password) {
      errors.password = "Password is required";
    }

    if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

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

        <Formik
          initialValues={initialValues}
          validate={validate}
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
                error={!!errors.organizationName && !dirty}
                onBlur={handleBlur}
                onChange={handleChange}
                id="input-organization-name"
                name="organizationName"
                placeholder="Organization name"
                className="input-wrapper"
                label="Organization name"
                type="text"
                helperText={!!errors.organizationName && !dirty ? errors.organizationName : ""}
              />

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
                disabled={isValid && dirty ? false : true}
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

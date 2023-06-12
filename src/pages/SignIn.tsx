import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data";
import { useAppDispatch, useAppSelector } from "../store";
import { setCurrentUser } from "../store/currentUser/slice";

interface FormValue {
  username: string;
  password: string;
}

interface ISignIn {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<ISignIn> = () => {
  const users = useAppSelector((state) => state.user.users);
  const initialValues: FormValue = { username: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validate = (values: FormValue) => {
    const errors: Partial<FormValue> = {};

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  const handleSubmit = (values: FormValue) => {
    const user = mockUsers.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    const curLogin = users.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (user || curLogin) {
      dispatch(setCurrentUser(user));
      navigate("/manager");
      return;
    }

    alert("The username or password is incorrect!");
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
        <h2 className="title-h2 title-h2_mb title-h2_center">Sign In</h2>
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
                error={!!errors.username}
                onBlur={handleBlur}
                onChange={handleChange}
                id="username"
                name="username"
                placeholder="Username"
                className="input-wrapper"
                label="Username"
                type="text"
                helperText={errors.username ? errors.username : ""}
              />

              <TextField
                error={!!errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                id="password"
                name="password"
                className="input-wrapper"
                label="Password"
                type="password"
                autoComplete="current-password"
                helperText={errors.password ? errors.password : ""}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={!isValid}
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

export default SignIn;

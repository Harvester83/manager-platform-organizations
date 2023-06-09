import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data";
import { useAppDispatch } from "../store";
import { setCurrentUser } from "../store/currentUser/slice";

interface FormValue {
  username: string;
  password: string;
}

interface ISignIn {
  //isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<ISignIn> = ({ setIsAuthenticated }) => {
  const initialValues: FormValue = { username: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const validate = (values: FormValue) => {
  //   const errors: Partial<FormValue> = {};

  //   if (!values.username) {
  //     errors.username = "Username is required";
  //   } else if (!values.password) {
  //     errors.password = "Password is required";
  //   }

  //   if (values.password.length < 6) {
  //     errors.password = "Password must be at least 6 characters long";
  //   }

  //   return errors;
  // };

  const handleSubmit = (values: FormValue) => {
    const user = mockUsers.find(
      (user) => user.username === "rr" && user.password === "123456"
    );

    if (user) {
      dispatch(setCurrentUser(user));
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
        <h2 className="title-h2 title-h2_mb title-h2_center">Sign In</h2>
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

export default SignIn;

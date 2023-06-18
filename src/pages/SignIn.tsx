import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate, redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { setCurrentUser } from "../store/currentUser/slice";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addUser } from "../store/user/slice";
//import { User, addUser } from "../store/user/slice";

const mock = new MockAdapter(axios);

mock.onPost("/api/login").reply(200, {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  user: {
    id: 2,
    organization_id: 24,
    organization_name: "TechSolutions",
    phone: "+712345678",
    address: "Central district",
    username: "Romo",
    email: "romo@gmail.com",
    password: "123456",
    role: "admin",
    lastName: "Surname2",
  },
});

interface FormValue {
  username: string;
  password: string;
}

interface ISignIn {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<ISignIn> = ({ setLoader }) => {
  const users = useAppSelector((state) => state.user.users);
  const initialValues: FormValue = { username: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const serializedCurrentUserObject: string =
      localStorage.getItem("currentUser") ?? "";

    console.log("SignIn: ", 1);
    if (serializedCurrentUserObject) {
      console.log("SignIn: ", 2);

      const currentUserObject = JSON.parse(
        serializedCurrentUserObject as string
      );
      dispatch(setCurrentUser(currentUserObject));
      navigate("/manager");
      return;
    }
  }, [dispatch]);

  const validate = (values: FormValue) => {
    const errors: Partial<FormValue> = {};

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 2) {
      errors.password = "Password must be at least 2 characters long";
    }

    return errors;
  };

  const handleSubmit = async (values: FormValue) => {
    setLoader(true);
    try {
      const response = await axios.post("/api/login", values);

      localStorage.setItem("jwtToken", response.data.token);
      const serializedCurrentUserObject = JSON.stringify(response.data.user);
      localStorage.setItem("currentUser", serializedCurrentUserObject);
      dispatch(setCurrentUser(response.data.user));

      // dispatch(
      //   addUser({
      //     id: 5,
      //     organization_id: 24,
      //     organization_name: "FashionStore",
      //     phone: "+700000000",
      //     address: "Shopping Mall",
      //     username: "Sarah",
      //     email: "sarah@gmail.com",
      //     password: "pass1234",
      //     role: "user",
      //     lastName: "Surname5",
      //   })
      // );

      setLoader(false);
      navigate("/manager");
    } catch (error) {
      console.error(error);
      throw new Error("Login failed");
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
          validate={validate}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleChange, errors, isValid, handleBlur, handleSubmit }) => (
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

              <Button type="submit" variant="contained" disabled={!isValid}>
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

import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { setCurrentUser } from "../store/currentUser/slice";
import { addUser, saveUsers } from "../store/user/slice";
import { apiSignUp } from "../data/mock";
import { saveTasks } from "../store/task/slice";

interface FormValue {
  organization_name: string;
  username: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  password: string;
}

interface SignUpProps {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ setLoader }) => {
  const initialValues: FormValue = {
    organization_name: "",
    username: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validate = (values: FormValue) => {
    const errors: Partial<FormValue> = {};

    if (!values.organization_name) {
      errors.organization_name = "OrganizationName is required";
    }

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const onSubmit = async (values: FormValue) => {
    dispatch(setCurrentUser(null));
    dispatch(saveUsers([]));
    dispatch(saveTasks([]));
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("currentUser");

    const user = {
      id: Number(new Date()),
      organization_id: Number(new Date()),
      organization_name: values.organization_name,
      phone: values.phone,
      address: values.address,
      username: values.username,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: "admin",
    };

    try {
      setLoader(true);
      const response = await apiSignUp.post("/api/signup", user);
      localStorage.setItem("jwtToken", response.data.token);
      const serializedCurrentUserObject = JSON.stringify(user);
      localStorage.setItem("currentUser", serializedCurrentUserObject);
      dispatch(setCurrentUser(user));
      setLoader(false);
      navigate("/manager");
    } catch (error) {
      console.error(error);
      throw new Error("SignUp failed");
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
          onSubmit={onSubmit}
        >
          {({ handleChange, errors, isValid, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <TextField
                error={!!errors.organization_name}
                onBlur={handleBlur}
                onChange={handleChange}
                id="organization_name"
                name="organization_name"
                placeholder="Organization name*"
                className="input-wrapper"
                label="Organization name"
                type="text"
                helperText={
                  errors.organization_name ? errors.organization_name : ""
                }
              />

              <TextField
                error={!!errors.username}
                onBlur={handleBlur}
                onChange={handleChange}
                id="username"
                name="username"
                placeholder="Username*"
                className="input-wrapper"
                label="Username"
                type="text"
                helperText={errors.username ? errors.username : ""}
              />

              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                id="phone"
                name="phone"
                className="input-wrapper"
                label="Phone"
                type="tel"
              />

              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                id="address"
                name="address"
                className="input-wrapper"
                label="Address"
                type="text"
              />

              <TextField
                error={!!errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                id="email"
                name="email"
                className="input-wrapper"
                label="Email"
                type="email"
                helperText={errors.email ? errors.email : ""}
              />

              <TextField
                error={!!errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                id="password"
                name="password"
                className="input-wrapper"
                placeholder="Password*"
                label="Password"
                type="password"
                autoComplete="current-password"
                helperText={errors.password ? errors.password : ""}
              />

              <Button type="submit" variant="contained" disabled={!isValid}>
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default SignUp;

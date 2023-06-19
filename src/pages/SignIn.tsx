import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { setCurrentUser } from "../store/currentUser/slice";
import { apiLogin } from "../data/mock";


interface FormValue {
  username: string;
  password: string;
}

interface ISignInProps {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<ISignInProps> = ({ setLoader }) => {
  const initialValues: FormValue = { username: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const serializedCurrentUserObject: string =
      localStorage.getItem("currentUser") ?? "";

    if (serializedCurrentUserObject) {
      const currentUserObject = JSON.parse(
        serializedCurrentUserObject as string
      );

      dispatch(setCurrentUser(currentUserObject));
      navigate("/manager");
      return;
    }
  }, []);

  const validate = (values: FormValue) => {
    const errors: Partial<FormValue> = {};

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 2 characters long";
    }

    return errors;
  };

  const handleSubmit = async (values: FormValue) => {
    try {
      setLoader(true);
      const response = await apiLogin.post("/api/login", values);
      localStorage.setItem("jwtToken", response.data.token);
      const serializedCurrentUserObject = JSON.stringify(response.data.user);
      localStorage.setItem("currentUser", serializedCurrentUserObject);
      dispatch(setCurrentUser(response.data.user));
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

//import React from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../../store";
import { User, addUser } from "../../store/user/slice";
//import { User } from "../../store/types";

interface FormValue {
  username: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserFormProps {
  handleClose: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ handleClose }) => {
  const initialValues: FormValue = {
    username: "",
    lastName: "",
    email: "",
    password: "",
  };

  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();

  if (!currentUser) {
    return null;
  }

  // 123456890-
  const validate = (values: FormValue) => {
    const errors: Partial<FormValue> = {};

    if (!values.username) {
      errors.password = "Username is required";
    }

    if (!values.lastName) {
      errors.lastName = "lastName is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  const handleSubmit = (values: FormValue) => {
    //console.log(values);
    dispatch(
      addUser({
        id: Date.now(),
        organization_id: currentUser["organization_id"],
        organization_name: currentUser["organization_name"],
        phone: null,
        address: null,
        username: values.username,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role: "user",
      })
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleChange, errors, isValid, dirty, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <TextField
            error={!!errors.username && !dirty}
            onBlur={handleBlur}
            onChange={handleChange}
            value={""}
            id="username"
            name="username"
            placeholder="Username"
            className="input-wrapper"
            label="Username"
            type="text"
            helperText={!!errors.username && !dirty ? errors.username : ""}
          />

          <TextField
            error={!!errors.lastName && !dirty}
            onBlur={handleBlur}
            onChange={handleChange}
            id="lastName"
            name="lastName"
            placeholder="Last name"
            className="input-wrapper"
            label="Last Name"
            type="text"
            helperText={!!errors.lastName && !dirty ? errors.lastName : ""}
          />

          <TextField
            error={!!errors.email && !dirty}
            onBlur={handleBlur}
            onChange={handleChange}
            id="email"
            name="email"
            placeholder="Email"
            className="input-wrapper"
            label="Email"
            type="email"
            helperText={!!errors.email && !dirty ? errors.email : ""}
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
            style={{ marginRight: 10 }}
            type="submit"
            variant="contained"
            disabled={isValid && dirty ? false : true}
          >
            Add User
          </Button>

          <Button type="button" variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Form>
      )}
    </Formik>
  );
};

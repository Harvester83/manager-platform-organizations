import React from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../../store";
import { addUser } from "../../store/user/slice";
import { apiUsers } from "../../data/mock";

interface FormValue {
  username: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserAddFormProps {
  handleClose: () => void;
}

export const UserAddForm: React.FC<UserAddFormProps> = ({ handleClose }) => {
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

  const validate = (values: FormValue) => {
    const errors: Partial<FormValue> = {};

    if (!values.username) {
      errors.username = "Username is required";
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

  const onSubmit = async (values: FormValue) => {
    const newUser = {
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
    };
    try {
      const response = await apiUsers.post("/api/users", newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      dispatch(addUser(response.data));
    } catch (error) {
      throw new Error("Error");
    }
  };

  return (
    <>
      <h3 className="title-h3 title-h3_mb">Add User</h3>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
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
              error={!!errors.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              id="lastName"
              name="lastName"
              placeholder="Last name"
              className="input-wrapper"
              label="Last Name"
              type="text"
              helperText={errors.lastName ? errors.lastName : ""}
            />

            <TextField
              error={!!errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              id="email"
              name="email"
              placeholder="Email"
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
              label="Password"
              type="password"
              autoComplete="current-password"
              helperText={errors.password ? errors.password : ""}
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
    </>
  );
};

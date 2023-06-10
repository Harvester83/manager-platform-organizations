import { Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../../store";
import { User, editUser } from "../../store/user/slice";
import { useFormik } from "formik";

interface FormValue {
  username: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserEditFormProps {
  handleClose: () => void;
  user: User | null;
}

export const UserEditForm: React.FC<UserEditFormProps> = ({
  handleClose,
  user,
}) => {
  const formik = useFormik({
    initialValues: {
      username: user?.username,
      lastName: user?.lastName,
      email: user?.email,
      password: user?.password,
    },

    onSubmit: (values) => handleSubmit(values as FormValue),

    validate: (values) => {
      const errors: Partial<FormValue> = {};
      if (!values.username) {
        errors.username = "Username is required!";
      }

      if (!values.lastName) {
        errors.lastName = "Last name is required!";
      }

      if (!values.email) {
        errors.email = "Email is required!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address!";
      }

      if ((values.password as string).length < 6) {
        errors.password = "Password must be at least 6 characters long";
      }

      return errors;
    },
  });

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

  const handleSubmit = (values: FormValue) => {
    console.log("handleSubmit", values);

    dispatch(
      editUser({
        id: user?.id as number,
        organization_id: user?.organization_id as number,
        organization_name: user?.organization_name as string,
        phone: user?.phone as string,
        address: user?.address as string,
        username: values.username,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role: user?.role as string,
      })
    );
  };

  return (
    <>
      <h3 className="title-h3 title-h3_mb">Edit User</h3>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleBlur, dirty }) => (
          <Form onSubmit={formik.handleSubmit}>
            <TextField
              error={!formik.values.username && !dirty}
              onBlur={handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              id="username"
              name="username"
              placeholder="Username"
              className="input-wrapper"
              label="Username"
              type="text"
              helperText={
                !formik.values.username && !dirty
                  ? formik.errors.username
                  : null
              }
            />

            <TextField
              error={!formik.values.lastName && !dirty}
              onBlur={handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              id="lastName"
              name="lastName"
              placeholder="Last name"
              className="input-wrapper"
              label="Last Name"
              type="text"
              helperText={
                !formik.values.lastName && !dirty
                  ? formik.errors.lastName
                  : null
              }
            />

            <TextField
              error={!formik.values.email && !dirty}
              onBlur={handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              id="email"
              name="email"
              placeholder="Email"
              className="input-wrapper"
              label="Email"
              type="email"
              helperText={
                !formik.values.email && !dirty ? formik.errors.email : null
              }
            />

            <TextField
              error={!formik.values.password && !dirty}
              onBlur={handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              id="password"
              name="password"
              className="input-wrapper"
              label="Password"
              type="password"
              autoComplete="current-password"
              helperText={
                !formik.values.password && !dirty ? formik.errors.password : ""
              }
            />

            <Button
              style={{ marginRight: 10 }}
              type="submit"
              variant="contained"
              disabled={formik.isValid && formik.dirty ? false : true}
            >
              Edit
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

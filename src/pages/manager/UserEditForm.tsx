import { Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../../store";
import { User, addUser } from "../../store/user/slice";
import { useFormik } from "formik";
import Yup from "yup";

interface FormValue {
  username: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserEditFormProps {
  handleClose: () => void;
  editUser: User | null;
}

// Define the Yup schema
// const SignupSchema = Yup.object().shape({
//   username: Yup.string().required('Username is required'),
// });

// // Validation function
// const validateForm = async (values: any) => {
//   try {
//     await SignupSchema.validate(values, { abortEarly: false });
//   } catch (errors) {
//     const validationErrors = {};
//     errors.inner.forEach((error) => {
//       validationErrors[error.path] = error.message;
//     });
//     return validationErrors;
//   }
// };

export const UserEditForm: React.FC<UserEditFormProps> = ({
  handleClose,
  editUser,
}) => {
  const formik = useFormik({
    initialValues: {
      username: editUser?.username,
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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

  const handleChange = () => {
    console.log(1);
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
      // validate={validateForm}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Username is required"),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, isValid, dirty, handleBlur }) => (
        <Form onSubmit={formik.handleSubmit}>
          <TextField
            error={!!errors.username && !dirty}
            onBlur={handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
            id="username"
            name="username"
            placeholder="Username"
            className="input-wrapper"
            label="Username"
            type="text"
            helperText={!!errors.username && !dirty ? errors.username : ""}
          />

          {/* <TextField
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
          /> */}

          <Button
            style={{ marginRight: 10 }}
            type="submit"
            variant="contained"
            disabled={isValid && dirty ? false : true}
          >
            {editUser ? "Edit" : "Add User"}
          </Button>

          <Button type="button" variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Form>
      )}
    </Formik>
  );
};

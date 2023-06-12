import { Button, IconButton, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../../store";
import { User, editUser } from "../../store/user/slice";
import { useFormik } from "formik";
import { Task, editTask } from "../../store/task/slice";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "moment";

interface FormValue {
  name: string;
  description: string;
  deadline: string;
  status: string;
  employee_assigned: Array<number> | null;
}

interface TaskEditFormProps {
  handleClose: () => void;
  task: Task | null;
}

export const TaskEditForm: React.FC<TaskEditFormProps> = ({
  handleClose,
  task,
}) => {
  const employees = useAppSelector((state) => state.user.users);
  const tasks = useAppSelector((state) => state.task.tasks);
  //console.log(tasks);

  const formik = useFormik({
    initialValues: {
      name: task?.name,
      description: task?.description,
      deadline: task?.deadline,
      status: task?.status,
      employee_assigned: task?.employee_assigned,
    },

    onSubmit: (values) => handleSubmit(values as FormValue),

    validate: (values) => {
      const errors: Partial<FormValue> = {};
      if (!values.name) {
        errors.name = "Name is required!";
      }

      //   if (!values.lastName) {
      //     errors.lastName = "Last name is required!";
      //   }

      //   if (!values.email) {
      //     errors.email = "Email is required!";
      //   } else if (
      //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      //   ) {
      //     errors.email = "Invalid email address!";
      //   }

      //   if ((values.password as string).length < 6) {
      //     errors.password = "Password must be at least 6 characters long";
      //   }

      return errors;
    },
  });

  const initialValues: FormValue = {
    name: "",
    description: "",
    deadline: "",
    status: "",
    employee_assigned: null,
  };

  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();

  if (!currentUser) {
    return null;
  }

  const handleDeleteEmployee = (id: number) => {
    const currentTask = tasks.find((item) => item.id === task?.id);
    const currentTaskEmployee = (
      currentTask?.employee_assigned as number[]
    ).filter((item) => item !== id);

    console.log({ task }, id);
    console.log(currentTaskEmployee);

    dispatch(
      editTask({
        id: task?.id as number,
        name: task?.name as string,
        task_organization_id: task?.task_organization_id as number,
        description: task?.description as string,
        deadline: task?.deadline as string,
        status: task?.status as string,
        employee_assigned: currentTaskEmployee as [],
      })
    );
  };

  const handleSubmit = (values: FormValue) => {
    console.log("values", {
      id: task?.id as number,
      name: values.name,
      task_organization_id: task?.task_organization_id as number,
      description: values.description,
      deadline: values.deadline,
      status: values.status,
      employee_assigned: values.employee_assigned,
    });
    dispatch(
      editTask({
        id: task?.id as number,
        name: values.name,
        task_organization_id: task?.task_organization_id as number,
        description: values.description,
        deadline: moment(values.deadline).format("DD.MM.YYYY"),
        status: values.status,
        employee_assigned: values.employee_assigned,
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
              error={!formik.values.name && !dirty}
              onBlur={handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              id="name"
              name="name"
              placeholder="Name"
              className="input-wrapper"
              label="Name"
              type="text"
              helperText={
                !formik.values.name && !dirty ? formik.errors.name : null
              }
            />

            <div className="window-list">
              <h4>Employee assigned</h4>
              <ul style={{ marginBottom: 10 }}>
                {(
                  tasks.find((itemTask) => itemTask.id === task?.id)
                    ?.employee_assigned as number[]
                )
                  .map((item) => employees.filter((emp) => emp.id === item))
                  .flat()
                  .map((user) => (
                    <li key={user?.id}>
                      {user?.username} {user?.lastName}
                      <IconButton
                        onClick={() => handleDeleteEmployee(user?.id)}
                        aria-label="delete"
                        size="small"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </li>
                  ))}
              </ul>
            </div>

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

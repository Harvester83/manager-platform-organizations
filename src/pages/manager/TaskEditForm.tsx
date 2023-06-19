import { Button, IconButton, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { useAppDispatch, useAppSelector } from "../../store";
import { User, editUser } from "../../store/user/slice";
import { useFormik } from "formik";
import { Task, editTask } from "../../store/task/slice";
import ClearIcon from "@mui/icons-material/Clear";
import DateView from "react-datepicker";
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

      if (!values.description) {
        errors.description = "Description is required";
      }

      if (!values.status) {
        errors.status = "Status is required";
      }

      if (!values.deadline) {
        errors.deadline = "Deadline is required";
      }

      return errors;
    },
  });

  // eslint-disable-next-line no-debugger
  // debugger;

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

  const handleEditEmployee = (employee: string) => {
    const selectedEmployees = formik.values.employee_assigned || []; // Handle null or undefined case
    const employeeId =  Number(employee); // Example employee ID to add
    const employeeIds = Array.isArray(selectedEmployees)
      ? [...selectedEmployees, employeeId]
      : [selectedEmployees, employeeId];

    dispatch(
        editTask({
          id: task?.id as number,
          name: formik.values.name as string,
          task_organization_id: task?.task_organization_id as number,
          description: formik.values.description as string,
          deadline: formik.values.deadline as string,
          status: formik.values.status as string,
          employee_assigned: employeeIds,
        })
      );
  };

  const handleDeleteEmployee = (id: number) => {
    const currentTask = tasks.find((item) => item.id === task?.id);
    const currentTaskEmployee = (
      currentTask?.employee_assigned as number[]
    ).filter((item) => item !== id);

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
    dispatch(
      editTask({
        id: task?.id as number,
        name: values.name,
        task_organization_id: task?.task_organization_id as number,
        description: values.description,
        deadline: moment(values.deadline).format("DD.MM.YYYY"),
        status: values.status,
        employee_assigned: [],
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

            <div className="textarea-wrapper">
              <Field
                as="textarea"
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                rows={10}
                cols={50}
                placeholder="Write task description"
                className={formik.errors.description && "error bb"}
              />
              {formik.errors.description && (
                <p className="error-message">{formik.errors.description}</p>
              )}
            </div>

            <div className="select-wrapper">
              <Field
                as="select"
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
                id="status"
                className={formik.errors.status && "error"}
              >
                <option value="planning">Planning</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
                <option value="planning">Planning</option>
              </Field>

              {formik.errors.status && (
                <p className="error-message">{formik.errors.status}</p>
              )}
            </div>

            <div className="select-wrapper">
              <Field
                as="select"
                name="employee_assigned"
                // onChange={(e: any) => formik.setFieldValue("employee_assigned", e.target.value)}
                onChange={(e: any) => handleEditEmployee(e.target.value)}
                id="employee_assigned"
              >
                {employees.map((employee: User) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.username} {employee.lastName}
                  </option>
                ))}
              </Field>
            </div>

            <div className="formpicker-wrapper">
              <Field
                name="deadline"
                onChange={formik.handleChange}
                value={formik.values.deadline}
                id="deadline"
                className={formik.values.deadline && "error"}
              >
                {({ form, field }: { form: FormikProps<any>; field: any }) => {
                  const { setFieldValue } = form;
                  const { value, ...rest } = field;

                  return (
                    <DateView
                      {...field}
                      {...rest}
                      selected={value}
                      className="date-view"
                      placeholderText="DD.MM.YYYY"
                      onChange={(val) => setFieldValue("deadline", val)}
                      dateFormat={"dd.MM.yyyy"}
                    />
                  );
                }}
              </Field>

              {formik.errors.deadline && (
                <p className="error-message">{formik.errors.deadline}</p>
              )}
            </div>

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

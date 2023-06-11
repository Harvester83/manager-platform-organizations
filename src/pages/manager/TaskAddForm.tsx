import React from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { useAppDispatch, useAppSelector } from "../../store";
import { addTask } from "../../store/task/slice";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import moment from "moment";
import { User } from "../../store/user/slice";

interface FormValue {
  name: string;
  description: string;
  deadline: string;
  status: string;
  employee_assigned: Array<number> | null;
}

interface TaskAddFormProps {
  handleClose: () => void;
}

export const TaskAddForm: React.FC<TaskAddFormProps> = ({ handleClose }) => {
  const initialValues: FormValue = {
    name: "",
    description: "",
    deadline: "",
    status: "",
    employee_assigned: null,
  };

  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.user.users);

  const validate = (values: FormValue) => {
    const errors: Partial<FormValue> = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.status) {
      errors.status = "Status is required";
    }

    if (!values.description) {
      errors.description = "Description is required";
    }

    if (!values.deadline) {
      errors.deadline = "Deadline is required";
    }

    return errors;
  };

  const handleSubmit = (values: FormValue) => {
    console.log("values: ", {
      id: Date.now(),
      name: values.name,
      task_organization_id: Date.now() * 2,
      description: values.description,
      deadline: moment(values.deadline).format("DD.MM.YYYY"),
      status: values.status,
      employee_assigned: [Number(values.employee_assigned)],
    });

    dispatch(
      addTask({
        id: Date.now(),
        name: values.name,
        task_organization_id: Date.now() * 2,
        description: values.description,
        deadline: moment(values.deadline).format("DD.MM.YYYY"),
        status: values.status,
        employee_assigned: values.employee_assigned,
      })
    );
  };

  return (
    <>
      <h3 className="title-h3 title-h3_mb">Add Task</h3>

      <Formik
        initialValues={initialValues}
        validate={validate}
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
              error={!!errors.name && !dirty}
              onBlur={handleBlur}
              onChange={handleChange}
              id="name"
              name="name"
              placeholder="Name"
              className="input-wrapper"
              label="Name"
              type="text"
              helperText={!!errors.name && !dirty ? errors.name : ""}
            />

            <div className="textarea-wrapper">
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={10}
                cols={50}
                placeholder="Write task description"
                className={errors.description && "error"}
              />

              <ErrorMessage
                name="description"
                component={() => (
                  <p className="error-message">{errors.description}</p>
                )}
              />
            </div>

            <div className="select-wrapper">
              <Field
                as="select"
                name="status"
                id="status"
                className={errors.status && "error"}
              >
                <option value="planning">Planning</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
                <option value="planning">Planning</option>
              </Field>

              <ErrorMessage
                name="status"
                component={() => (
                  <p className="error-message">{errors.status}</p>
                )}
              />
            </div>

            <div className="select-wrapper">
              <Field
                as="select"
                name="employee_assigned"
                id="employee_assigned"
              >
                {employees.map((employee: User) => (
                  <option value={employee.id}>
                    {employee.username} {employee.lastName}
                  </option>
                ))}
              </Field>
            </div>

            <div className="formpicker-wrapper">
              <Field
                name="deadline"
                id="deadline"
                className={errors.deadline && "error"}
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

              <ErrorMessage
                name="deadline"
                component={() => (
                  <p className="error-message">{errors.deadline}</p>
                )}
              />
            </div>

            <Button
              style={{ marginRight: 10 }}
              type="submit"
              variant="contained"
              disabled={isValid && dirty ? false : true}
            >
              Add Task
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

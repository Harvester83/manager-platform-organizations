import React from "react";
import { Button, TextField } from "@mui/material";
// import Textarea from '@mui/joy/Textarea';
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../../store";
import { addTask } from "../../store/task/slice";

interface FormValue {
  //   id: number;
  //   task_organization_id: number;

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

  const handleSubmit = (values: FormValue) => {

    console.log(2, values);
    // dispatch(
    //   addTask({
    //     id: Date.now(),
    //     name: values.name,
    //     task_organization_id: Date.now() * 2,
    //     description: values.description,
    //     deadline: values.deadline,
    //     status: values.status,
    //     employee_assigned: values.employee_assigned,
    //   })
    // );
  };

  return (
    <>
      <h3 className="title-h3 title-h3_mb">Add Task</h3>

      <Formik
        initialValues={initialValues}
        //validate={validate}
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
            {/* <TextField 
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
            /> */}

            <div className="textarea-wrapper">
              <textarea id="describe" name="describe" placeholder="Describe" rows={10} cols={50} />
            </div>

            <Button
              style={{ marginRight: 10 }}
              type="submit"
              variant="contained"
              //disabled={isValid && dirty ? false : true}
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

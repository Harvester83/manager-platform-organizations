import React from "react";
import { DataEdit, TypeForm } from "./Manager";
import { User } from "../../store/user/slice";
import { Task } from "../../store/task/slice";
import { UserEditForm } from "./UserEditForm";
import { UserAddForm } from "./UserAddForm";
import { TaskAddForm } from "./TaskAddForm";
import { TaskEditForm } from "./TaskEditForm";

interface FormWrapperProps {
  type: TypeForm | null;
  data?: DataEdit | null;
  handleClose: () => void;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  type,
  data,
  handleClose,
}) => {
  switch (type) {
    case TypeForm.EditUser:
      return (
        <UserEditForm
          handleClose={handleClose}
          user={data?.userEditData as User}
        />
      );
      break;

    case TypeForm.AddUser:
      return <UserAddForm handleClose={handleClose} />;
      break;

    case TypeForm.EditTask:
      return (
        <TaskEditForm
          handleClose={handleClose}
          task={data?.taskEditData as Task}
        />
      );
      break;

    case TypeForm.AddTask:
      return <TaskAddForm handleClose={handleClose} />;
      break;

    default:
      <h2>Something is wrong</h2>;
      break;
  }

  return <div></div>;
};

export default FormWrapper;

import React from "react";
import { TypeForm } from "./Manager";
import { User } from "../../store/user/slice";
import { Task } from "../../store/task/slice";
import { UserEditForm } from "./UserEditForm";
import { UserAddForm } from "./UserAddForm";

interface FormWrapperProps {
  type: TypeForm | null;
  data?: User | Task | null;
  handleClose: () => void;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ type, data, handleClose }) => {
  switch (type) {
    case TypeForm.EditUser:
      return <UserEditForm handleClose={handleClose} user={data as User} />;
      break;

    case TypeForm.AddUser:
      return <UserAddForm handleClose={handleClose} />;
      break;

    default:
      <h2>Something is wrong</h2>;
      break;
  }

  return <div></div>;
};

export default FormWrapper;

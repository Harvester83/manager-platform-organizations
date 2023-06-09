import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalWindowProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ padding: "20px" }}>Subscribe</DialogTitle>
      <DialogContent style={{ padding: "20px" }}>{children}</DialogContent>
    </Dialog>
  );
};

export default ModalWindow;

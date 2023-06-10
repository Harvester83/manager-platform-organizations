import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

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
  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent style={{ padding: "20px" }}>
        <div className="modal-content">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWindow;

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface Props {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "info" | "warning";
  handleClose: () => void;
}

function CustomSnackbar({
  open,
  message,
  severity = "success",
  handleClose,
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
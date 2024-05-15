import React from "react"
import Snackbar from "@mui/material/Snackbar"
import { Box, Button } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SnackbarContent from '@mui/material/SnackbarContent';


const SuccessSnackbar = ({ message, open, setOpen }) => {


  const handleClose = () => {
    setOpen({message : "", open : false})
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          message={message}
          action={action}
          sx={{
            backgroundColor: "#2e7d32",
            color: "white",
            borderRadius: "8px",
          }}
        />
      </Snackbar>
    </Box>
  )
}

export default SuccessSnackbar

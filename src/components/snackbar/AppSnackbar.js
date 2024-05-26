import React from "react"
import Snackbar from "@mui/material/Snackbar"
import { Box } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SnackbarContent from '@mui/material/SnackbarContent';


const AppSnackbar = ({ message, open, setOpen, color }) => {


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
            backgroundColor: color,
            color: "white",
            borderRadius: "8px",
          }}
        />
      </Snackbar>
    </Box>
  )
}

export default AppSnackbar

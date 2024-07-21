import React from "react"
import { Modal as BaseModal } from "@mui/base/Modal"
import { styled, css } from "@mui/system"
import Fade from "@mui/material/Fade"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { Typography, Stack, Button as MuiButton } from "@mui/material"
import { MenuItem, Select } from "@mui/material"
import { red, blue } from "@mui/material/colors"
import { FormControl, InputLabel } from "@mui/material"

const DateModal = ({ openModal, setOpenModal }) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={openModal}>
          <ModalContent sx={style}>
            <h2
              id="transition-modal-title"
              className="modal-title"
              style={{ marginBottom: "1.5rem" }}
            >
              Date Range
            </h2>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <TextField
                label="Number"
                type="text"
                size="small"
                sx={{ width: "auto" }}
              />
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Unit</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Sort By"
                  size="small"
                  sx={{ bgcolor: "white" }}
                >
                  <MenuItem>Day</MenuItem>
                  <MenuItem>Month</MenuItem>
                  <MenuItem>Year</MenuItem>
                </Select>
              </FormControl>
              <MuiButton size="small" variant="contained" sx={{ bgcolor: blue[700] }}>
                Add
              </MuiButton>
            </Box>
            <Box marginTop={1} />
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
            }}>
            <Typography variant="h6" className="modal-description">1 Year</Typography>
            <MuiButton
          variant="contained"
          sx={{ backgroundColor: red[500], color : "white" }}
        >
          Delete
        </MuiButton>
            </Box>
            
            <Box marginTop={2}/>
            {/*************************************************BUTTON************************************************** */}
            <Stack direction="row" justifyContent="end" spacing={1}>
              <MuiButton
                variant="outlined"
                size="small"
                sx={{ color: "black" }}
              >
                Cancel
              </MuiButton>
              <MuiButton variant="contained" size="small">Save</MuiButton>
            </Stack>
          </ModalContent>
        </Fade>
      </Modal>
    </>
  )
}

const Backdrop = React.forwardRef(function Backdrop({ open, ...other }, ref) {
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  )
})


const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
}

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
}

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
)

export default DateModal

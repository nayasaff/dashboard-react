import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/UserReducer';
import { createTheme } from "@mui/material"
import AppSnackbar from '../snackbar/AppSnackbar';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  breakpoints: {
    values: {
      sm: 0,
      md: 769,
      lg: 1024,
      xl: 1350,
    },
  },
});

export default function DeleteModal({openDialogue, setOpenDialogue, userId}) {

    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const removeUser = async() => {
        try{
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/users/delete/${userId}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })

            if(response.status === 200){
                setOpenDialogue(false)
                dispatch(deleteUser(userId))
            }
        }
        catch(error){
          if(error.response && error.response.status === 403){
            setErrorMessage(error.response.data.message)
            
          }
          else if(error.response && error.response.status === 401){
            navigate("/login", {state : {message : "Your session has expired. Please login again."}})
          }
        }
    }

  return (
    <React.Fragment>
      <Dialog
        open={openDialogue}
        onClose={()=> setOpenDialogue(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: theme.breakpoints.values.md, // Respect custom breakpoints
            [theme.breakpoints.up('lg')]: {
              maxWidth: theme.breakpoints.values.lg,
            },
            [theme.breakpoints.up('xl')]: {
              maxWidth: theme.breakpoints.values.xl,
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this user?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           This user will be permanently deleted from the database.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' style={{ color: red["A700"], border : `1.5px ${red["A700"]} solid
          ` }} onClick={()=> setOpenDialogue(false)}>No</Button>
          <Button variant='contained' style={{ backgroundColor: red["A700"] }} onClick={()=> removeUser()} >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <AppSnackbar message={errorMessage} onClose={()=> setErrorMessage(false)} color="#d32f2f" />
    </React.Fragment>
  );
}
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../redux/UserReducer';

export default function DeleteModal({openDialogue, setOpenDialogue, userId}) {

    const dispatch = useDispatch()

    const removeUser = async() => {
        try{
            const response = await axios.delete(`http://localhost:5000/users/delete/${userId}`, {
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
            console.log(error)
        }
    }

  return (
    <React.Fragment>
      <Dialog
        open={openDialogue}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
    </React.Fragment>
  );
}
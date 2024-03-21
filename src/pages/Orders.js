import React from "react"
import CancelledOrders from "../components/CancelledOrders"
import TimeTake from "../components/TimeTaken"
import {Box, Typography, FormControl, Select, MenuItem, InputLabel} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {setIsAscending} from '../redux/AppReducer'
import TableComponent from "../components/TableComponent"
const Orders = () => {

  const isAscending = useSelector((state) => state.app.isAscending)
  const dispatch = useDispatch()


  return (
    <>
      <div style={{display : 'flex', alignItems : 'center', gap : '1rem'}}>
      <Typography variant="h5" gutterBottom>
        Sort by
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Rate</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Rate"
            value={isAscending}
            onChange={(e) => dispatch(setIsAscending(e.target.value) )}
          >
            <MenuItem value={false}>Highest</MenuItem>
            <MenuItem value={true}>Lowest</MenuItem>
          </Select>
        </FormControl>
      </div>
     
      <CancelledOrders/>
      <Box m={4} />
      <TimeTake/>

     </>
  )
}

export default Orders

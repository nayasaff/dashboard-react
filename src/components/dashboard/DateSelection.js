import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useDispatch, useSelector } from "react-redux"
import { setDuration, setStartDate, setEndDate } from "../../redux/AppReducer"
import dayjs from "dayjs"
import axios from "axios";


const DateSelection = () => {

    const dispatch = useDispatch()
    const state = useSelector((state) => state.app)

    const [dateRanges, setDateRanges] = useState()

    const {duration,startDate, endDate } = state


    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/items/date_range`)
      .then((res) => {
        const { data } = res
        setDateRanges(data)
        if(!duration){
          dispatch(setDuration(data[data.length -1]))
          dispatch(setStartDate(dayjs(data[data.length -1].start_date)))
          dispatch(setEndDate(dayjs(data[data.length -1].end_date)))
        }
        
      })
    }, [])

    const handleChange = (e) => {
      const value = e.target.value
      const parsedDate = JSON.parse(value)

      dispatch(setStartDate(dayjs( parsedDate.start_date )))
      dispatch(setEndDate(dayjs( parsedDate.end_date ) ))
      dispatch(setDuration(parsedDate))
    }



    if(!dateRanges){
      return <div></div>
    }
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{display : "flex", justifyContent : {
          sm : "start",
          md : "start",
          lg : "end"
        }, gap : "1rem"}}>
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small-label">Duration</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Sort By"
                size="small"
                sx={{ bgcolor: "white" }}
                value={JSON.stringify(duration)}
                getOptionLabel={(option) => option.name}
                onChange={(e) => handleChange(e)}
              >
               {dateRanges.map((date, index) =>
                <MenuItem key={index} value={JSON.stringify(date)}>{date.name}</MenuItem> 
                 )}
              </Select>
            </FormControl>
            {/*Start date*/}
            <DatePicker
              label="Start Date"
              value={startDate}
              slotProps={{ textField: { size: "small" } }}
              onChange={(newValue) => dispatch(setStartDate(newValue))}
              sx={{ bgcolor: "white", width: {
                sm : "150px",
                md : "200px"
              } }}
              maxDate={endDate}
            />
            {/*End date*/}
            <DatePicker
              label="End Date"
              value={endDate} //get current date
              slotProps={{ textField: { size: "small" } }}
              onChange={(newValue) => dispatch(setEndDate(newValue))}
              sx={{ bgcolor: "white", width: {
                sm : "150px",
                md : "200px"
              }  }}
              minDate={startDate}
              maxDate={dayjs()}
            />
        </Box>
      </LocalizationProvider>
    );
}

export default DateSelection;

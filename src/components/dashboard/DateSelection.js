import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useDispatch, useSelector } from "react-redux"
import { setDuration, setStartDate, setEndDate } from "../../redux/AppReducer"
import dayjs from "dayjs"


const DateSelection = () => {

    const dispatch = useDispatch()
    const state = useSelector((state) => state.app)

    const [durations, setDurations] = useState()

    const { startDate, endDate, duration } = state

    useEffect(()=>{
      const fetchData = ()=>{
        fetch(`${process.env.REACT_APP_API_URL}/users/duration`)
        .then(response => response.json())
        .then(data => {
          dispatch(setDuration(data[0]))
          setDurations(data)
        } )
      }
      fetchData()
    }, [])


    if(!durations)
      return <div></div>
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{display : "flex", justifyContent : "end"}}>
        <Box
          sx={{
            display: "flex",
            alignItems: {
              sm: "start",
              md: "start",
              lg: "center",
            },
            justifyContent: "space-between",
            gap: "1rem",
            flexDirection: {
              sm: "column",
              md: "column",
              lg: "row",
            },
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small-label">Duration</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Sort By"
                size="small"
                sx={{ bgcolor: "white" }}
                value={duration}
                onChange={(e) => dispatch(setDuration(e.target.value))}
              >
               {durations.map((date) =>
                <MenuItem value={date}>{date}</MenuItem> 
                 )}
                <MenuItem value="all_time">All Time</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </FormControl>
            {/*Start date*/}
            <DatePicker
              label="Start Date"
              value={startDate}
              slotProps={{ textField: { size: "small" } }}
              onChange={(newValue) => dispatch(setStartDate(newValue))}
              sx={{ bgcolor: "white" }}
              maxDate={endDate}
              disabled={duration !== "others"}
            />
            {/*End date*/}
            <DatePicker
              label="End Date"
              value={endDate} //get current date
              slotProps={{ textField: { size: "small" } }}
              onChange={(newValue) => dispatch(setEndDate(newValue))}
              sx={{ bgcolor: "white" }}
              minDate={startDate}
              maxDate={dayjs()}
              disabled={duration !== "others"}
            />
          </div>
        </Box>
        </Box>
      </LocalizationProvider>
    );
}

export default DateSelection;

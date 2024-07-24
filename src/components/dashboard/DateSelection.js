import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useDispatch, useSelector } from "react-redux"
import { setDuration, setStartDate, setEndDate } from "../../redux/AppReducer"
import dayjs from "dayjs"


const durations = ["Yesterday", "Last Week", "Last Month", "All Time"]

const DateSelection = () => {

    const dispatch = useDispatch()
    const state = useSelector((state) => state.app)


    const { startDate, endDate, duration } = state

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{display : "flex", justifyContent : {
          sm : "start",
          md : "start",
          lg : "end"
        }, gap : "1rem"}}>
            {/* <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small-label">Duration</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Sort By"
                size="small"
                sx={{ bgcolor: "white" }}
                defaultValue={duration}
                value={duration}
                onChange={(e) => dispatch(setDuration(e.target.value))}
              >
               {durations.map((date) =>
                <MenuItem value={date}>{date}</MenuItem> 
                 )}
              </Select>
            </FormControl> */}
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

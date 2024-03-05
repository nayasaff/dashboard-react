import * as React from 'react';

import {AppBar, Typography, Box} from "@mui/material"
import Slider from "@mui/material/Slider"
import { styled } from "@mui/material/styles"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useDispatch, useSelector } from 'react-redux';
import { setEndDate, setNumber, setStartDate } from '../redux/Reducer';
import axios from 'axios';
import { Menu } from '@mui/icons-material';


const drawerWidth = 240;

const PrettoSlider = styled(Slider)({
  color: "#17236A",
  height: 6,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    // "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
    //   boxShadow: "inherit",
    // },
    // "&::before": {
    //   display: "none",
    // },
    boxShadow: 'inherit', // Always show shadow
    '&::before': {
      display: 'none',
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 24,
    height: 24,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#17236A",
    transformOrigin: "bottom left",
    transform: "translate(50%, -70%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -70%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
})

export default function Header() {

  const state = useSelector((state) => state);

  const { number, startDate, endDate } = state;
  const dispatch = useDispatch()

  return (
     <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AppBar sx={{ backgroundColor: "white", color: "black" }}>
    <Box
      sx={{
        paddingLeft:  `${drawerWidth + 7}px`,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: "2rem"}}
      >
        <Menu sx={{ cursor : 'pointer', fontSize : '25px' }}/>
        <Typography sx={{marginTop : '0.5rem'}} variant="h5">Count</Typography>
        <div
          style={{
            width: "15rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop : '1rem'
          }}
        >
          <span>1</span>{" "}
          <PrettoSlider
            aria-label="pretto slider"
            min={1}
            max={25}
            value={number}
            onChange={(e) => dispatch(setNumber(e.target.value))}
            valueLabelDisplay="on"
          />
          <span>25</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
          padding : '1rem 0.5rem'
        }}
      >
        <DatePicker label="Start Date"
        value={startDate}
        slotProps={{ textField: { size: 'small' } }}
        onChange={(newValue) => dispatch(setStartDate(newValue))}
        />
        <DatePicker label="End Date"
        value={endDate} //get current date
        slotProps={{ textField: { size: 'small' } }}
        onChange={(newValue) => dispatch(setEndDate(newValue))}
        />
      </div>
    </Box>
  </AppBar>
   </LocalizationProvider>
  );
}
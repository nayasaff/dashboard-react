import React, { useEffect, useState } from "react"
import CancelledOrders from "../components/Dashbaord/CancelledOrders"
import TimeTake from "../components/Dashbaord/TimeTaken"
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Stack,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setIsAscending } from "../redux/AppReducer"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { setEndDate, setNumber, setStartDate } from "../redux/AppReducer"
import Slider from "@mui/material/Slider"
import { styled } from "@mui/material/styles"
import Tag from "../components/Tag"
import axios from "axios"
import { People, ShoppingCart } from "@mui/icons-material"
import TableComponent from "../components/TableComponent"
import DeliveryTime from "../components/Dashbaord/DeliveryTime"

const PrettoSlider = styled(Slider)({
  color: "#17236A",
  height: 6,
  //Slider track (the line that the thumb moves along)
  "& .MuiSlider-track": {
    border: "none",
  },
  //Slider thumb (the circle that moves around the slider)
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    boxShadow: "inherit", // Always show shadow
    "&::before": {
      display: "none",
    },
  },
  //Slider value label (the number that appears on the thumb)
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

const Orders = () => {
  const isAscending = useSelector((state) => state.app.isAscending)
  const dispatch = useDispatch()
  const state = useSelector((state) => state.app)

  const [totalOrders, setTotalOrders] = useState(0)
  const [insights, setInsights] = useState([])

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/all_insights", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => setInsights(res.data))
    } catch (e) {
      console.log(e)
    }
  }, [])

  const { number, startDate, endDate } = state

  useEffect(() => {
    axios
      .get("http://localhost:5000/totalOrders", {
        headers :{
          "Authorization" : localStorage.getItem("token")
        }
      })
      .then((res) => setTotalOrders(res.data.total_orders))
  }, [])

  if(!totalOrders) return <div>Loading...</div>

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <Typography variant="h5">Dashboard</Typography>

            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <div
                style={{
                  width: "15rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "0.2rem",
                }}
              >
                {/*Minimum is one*/}
                <span>1</span>{" "}
                <PrettoSlider
                  aria-label="pretto slider"
                  min={1}
                  max={25}
                  value={number}
                  onChange={(e) => dispatch(setNumber(e.target.value))}
                  valueLabelDisplay="on"
                />
                {/*Maximum is 25*/}
                <span>25</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Sort by</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Sort By"
                size="small"
                value={isAscending}
                onChange={(e) => dispatch(setIsAscending(e.target.value))}
              >
                <MenuItem value={false}>Highest</MenuItem>
                <MenuItem value={true}>Lowest</MenuItem>
              </Select>
            </FormControl>
            {/*Start date*/}
            <DatePicker
              label="Start Date"
              value={startDate}
              slotProps={{ textField: { size: "small" } }}
              onChange={(newValue) => dispatch(setStartDate(newValue))}
            />
            {/*End date*/}
            <DatePicker
              label="End Date"
              value={endDate} //get current date
              slotProps={{ textField: { size: "small" } }}
              onChange={(newValue) => dispatch(setEndDate(newValue))}
            />
          </div>
        </div>
      </LocalizationProvider>
      <Box m={2} />
      <TableComponent insights={insights} setInsights={setInsights}/>
      <Box m={2} />
      <Stack direction="row" spacing={2}>
        <CancelledOrders />
        <Box>
          <Tag
            title="Orders"
            count={totalOrders}
            icon={<ShoppingCart sx={{ fontSize: "3rem" }}/>}
            
          />
          <Box m={2} />
          <Tag 
          title="Vendors"
          count={insights.length}
          icon={<People sx={{ fontSize: "3.2rem" }}/>}
          />
        </Box>
      </Stack>
      <Box m={4} />
      <TimeTake />
      <Box m={1} />
      <DeliveryTime/>
      <Box m={2} />
      
    </>
  )
}

export default Orders

// {location.pathname === "/orders" ? (
//   <Box
//     sx={{
//       paddingLeft: `${drawerWidth + 7}px`,
//       display: "flex",
//       justifyContent: "space-between",
//     }}
//   >
//     {/**Count number that show how many bar chart */}

//     {/*Date range (start date and end date) to display orders in that range */}
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: "0.8rem",
//         padding: "1rem 0.5rem",
//       }}
//     >

//     </div>
//   </Box>
// ) : (
//   <Box sx={{ padding: "1rem 0" }}>Test</Box>
// )}

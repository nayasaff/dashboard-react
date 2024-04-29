import React, { useEffect, useState } from "react"
import IncompletedOrders from "../components/dashbaord/IncompletedOrders"
import TimeTake from "../components/dashbaord/TimeTaken"
import { Box, Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import InputLabel from "@mui/material/InputLabel"
import { FormControl, Select, MenuItem } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setIsAscending } from "../redux/AppReducer"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { setEndDate, setNumber, setStartDate } from "../redux/AppReducer"
import Slider from "@mui/material/Slider"
import { styled } from "@mui/material/styles"
import axios from "axios"
import TableComponent from "../components/dashbaord/TableComponent"
import DeliveryTime from "../components/dashbaord/DeliveryTime"
import LastOrder from "../components/dashbaord/LastOrder"
import HeaderPlaceholder from "../components/placeholder/HeaderPlaceholder"
import Empty from "../components/Empty"

const Orders = () => {
  const isAscending = useSelector((state) => state.app.isAscending)
  const dispatch = useDispatch()
  const state = useSelector((state) => state.app)

  const [totalOrders, setTotalOrders] = useState(0)
  const [insights, setInsights] = useState()
  const [noData, setNoData] = useState(false)
  const [filteredValue, setFilteredValue] = useState({name : "", value : ""})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/all_insights?deliveryDay=${filteredValue.value}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })

        if (response.status === 200) {
          setTotalOrders(response.data.totalOrders)
          setInsights(response.data.insights)
        }
      } catch (e) {
        if (
          e.response.status === 400 &&
          e.response.data.message.includes("No data found")
        ) {
          setNoData(true)
        }
      }
    }
    fetchData()
  }, [filteredValue])

  const { number, startDate, endDate } = state

  if (noData)
    return (
      <Empty/>
    )

  return (
    <>
          {insights && (
          <TableComponent insights={insights} 
          filteredValue={filteredValue}
          setFilteredValue={setFilteredValue}
          />
        )}
        <Box m={3} />
      {insights !== undefined ? <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                sx={{bgcolor: "white"}}
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
              sx={{bgcolor: "white"}}
            />
            {/*End date*/}
            <DatePicker
              label="End Date"
              value={endDate} //get current date
              slotProps={{ textField: { size: "small" } }}
              onChange={(newValue) => dispatch(setEndDate(newValue))}
              sx={{bgcolor: "white"}}
            />
          </div>
        </div>
      </LocalizationProvider> : 
      <HeaderPlaceholder/>
      }
      <Box m={2} />
      <Stack direction="column" spacing={2}>
  
        <IncompletedOrders
          totalOrders={totalOrders}
          insightsLength={insights && insights.length}
        />
        <TimeTake />
        <DeliveryTime />
        <LastOrder />
  
      </Stack>
    </>
  )
}

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

export default Orders

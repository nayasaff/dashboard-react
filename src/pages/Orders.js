import React, { useEffect, useState } from "react"
import IncompletedOrders from "../components/dashbaord/IncompletedOrders"
import TimeTaken from "../components/dashbaord/TimeTaken"
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
import LastOrder from "../components/dashbaord/LastOrder"
import HeaderPlaceholder from "../components/placeholder/HeaderPlaceholder"
import Empty from "../components/Empty"
import { useLocation } from "react-router-dom"
import StockLog from "../components/dashbaord/StockLog"

const api_url = process.env.REACT_APP_API_URL

const Orders = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.app)
  const { number, startDate, endDate, isAscending } = state
  const location = useLocation()


  const [insights, setInsights] = useState()
  const [noData, setNoData] = useState(false)
  const [filteredValue, setFilteredValue] = useState({ name: "", value: "" })

  const [cancelledOrders, setCancelledOrders] = useState()
  const [lastOrders, setLastOrders] = useState()
  const [responseTime, setResponseTime] = useState()
  const [deliveryTime, setDeliveryTime] = useState()
  const [lastUpdatedItems, setLastUpdatedItems] = useState()
  const [stockLogCount, setStockLogCount] = useState()
  const [stockLog, setStockLog] = useState()
  const [totalOrders, setTotalOrders] = useState(0)
  

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${process.env.REACT_APP_API_URL}/orders/totalOrders?startDate=${startDate.format(
        "YYYY-MM-DD"
      )}&endDate=${endDate.format("YYYY-MM-DD")}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }).then(res => setTotalOrders(res.data))
      .catch(err =>{
        if(err.response && err.response.status === 400 && err.response.data.message.includes("No data found")){
          setNoData(true)
        }
      })
    }
    fetchData()
  },[startDate, endDate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${api_url}/orders/all_insights?deliveryDay=${filteredValue.value}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )

        if (response.status === 200) {
          setInsights(response.data)
        }
      } catch (e) {
        if (
          e.response &&
          e.response.status === 400 &&
          e.response.data.message.includes("No data found")
        ) {
          setNoData(true)
        }
      }
    }
    fetchData()
  }, [filteredValue])

  useEffect(() => {
    const fetchData = async () => {

      try {
        const cancelledOrdersResponse = await axios.get(
          `${api_url}/orders/cancellationRate?isAscending=${isAscending}&startDate=${startDate.format(
            "YYYY-MM-DD"
          )}&endDate=${endDate.format("YYYY-MM-DD")}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )

        setCancelledOrders(cancelledOrdersResponse.data)

        const responseTimeResponse = await axios.get(
          `${api_url}/orders/responseTime?isAscending=${isAscending}&startDate=${startDate.format(
            "YYYY-MM-DD"
          )}&endDate=${endDate.format("YYYY-MM-DD")}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        setResponseTime(responseTimeResponse.data)

        const deliveryTimeResponse = await axios.get(
          `${api_url}/orders/deliveryTime?isAscending=${isAscending}&startDate=${startDate.format(
            "YYYY-MM-DD"
          )}&endDate=${endDate.format("YYYY-MM-DD")}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        setDeliveryTime(deliveryTimeResponse.data)

      } catch (e) {
        setNoData(true)
      }
    }

    fetchData()
  }, [isAscending, startDate, endDate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lastItemUpdatedResponse = await axios.get(
          `${api_url}/items/lastItemUpdated?isAscending=${isAscending}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        setLastUpdatedItems(lastItemUpdatedResponse.data)

        const lastOrdersResponse = await axios.get(
          `${api_url}/orders/lastOrder?isAscending=${isAscending}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        setLastOrders(lastOrdersResponse.data)

        const stockLogCountResponse = await axios.get(
          `${api_url}/items/stockLogCount?isAscending=${isAscending}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        setStockLogCount(stockLogCountResponse.data)

        const stockLogResponse = await axios.get(
          `${api_url}/items/stockLog?isAscending=${isAscending}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        setStockLog(stockLogResponse.data)

        
      } catch (e) {}
    }
    fetchData()
  }, [isAscending])

  if (noData) return <Empty />

  return (
    <>
      {insights && (
        <TableComponent
          insights={insights}
          filteredValue={filteredValue}
          setFilteredValue={setFilteredValue}
        />
      )}
      {location.pathname !== "/table" && (
        <React.Fragment>
          <Box marginTop={3} />
          {insights !== undefined ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                  <Typography variant="h5">Dashboard</Typography>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
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
                    <InputLabel id="demo-select-small-label">
                      Sort by
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      label="Sort By"
                      size="small"
                      value={isAscending}
                      onChange={(e) => dispatch(setIsAscending(e.target.value))}
                      sx={{ bgcolor: "white" }}
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
                    sx={{ bgcolor: "white" }}
                    maxDate={endDate}
                  />
                  {/*End date*/}
                  <DatePicker
                    label="End Date"
                    value={endDate} //get current date
                    slotProps={{ textField: { size: "small" } }}
                    onChange={(newValue) => dispatch(setEndDate(newValue))}
                    sx={{ bgcolor: "white" }}
                    minDate={startDate}
                  />
                </div>
              </Box>
            </LocalizationProvider>
          ) : (
            <HeaderPlaceholder />
          )}
          <Box marginTop={2} />
          <Stack direction="column" sx={{ gap: "1rem" }}>
            <IncompletedOrders
            totalOrders={totalOrders}
              insightsLength={insights && insights.length}
              cancelledOrders={cancelledOrders}
            />
            <TimeTaken
              responseTime={responseTime}
              deliveryTime={deliveryTime}
            />
            <LastOrder
              lastOrders={lastOrders}
              lastUpdatedItems={lastUpdatedItems}
            />
            <StockLog stockLog={stockLog} stockLogCount={stockLogCount} />
          </Stack>
        </React.Fragment>
      )}
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

import React, { useEffect, useState } from "react"
import IncompletedOrders from "../components/dashboard/IncompletedOrders"
import TimeTaken from "../components/dashboard/TimeTaken"
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux"
import { setIsAscending } from "../redux/AppReducer"
import { setNumber } from "../redux/AppReducer"
import Slider from "@mui/material/Slider"
import { styled } from "@mui/material/styles"
import TableComponent from "../components/dashboard/TableComponent"
import LastOrder from "../components/dashboard/LastOrder"
import HeaderPlaceholder from "../components/placeholder/HeaderPlaceholder"
import Empty from "../components/Empty"
import StockLog from "../components/dashboard/StockLog"
import DateSelection from "../components/dashboard/DateSelection"
import useCachedData from "../hooks/useData"

const api_url = process.env.REACT_APP_API_URL

const Orders = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.app)
  const { number, startDate, endDate, isAscending } = state
  const [filteredValue, setFilteredValue] = useState({ name: "", value: "" })

  const [loadData, setLoadData] = useState()
  
  const [totalOrders, undefined , noData] = useCachedData(
    `/orders/totalOrders?startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    [startDate, endDate],
    loadData
  )

  const [insights, isLoading] = useCachedData(
    `/orders/all_insights?deliveryDay=${
      filteredValue.value
    }&startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    [startDate, endDate, filteredValue],
    loadData
  )

  const [cancelledOrders] = useCachedData(
    `/orders/cancellationRate?isAscending=${isAscending}&startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    [isAscending, startDate, endDate],
    loadData
  )
  const [responseTime] = useCachedData(
    `/orders/responseTime?isAscending=${isAscending}&startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    [isAscending, startDate, endDate],
    loadData
  )

  console.log(responseTime)
  const [deliveryTime] = useCachedData(
    `/orders/deliveryTime?isAscending=${isAscending}&startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    [isAscending, startDate, endDate], loadData
  )
  const [lastOrders] = useCachedData(
    `/orders/lastOrder?isAscending=${isAscending}&startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    [isAscending, startDate, endDate], loadData
  )
  const [lastUpdatedItems] = useCachedData(
    `/items/lastItemUpdated?isAscending=${isAscending}&startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    [isAscending, startDate, endDate], loadData
  )
  const [stockLogCount] = useCachedData(
    `/items/stockLogCount?isAscending=${isAscending}`,
    [isAscending], loadData
  )
  const [stockLog] = useCachedData(
    `/items/stockLog?isAscending=${isAscending}`,
    [isAscending], loadData
  )

  // const navigate = useNavigate()

  useEffect(() => {
    const checkCache = () => {
      fetch(`${api_url}/checkCache`)
        .then((res) => res.json())
        .then((data) => setLoadData(data))
        .catch((err) => console.log(err))
    }

    checkCache()
  }, [])


  if (noData) return <Empty />

  return (
    <>
      <React.Fragment>
        {insights && <DateSelection />}
        <Box marginTop={2} />
        {insights && (
          <TableComponent
            insights={insights}
            filteredValue={filteredValue}
            setFilteredValue={setFilteredValue}
            isLoading={isLoading}
          />
        )}
        <Box marginTop={3} />
        {insights ? (
          <Box
            sx={{
              display: "flex",
              alignItems: {
                sm: "start",
                md: "start",
                lg: "center",
              },
              gap: "1.5rem",
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
                <InputLabel id="demo-select-small-label">Sort by</InputLabel>
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
            </div>
          </Box>
        ) : (
          <HeaderPlaceholder />
        )}

        <Box marginTop={1} />
        <Stack direction="column" sx={{ gap: "1rem" }}>
          <IncompletedOrders
            totalOrders={totalOrders}
            insightsLength={insights && insights.length}
            cancelledOrders={cancelledOrders}
          />
          <TimeTaken responseTime={responseTime} deliveryTime={deliveryTime} />
          <LastOrder
            lastOrders={lastOrders}
            lastUpdatedItems={lastUpdatedItems}
          />
          <StockLog stockLog={stockLog} stockLogCount={stockLogCount} />
        </Stack>
      </React.Fragment>
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

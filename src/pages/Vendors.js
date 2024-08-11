import axios from "axios"
import React, { useEffect, useState } from "react"
import FormControl from "@mui/material/FormControl"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import { useLocation } from "react-router-dom"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Tag from "../components/Tag"
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import EditCalendar from "@mui/icons-material/EditCalendar";
import Event from "@mui/icons-material/Event";
import MoneyOff from "@mui/icons-material/MoneyOff";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCart";
import Inventory2 from "@mui/icons-material/Inventory2";
import Inventory from "@mui/icons-material/Inventory";
import { TimeStat } from "../components/vendor/TimeStat"
import OrderType from "../components/vendor/OrderType"
import OrderTaken from "../components/vendor/OrderTaken"
import Empty from "../components/Empty"
import VendorPlaceholder from "../components/placeholder/VendorPlaceholder"
import HeaderPlaceholder from "../components/placeholder/HeaderPlaceholder"
import Grid from "@mui/material/Grid"
import Box from "@mui/system/Box"
import DateSelection from "../components/dashboard/DateSelection"
import { useSelector } from "react-redux"
import useCachedData from "../hooks/useData"

const api_url = process.env.REACT_APP_API_URL

const Vendors = () => {
  const [userVendors, setUserVendors] = useState("")
  const [currentVendor, setCurrentVendor] = useState("")
  const [noData, setNoData] = useState(false)
  const [loadData, setLoadData] = useState()

  const location = useLocation()

  const state = useSelector((state) => state.app)
  const { startDate, endDate } = state

  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await axios.get(`${api_url}/users/vendorsOfUser`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },          
        })

        if(response.status === 200) {
          setUserVendors(response.data)
          setCurrentVendor(location.state ? location.state : response.data[0])
        }

        const cacheResponse = await axios.get(`${api_url}/checkCache`)
        if(cacheResponse.status === 200) {
          setLoadData(cacheResponse.data)
        }
      }
      catch(error){
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message.includes("No data found")
        ) {
          setNoData(true)
        }
      }
    }

    fetchData()
  }, [])


  const [insights] = useCachedData(
    `/items/all_insights/${currentVendor._id}?startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    [currentVendor, startDate, endDate],
    loadData
  )
  const [timeStats] = useCachedData(
    `/orders/timeStats/${currentVendor._id}?startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    [currentVendor, startDate, endDate],
    loadData
  )
  const [orderTaken] = useCachedData(
    `/orders/orderTaken/${currentVendor._id}?startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    [currentVendor, startDate, endDate],
    loadData
  )
  const [orderType] = useCachedData(
    `/items/countValues/${currentVendor._id}?startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    [currentVendor, startDate, endDate],
    loadData
  )

  const formateDecimal = (number, percent) => {
    if (typeof number === "string") return number
    if (percent) {
      return number.toFixed(2) + "%"
    }
    return number.toFixed(2)
  }

  if (noData) return <Empty />

  return (
    <Stack direction="column" alignItems="" spacing={2}>
      <Box marginTop={2} />
      {currentVendor ? (
        <Box
          sx={{
            display: "flex",
            gap: {
              sm: "1rem",
              md: "0.7rem",
              lg: "3rem",
            },
            flexDirection: {
              sm: "column",
              md: "column",
              lg: "row",
            },
            alignItems: {
              sm: "start",
              md: "start",
              lg: "center",
            },
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flex: 1,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Select vendor
            </Typography>
            <FormControl
              sx={{
                minWidth: 120,
                width: {
                  sm: "auto",
                  md: "auto",
                  lg: "50%",
                },
                bgcolor: "white",
              }}
            >
              <Autocomplete
                fullWidth
                options={userVendors}
                onChange={(e, value) => setCurrentVendor(value)}
                getOptionLabel={(option) => option["name"]["en"]}
                disableClearable
                defaultValue={currentVendor}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Vendors"
                    size="small"
                    fullWidth
                    variant="outlined"
                    clearIcon={null}
                  />
                )}
              />
            </FormControl>
          </div>
          <DateSelection />
        </Box>
      ) : (
        <HeaderPlaceholder />
      )}

      {insights ? (
        <Grid container spacing={2}>
          <Grid item xl={3} lg={3} md={6} sm={6}>
            <Tag
              title="Total Orders"
              count={insights["total_orders"]}
              icon={<ShoppingCart sx={{ fontSize: "3rem" }} />}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={6}>
            <Tag
              title="Cancelled Orders"
              count={insights["incompleted_orders"]}
              icon={<RemoveShoppingCart sx={{ fontSize: "3rem" }} />}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={6}>
            <Tag
              title="Total Price Loss"
              count={formateDecimal(insights["subtotal_loss"])}
              icon={<MoneyOff sx={{ fontSize: "3rem" }} />}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={6}>
            <Tag
              title="Last Order"
              subtitle="days ago"
              count={insights["last_order"]}
              icon={<Event sx={{ fontSize: "3rem" }} />}
            />
          </Grid>
        </Grid>
      ) : (
        <VendorPlaceholder />
      )}

      <OrderTaken
        orderTaken={orderTaken}
        timeStats={timeStats}
        name={currentVendor["name"] ? currentVendor["name"]["en"] : null}
      />

      <Grid container spacing={2}>
        <TimeStat timeStats={timeStats} />
        <OrderType orderType={orderType} />
      </Grid>
      {insights ? (
        <Grid container spacing={2}>
          <Grid item xl={3} lg={3} md={6} sm={6}>
            <Tag
              title="Total Items"
              count={insights["total_items"]}
              icon={<ShoppingBasket sx={{ fontSize: "3rem" }} />}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={6}>
            <Tag
              title="Last Updated Item"
              subtitle="days ago"
              count={insights["updated_item"]}
              icon={<EditCalendar sx={{ fontSize: "3rem" }} />}
            />
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={6}>
            <Tag
              title="Stock Updates"
              count={insights["stock_update_count"]}
              icon={<Inventory2 sx={{ fontSize: "3rem" }} />}
              subtitle="(Last 2 weeks)"
            />
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={6}>
            <Tag
              title="Items Update"
              count={insights["stock_update"]}
              icon={<Inventory sx={{ fontSize: "3rem" }} />}
              subtitle="(Last 2 weeks)"
            />
          </Grid>
        </Grid>
      ) : (
        <VendorPlaceholder />
      )}
    </Stack>
  )
}

export default Vendors

//tags
//total orders
//cancelled orders %
//total price loss
//last order sinceta

//total items
//last updated item
//added items
//updated items
//stock update count
//% of stock update

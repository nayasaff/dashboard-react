import axios from "axios"
import React, { useEffect, useState } from "react"
import { FormControl, Typography, Stack } from "@mui/material"
import { useLocation } from "react-router-dom"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Tag from "../components/Tag"
import {
  ShoppingBasket,ShoppingCart} from "@mui/icons-material"
import {
  EditCalendar,
  Event,
  MoneyOff,
  RemoveShoppingCart,
} from "@mui/icons-material"
import { Inventory2, Inventory } from "@mui/icons-material"
import { TimeStat } from "../components/vendor/TimeStat"
import OrderType from "../components/vendor/OrderType"
import OrderTaken from "../components/vendor/OrderTaken"
import Empty from "../components/Empty"
import VendorPlaceholder from "../components/placeholder/VendorPlaceholder"
import HeaderPlaceholder from "../components/placeholder/HeaderPlaceholder"
import { Grid } from "@mui/material"

const api_url = process.env.REACT_APP_API_URL

const Vendors = () => {
  const [userVendors, setUserVendors] = useState("")
  const [currentVendor, setCurrentVendor] = useState("")
  const [insights, setInsights] = useState("")
  const [timeStats, setTimeStats] = useState()
  const [orderTaken, setOrderTaken] = useState()
  const [orderType, setOrderType] = useState()
  const [noData, setNoData] = useState(false)

  const location = useLocation()

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${api_url}/users/vendorsOfUser`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setUserVendors(res.data)
          setCurrentVendor(location.state ? location.state : res.data[0])
        })
        .catch((err) => {
          if (
            err.response && err.response.status === 400 &&
            err.response.data.message.includes("No data found")
          ) {
            setNoData(true)
          }
        })
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async() => {
      if (!currentVendor._id) return
      try{
        const allInsightsResponse = await axios.get(`${api_url}/items/all_insights/${currentVendor._id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        setInsights(allInsightsResponse.data)

        const timeStatsResponse = await axios
        .get(`${api_url}/orders/timeStats/${currentVendor._id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        setTimeStats(timeStatsResponse.data)

        const orderTakenResponse = await axios.get(
          `${api_url}/orders/orderTaken/${currentVendor._id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        setOrderTaken(orderTakenResponse.data)
        
        const orderTypeResponse = await axios
        .get(`${api_url}/items/countValues/${currentVendor._id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        setOrderType(orderTypeResponse.data)

      }
      catch(err){
        console.log(err)
      }
    }

    fetchData()
  }, [currentVendor])

  const formateDecimal =(number, percent)=>{
    if (typeof(number) === 'string')
    return number
    if (percent){
      return number.toFixed(2) + "%"
    }
    return number.toFixed(2)
  }

  if (noData) return <Empty />

  if (!currentVendor) return <div></div>

  return (
    <Stack direction="column" alignItems="" spacing={2}>
      {insights ? (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant="h4" gutterBottom>
            Select vendor
          </Typography>
          <FormControl sx={{ minWidth: 120, width: "25%" }}>
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
      ) : (
        <HeaderPlaceholder />
      )}

      {insights ?
          <Grid
            container
            spacing={2}
          >
            <Grid item xl={3} lg={3} md={6} sm={6}>
            <Tag
              title="Total Orders"
              count={insights.length === 0 ? null : insights[0]["total_orders"]}
              icon={<ShoppingCart sx={{ fontSize: "3rem" }} />}
            />
            </Grid>
            <Grid item xl={3} lg={3} md={6} sm={6}>
            <Tag
              title="Cancelled Orders"
              count={insights.length === 0 ? null : formateDecimal(insights[0]["cancellation_rate"], true)}
              icon={<RemoveShoppingCart sx={{ fontSize: "3rem" }} />}
            />
            </Grid>
            <Grid item xl={3} lg={3} md={6} sm={6}>
            <Tag
              title="Total Price Loss"
              count={insights.length === 0 ? null :formateDecimal(insights[0]["subtotal_loss"])}
              icon={<MoneyOff sx={{ fontSize: "3rem" }} />}
            />
            </Grid>
            <Grid item xl={3} lg={3} md={6} sm={6}>
            <Tag
              title="Last Order"
              subtitle="days ago"
              count={insights.length === 0 ? null : insights[0]["last_order"]}
              icon={<Event sx={{ fontSize: "3rem" }} />}
            />
            </Grid>
          </Grid> : <VendorPlaceholder />}

           <OrderTaken
           orderTaken={orderTaken}
            timeStats={timeStats}
            name={currentVendor["name"]["en"]}
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
            count={insights.length === 0 ? null :insights[0]["total_items"]}
            icon={<ShoppingBasket sx={{ fontSize: "3rem" }} />}
          />
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={6}>
          <Tag
            title="Last Updated Item"
            subtitle="days ago"
            count={insights.length === 0 ? null :insights[0]["upated_item"]}
            icon={<EditCalendar sx={{ fontSize: "3rem" }} />}
          />
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={6}>
          <Tag
            title="Count of Stock Update"
            count={insights.length === 0 ? null :insights[0]["stock_update_count"]}
            icon={<Inventory2 sx={{ fontSize: "3rem" }} />}
          />
          </Grid>
          <Grid item xl={3} lg={3} md={6} sm={6}>
          <Tag
            title="Total Stock Update"
            count={insights.length === 0 ? null : insights[0]["stock_update"]}
            icon={<Inventory sx={{ fontSize: "3rem" }} />}
          />
          </Grid>
        </Grid>
      ) : <VendorPlaceholder />}
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

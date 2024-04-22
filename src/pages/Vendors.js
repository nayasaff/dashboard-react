import axios from "axios"
import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import { FormControl, Typography, Stack, Box } from "@mui/material"
import { useLocation } from "react-router-dom"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Tag from "../components/Tag"
import { ShoppingBasket, AddBox, CancelOutlined } from "@mui/icons-material"
import {EditCalendar,Event,MoneyOff,RemoveShoppingCart,} from "@mui/icons-material"
import { grey } from "@mui/material/colors"
import { TimeStat } from "../components/vendor/TimeStat"
import OrderType from "../components/vendor/OrderType"
import OrderTaken from "../components/vendor/OrderTaken"

const Vendors = () => {

  const [userVendors, setUserVendors] = useState("")
  const [currentVendor, setCurrentVendor] = useState("")
  const [insights, setInsights] = useState("")
  const [data, setData] = useState()

  const location = useLocation()

  console.log(location.state)

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5000/users/vendorsOfUser", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setUserVendors(res.data)
          setCurrentVendor(location.state ? location.state : res.data[0])
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = () => {
      if(!currentVendor._id)
      return
      axios
        .get(`http://localhost:5000/all_insights/${currentVendor._id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => setInsights(res.data))
        .catch((err) => console.log(err))

        axios
        .get(`http://localhost:5000/timeStats/${currentVendor._id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [currentVendor])


    return (
      <Stack direction="column" alignItems="" spacing={2}>
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Vendors"
                  size="small"
                  fullWidth
                  variant="outlined"
                  clearIcon={null}
                  value={currentVendor}
                  defaultValue={currentVendor}
                />
              )}
            />
          </FormControl>
        </div>
        { insights && data && <Stack direction="row" spacing={2}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
              <Tag
                title="Total Orders"
                count={insights[0]["total_orders"]}
                icon={<ShoppingBasket sx={{ fontSize: "3rem" }} />}
              />
              <Tag
                title="Incompleted Orders"
                count={insights[0]["cancellation_rate"]}
                icon={<RemoveShoppingCart sx={{ fontSize: "3rem" }} />}
              />
              <Tag
                title="Total Price Loss"
                count={insights[0]["total_price"]}
                icon={<MoneyOff sx={{ fontSize: "3rem" }} />}
              />

            </Stack>
            <Box
              sx={{
                borderRadius: "16px",
                border: `1px ${grey[400]} solid`,
                backgroundColor: "white",
              }}
            >
              <OrderTaken currentVendor={currentVendor} />
            </Box>
            <Box
              sx={{
                borderRadius: "16px",
                border: `1px ${grey[400]} solid`,
                backgroundColor: "white",
              }}
            >
              <Plot
                data={[
                  {
                    type: "scatter",
                    mode: "markers",
                    x: data["indexes"],
                    y: data["timeTaken"],
                    marker: { color: "blue" },
                  },
                ]}
                layout={{
                  title: `Hours taken for ${currentVendor.name.en} to accept order`,
                  width: 850,
                  height: 340,
                  paper_bgcolor: "transparent",
                }}
              />
            </Box>
          </Stack>
          <Stack direction="column" spacing={2}>
          <Tag
              title="Cancelled Orders"
              count={0}
              icon={<CancelOutlined sx={{ fontSize: "3rem" }} />}
            />
     
            <Tag
              title="Last Order"
              count={insights[0]["last_order"]}
              icon={<Event sx={{ fontSize: "3rem" }} />}
            />
            <Tag
              title="Last Updated Item"
              count={insights[0]["upated_item"]}
              icon={<EditCalendar sx={{ fontSize: "3rem" }} />}
            />
            <Tag
              title="Added Items"
              count={0}
              icon={<AddBox sx={{ fontSize: "3rem" }} />}
            />
          <Tag
              title="Updated Items"
              count={0}
              icon={<MoneyOff sx={{ fontSize: "3rem" }} />}
            />
          </Stack>
        </Stack> }

       {data && <TimeStat data={data} />}
        <OrderType currentVendor={currentVendor}/>
      </Stack>
    )
}

export default Vendors

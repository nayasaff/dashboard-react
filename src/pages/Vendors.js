import axios from "axios"
import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import { FormControl, Typography, Stack, Box } from "@mui/material"
import { useLocation } from "react-router-dom"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Tag from "../components/Tag"
import { MoneyOff, RemoveShoppingCart, ShoppingCart } from "@mui/icons-material"
import { grey } from "@mui/material/colors"

const Vendors = () => {
  const [data, setData] = useState([])
  const [userVendors, setUserVendors] = useState("")
  const [currentVendor, setCurrentVendor] = useState("")
  const [countValues, setCountValues] = useState("")

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
      axios
        .get(`http://localhost:5000/timeTaken/${currentVendor._id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => console.log(err))

        axios.get(`http://localhost:5000/countValues/${currentVendor._id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(res => setCountValues(res.data))
        .catch(err => console.log(err))
    }

    fetchData()
  }, [currentVendor])

  if (!(data && userVendors)) return <div>Loading...</div>
  else
    return (
      <Stack direction="column" spacing={2}>
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
        <Stack direction="row" alignItems="center" spacing={2}>
          <Tag
            title="Total Orders"
            count={100}
            icon={<ShoppingCart sx={{ fontSize: "3rem" }} />}
          />
          <Tag
            title="Cancelled Orders"
            count={50}
            icon={<RemoveShoppingCart sx={{ fontSize: "3rem" }} />}
          />
          <Tag
            title="Total Price Loss"
            count={1120}
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
          <Plot
            data={[
              {
                x: data["orderTaken"],
                y: data["orderTakenCount"],
                type: "scatter",
                mode: "lines+markers",
                marker: { size: 5 },
                line: { shape: "spline" },
              },
            ]}
            layout={{
              title: "Last Updated Item Date",
              xaxis: { type: "date", autorange: true },
              yaxis: { range: [0, Math.max(...data["orderTakenCount"]) + 1 ] },
              width: 900,
              height: 350,
              paper_bgcolor: "transparent",
            }}
          />
        </Box>
        <Stack direction="row" spacing={2}>
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
                width: 520,
                height: 340,
                paper_bgcolor: "transparent",
              }}
            />
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
                  values: countValues["orderTypeCount"],
                  labels: countValues["orderType"],
                  type: "pie",
                  marker: {
                    colors: ["#E41A1C", "#377EB8", "#4DAF4A", "#FF7F00"],
                  },

                },
              ]}
              layout={{
                title: `Type of Order`,
                width: 480,
                height: 390,
                paper_bgcolor: "transparent",
                legend: { x: 0.75, y: 1 },
              }}
            />
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
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
                  y: data["deliveryTime"],
                  name: "Delivery Time",
                  type: "box",
                  marker: { color: "#a32cc4" },
                },
              ]}
              layout={{
                title: "Delivery Time",
                width: 480,
                height: 390,
                yaxis: {
                  title: "Time in minutes",
                },
                paper_bgcolor: "transparent",
              }}
            />
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
                  y: data["timeTaken"],
                  name: "Response Time",
                  type: "box",
                  marker: { color: "#ff007f" },
                },
              ]}
              layout={{
                title: "Response Time",
                width: 480,
                height: 390,
                yaxis: {
                  title: "Time in hours",
                },
                paper_bgcolor: "transparent",
              }}
            />
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
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
                  values: countValues["itemsTypeCount"],
                  labels: countValues["itemsType"],
                  type: "pie",
                  marker: {
                    colors: ["#E41A1C", "#377EB8", "#4DAF4A", "#FF7F00"],
                  },
                hole : 0.6
                },
              ]}
              layout={{
                title: `Items Type`,
                width: 480,
                height: 390,
                paper_bgcolor: "transparent",
                legend: { x: 0.75, y: 1 },
              }}
            />
            </Box>
          </Stack>
      </Stack>
    )
}

export default Vendors

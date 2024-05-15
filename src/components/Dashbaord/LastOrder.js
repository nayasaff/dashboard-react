import axios from "axios"
import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"
import { randomColor } from "../../utils/utils"
import { useSelector } from "react-redux"
import { Grid } from "@mui/material"

const LastOrder = () => {
  const [lastOrders, setLastOrders] = useState()
  const [lastUpdatedItems, setLastUpdatedItems] = useState()
  const state = useSelector((state) => state.app)

  const { number, startDate, endDate, isAscending } = state

  useEffect(() => {
    axios
      .get(`http://localhost:5000/lastOrder?isAscending=${isAscending}&number=${number}&startDate=${startDate.format("YYYY-MM-DD")}&endDate=${endDate.format("YYYY-MM-DD")}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setLastOrders(res.data))
      .catch((err) => console.log(err))
  }, [isAscending, number, startDate, endDate])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/lastItemUpdated?isAscending=${isAscending}&number=${number}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setLastUpdatedItems(res.data))
      .catch(err => console.log(err))
  }, [isAscending, number])

  if (!(lastOrders && lastUpdatedItems)) return <GraphPlaceholder numberOfGraph={2} />

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6} lg={6} xl={6}>
      <Box
        sx={{
          borderRadius: "16px",
          border: `1px ${grey[400]} solid`,
          backgroundColor: "white",
          flex :1
        }}
      >
        <Plot
          data={[
            {
              x: lastOrders["lastOrder"],
              y: lastOrders["vendor_name"],
              type: "bar",
              mode: "markers",
              marker: { color: randomColor(["#EC7A08", "#F4B678", "#EF9234"], lastOrders["vendor_name"]),
               size: 10 },
              name: "Last Order Date",
              orientation: "h",
            },
          ]}
          style={{ width: "100%", height: "100%"}}
          layout={{
            title: "Last Order Date",
            yaxis: { type: "category"},
            xaxis: { type: "date", autorange: true },
            height: 350,
            paper_bgcolor: "transparent",
          }}
        />
      </Box>
      </Grid>
      <Grid item sm={12} md={6} lg={6} xl={6}>
      <Box
        sx={{
          borderRadius: "16px",
          border: `1px ${grey[400]} solid`,
          backgroundColor: "white",
          flex :1
        }}
      >
        <Plot
          data={[
            {
              x: lastUpdatedItems["lastUpdatedItem"],
              y: lastUpdatedItems["vendor_name"],
              type: "bar",
              mode: "markers",
              marker: { color: randomColor(["#06C", "#8BC1F7", "#519DE9"], lastUpdatedItems["vendor_name"]), 
              size: 10 },
              orientation : "h",
            },
          ]}
          style={{ width: "100%", height: "100%"}}
          layout={{
            title: "Last Updated Item Date",
            yaxis: { type: "category" },
            xaxis: { type: "date", autorange: true },
            height: 350,
            paper_bgcolor: "transparent",
          }}
        />
      </Box>
      </Grid>
    </Grid>
  )
}

export default LastOrder

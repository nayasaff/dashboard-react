import React, { useEffect, useState } from "react"
import { Stack, Box, Grid } from "@mui/material"
import Plot from "react-plotly.js"
import { grey } from "@mui/material/colors"
import axios from "axios"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"

const OrderType = ({ currentVendor }) => {
  const [countValues, setCountValues] = useState()

  useEffect(() => {
    const fetchData = () => {
      if (!currentVendor) return
      axios
        .get(`http://localhost:5000/countValues/${currentVendor._id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => setCountValues(res.data))
        .catch((err) => console.log(err))
    }
    fetchData()
  }, [currentVendor])

  if (!countValues) return <GraphPlaceholder numberOfGraph={3} />
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6} lg={6} xl={4}>
      <Box
        sx={{
          borderRadius: "16px",
          border: `1px ${grey[400]} solid`,
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <Plot
          style={{ width: "100%", height: "100%" }}
          data={[
            {
              values: countValues["itemsTypeCount"],
              labels: countValues["itemsType"],
              type: "pie",
              marker: {
                colors: ["#519DE9", "#F4C145","#E25668", "#4CB140"],
              },
      
            },
          ]}
          layout={{
            title: `Items Type`,
            paper_bgcolor: "transparent",
            legend: { x: 0.75, y: 1 },
          }}
        />
      </Box>
      </Grid>
      <Grid item sm={12} md={6} lg={6} xl={4}>
      <Box
        sx={{
          borderRadius: "16px",
          border: `1px ${grey[400]} solid`,
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <Plot

          style={{ width: "100%", height: "100%" }}
          data={[
            {
              values: countValues["orderTypeCount"],
              labels: countValues["orderType"],
              type: "pie",
              marker: {
                colors: ["#519DE9", "#F4C145","#E25668", "#4CB140"],
              },

            },
          ]}
          layout={{
            title: `Delivery Day`,
            paper_bgcolor: "transparent",
            legend: { x: 0.75, y: 1 },
          }}
        />
      </Box>
      </Grid>
      <Grid item sm={12} md={6} lg={6} xl={4}>
      <Box
        sx={{
          flex: 1,
          borderRadius: "16px",
          border: `1px ${grey[400]} solid`,
          backgroundColor: "white",
        }}
      >
        <Plot
          style={{ width: "100%", height: "90%" }}
          data={[
            {
              values: countValues["orderStatusCount"],
              labels: countValues["orderStatus"],
              type: "pie",
              marker: {
                colors: ["#519DE9", "#F4C145","#E25668", "#4CB140"],
              },
            },
          ]}
          layout={{
            title: `Order Status`,
            paper_bgcolor: "transparent",
            legend: { x: 0.75, y: 1 },
          }}
        />
      </Box>
      </Grid>
    </Grid>
  )
}

export default OrderType

import React from "react"
import Plot from "react-plotly.js"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import grey from "@mui/material/colors/grey"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"

const OrderType = ({ orderType }) => {


  if (!orderType) return <Grid item sm={12} md={12}><GraphPlaceholder numberOfGraph={3} /></Grid>
  return (
    <>
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
              values: orderType["items_type_count"],
              labels: orderType["items_type"],
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
              values: orderType["orders_type_count"],
              labels: orderType["orders_type"],
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
              values: orderType["order_status_count"],
              labels: orderType["order_status"],
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
      </>
  )
}

export default OrderType

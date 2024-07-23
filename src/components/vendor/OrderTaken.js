import React from "react"
import Plot from "react-plotly.js"
import { Grid, Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"

const OrderTaken = ({ orderTaken, timeStats, name }) => {


  if (!orderTaken || !timeStats || !name) return <GraphPlaceholder numberOfGraph={2} />

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6} lg={6} xl={6}>
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
                x: orderTaken["createdAt"],
                y: orderTaken["count"],
                type: "scatter",
                mode: "spline",
                marker: { color: "#1CD0BB", size: 5 },
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: "Orders per day",
              xaxis: { type: "date", autorange: true },
              yaxis: {
                range: [0, Math.max(...orderTaken["count"]) + 1],
              },
              paper_bgcolor: "transparent",
              height: 300,
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
          }}
        >
          <Plot
            data={[
              {
                type: "scatter",
                mode: "markers",
                x: timeStats["indexes"],
                y: timeStats["timeTaken"],
                marker: { color: "#FF0306" },
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: `Minutes taken for ${name} to accept order`,
              paper_bgcolor: "transparent",
              height: 300,
            }}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default OrderTaken

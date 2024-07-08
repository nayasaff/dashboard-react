import React from "react"
import Plot from "react-plotly.js"
import { useSelector } from "react-redux"
import { randomColor, sliceArray } from "../../utils/utils"
import { Grid, Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"

const StockLog = ({ stockLog, stockLogCount }) => {
  const state = useSelector((state) => state.app)
  const { number } = state

  if (!(stockLogCount && stockLog))
    return <GraphPlaceholder numberOfGraph={2} />

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6} lg={6} xl={6}>
        <Box
          sx={{
            borderRadius: "16px",
            border: `1px ${grey[400]} solid`,
            backgroundColor: "white",
            flex: 1,
          }}
        >
          <Plot
            data={[
              {
                y: sliceArray(stockLogCount["stock_update_count"] , number),
                x: sliceArray(stockLogCount["vendor_name"],number),
                type: "bar",
                marker: {
                  color: randomColor(
                    ["#9B4A80", "#C280B4", "#9F487D"],
                    stockLogCount["vendor_name"]
                  ),
                },
                name: "Times stock updated in last 2 weeks",
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: {
                text: "Number of Times Stock Got Updated",
                font: {
                  size: 15,
                },
              },
              annotations: [{
                text: "Last 2 weeks",
                x: 0.5, // Position horizontally (0 to 1)
                y: 1, // Position vertically (0 to 1, top to bottom)
                xref: 'paper', // Reference to plot paper
                yref: 'paper', // Reference to plot paper
                showarrow: false, // Hide the annotation arrow
                font: {
                  size: 14,
                },
              }],
              xaxis: {
                type: "category",
                automargin: "width"
              },
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
            flex: 1,
          }}
        >
          <Plot
            data={[
              {
                y: sliceArray(
                  Object.keys(stockLog).map((value) => 100),
                  number
                ),
                x: sliceArray(stockLog["vendor_name"], number),
                type: "bar",
                marker: { color: "#C0DFA9", textPosition: "top" },
                name: "",
              },
              {
                x: sliceArray(stockLog["vendor_name"], number),
                y: sliceArray(stockLog["percentage_updated_items"], number),
                type: "bar",
                marker: {
                  color: "#00A652",
                  textPosition: "top",
                },
                name: "% of updated items",
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: {
                text: "Percentage of Updated Items in the Stock",
                font: {
                  size: 15,
                },
              },
              annotations: [{
                text: "Last 2 weeks",
                x: 0.5, // Position horizontally (0 to 1)
                y: 1, // Position vertically (0 to 1, top to bottom)
                xref: 'paper', // Reference to plot paper
                yref: 'paper', // Reference to plot paper
                showarrow: false, // Hide the annotation arrow
                font: {
                  size: 14,
                },
              }],
              xaxis: {
                type: "category",
                automargin: "width"
              },
              height: 350,
              paper_bgcolor: "transparent",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default StockLog

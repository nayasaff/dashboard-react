import React from "react"
import Plot from "react-plotly.js"
import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"
import { randomColor, sliceArray } from "../../utils/utils"
import { useSelector } from "react-redux"
import { Grid } from "@mui/material"

const LastOrder = ({lastOrders, lastUpdatedItems}) => {

  const state = useSelector((state) => state.app)

  const { number } = state

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
              x: sliceArray(lastOrders["last_order"], number),
              y: sliceArray(lastOrders["vendor_name"], number),
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
            yaxis: { type: "category", automargin : "width"},
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
              x: sliceArray(lastUpdatedItems["updated_item"], number),
              y: sliceArray(lastUpdatedItems["vendor_name"], number),
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
            yaxis: { type: "category" ,  automargin : "width"},
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

import React from "react"
import { Box, Grid } from "@mui/material"
import Plot from "react-plotly.js"
import { useSelector } from "react-redux"
import { grey } from "@mui/material/colors"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"
import { randomColor, sliceArray } from "../../utils/utils"

const TimeTaken = ({responseTime, deliveryTime}) => {

  const state = useSelector((state) => state.app)
  const { number }  = state


  // if (!(responseTime && deliveryTime)) return <>
  //   <GraphPlaceholder numberOfGraph={3} />
  //   <GraphPlaceholder numberOfGraph={3} />
  // </>
  return (
    <Grid container spacing={2}>
      {responseTime ? <>
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
            data={[
              {
                y: sliceArray(responseTime["max"]["maxTime"], number),
                x: sliceArray(responseTime["max"]["vendor_name"], number),
                type: "bar",
                name: "Time Taken",
                marker: {
                  color: randomColor(
                    ["#4CB140", "#7CC674", "#4CB140"],
                    responseTime["max"]["vendor_name"]
                  ),
                },
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: "Maximum Response Time",
              yaxis: {
                title: "Time (in minutes)",
              },
              xaxis: {
                title: "Vendor Name",
                tickangle: 45,
                automargin : 'height',
                rangeSlider: {visible : true }
              },
              paper_bgcolor: "transparent",
              height: 360
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
            data={[
              {
                y: sliceArray(responseTime["avg"]["averageTime"], number),
                x: sliceArray(responseTime["avg"]["vendor_name"], number),
                type: "bar",
                marker: {
                  color: randomColor(
                    ["#5752D1", "#B2B0EA", "#8481DD"],
                    responseTime["avg"]["vendor_name"]
                  ),
                },
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: "Average Response Time",
              yaxis: {
                title: "Time (in minutes)",
              },
              xaxis: {
                title: "Vendor Name",
                tickangle: 45,
                automargin : 'height'
              },
              paper_bgcolor: "transparent",
              height: 360
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
            data={[
              {
                y: sliceArray(responseTime["min"]["minTime"], number),
                x: sliceArray(responseTime["min"]["vendor_name"], number),
                type: "bar",
                marker: {
                  color: randomColor(
                    ["#C9190B", "#A30000", "#7D1007"],
                    responseTime["min"]["vendor_name"]
                  ),
                },
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: "Minimum Response Time",
              yaxis: {
                title: "Time (in minutes)",
              },
              xaxis: {
                title: "Vendor Name",
                tickangle: 45,
                automargin : 'height'
              },
              paper_bgcolor: "transparent",
              height: 360,
            }}
          />
        </Box>
      </Grid>
      </> : <Grid item xl={12} lg={12} md ={12} sm={12}><GraphPlaceholder numberOfGraph={3} /> </Grid>}
      {deliveryTime ? <>
      <Grid item sm={12} md={6} lg={6} xl={4}>
        {" "}
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
                y: sliceArray(deliveryTime["max"]["maxTime"], number),
                x: sliceArray(deliveryTime["max"]["vendor_name"], number),
                type: "bar",
                name: "Time Taken",
                marker: {
                  color: randomColor(
                    ["#4CB140", "#7CC674"],
                    deliveryTime["max"]["vendor_name"]
                  ),
                },
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: "Maximum Delivery Time",
              yaxis: {
                title: "Time (in hours)",
              },
              xaxis: {
                title: "Vendor Name",
                tickangle: 45,
                automargin : 'height'
              },
              paper_bgcolor: "transparent",
              height: 360
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
            data={[
              {
                y: sliceArray(deliveryTime["avg"]["averageTime"], number),
                x: sliceArray(deliveryTime["avg"]["vendor_name"], number),
                type: "bar",
                marker: {
                  color: randomColor(
                    ["#5752D1", "#B2B0EA", "#8481DD"],
                    deliveryTime["avg"]["vendor_name"]
                  ),
                },
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: "Average Delivery Time",
              yaxis: {
                title: "Time (in hours)",
              },
              xaxis: {
                title: "Vendor Name",
                tickangle: 45,
                automargin : 'height'
              },
              paper_bgcolor: "transparent",
              height: 360
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
            data={[
              {
                y: sliceArray(deliveryTime["min"]["minTime"], number),
                x: sliceArray(deliveryTime["min"]["vendor_name"], number),
                type: "bar",
                name: "Time Taken",
                marker: {
                  color: randomColor(
                    ["#C9190B", "#A30000", "#7D1007"],
                    deliveryTime["min"]["vendor_name"]
                  ),
                },
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: "Minimum Delivery Time",
              yaxis: {
                title: "Time (in hours)",
              },
              xaxis: {
                title: "Vendor Name",
                tickangle: 45,
                automargin : 'height'
              },
              paper_bgcolor: "transparent",
              height: 360
            }}
          />
        </Box>
      </Grid>
      </> : <Grid item xl={12} lg={12} md ={12} sm={12}><GraphPlaceholder numberOfGraph={3} /> </Grid>}
    </Grid>
  )
}

export default TimeTaken

//["#872174", "#C85A9F", "#A61982"]

//C0DFA9
//00A652

import React, { useEffect, useState } from "react"
import { Box, Grid } from "@mui/material"
import Plot from "react-plotly.js"
import { useSelector } from "react-redux"
import axios from "axios"
import { grey } from "@mui/material/colors"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"
import { randomColor } from "../../utils/utils"

const TimeTaken = () => {
  const [responseTime, setResponseTime] = useState()
  const [deliveryTime, setDeliveryTime] = useState()
  const state = useSelector((state) => state.app)
  const { number, startDate, endDate, isAscending } = state

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `http://localhost:5000/timeTaken?isAscending=${isAscending}&number=${number}&startDate=${startDate.format(
            "YYYY-MM-DD"
          )}&endDate=${endDate.format("YYYY-MM-DD")}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => setResponseTime(res.data))
        .catch((err) => console.log(err))
    }
    fetchData()
  }, [number, isAscending, startDate, endDate])

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/deliveryTime?isAscending=${isAscending}&number=${number}&startDate=${startDate.format(
          "YYYY-MM-DD"
        )}&endDate=${endDate.format("YYYY-MM-DD")}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => setDeliveryTime(res.data))
      .catch((err) => console.log(err))
  }, [isAscending, number, startDate, endDate])

  if (!(responseTime && deliveryTime)) return <>
    <GraphPlaceholder numberOfGraph={3} />
    <GraphPlaceholder numberOfGraph={3} />
  </>
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
            data={[
              {
                y: responseTime["max"]["maxTime"],
                x: responseTime["max"]["vendor_name"],
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
              },
              paper_bgcolor: "transparent",
              height: 360,
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
                y: responseTime["avg"]["averageTime"],
                x: responseTime["avg"]["vendor_name"],
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
              },
              paper_bgcolor: "transparent",
              height: 360,
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
                y: responseTime["min"]["minTime"],
                x: responseTime["min"]["vendor_name"],
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
              },
              paper_bgcolor: "transparent",
              height: 360,
            }}
          />
        </Box>
      </Grid>
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
                y: deliveryTime["max"]["maxTime"],
                x: deliveryTime["max"]["vendor_name"],
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
              },
              paper_bgcolor: "transparent",
              height: 360,
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
                y: deliveryTime["avg"]["averageTime"],
                x: deliveryTime["avg"]["vendor_name"],
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
              },
              paper_bgcolor: "transparent",
              height: 360,
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
                y: deliveryTime["min"]["minTime"],
                x: deliveryTime["min"]["vendor_name"],
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
              },
              paper_bgcolor: "transparent",
              height: 360,
            }}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default TimeTaken

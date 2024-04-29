import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import Plot from "react-plotly.js"
import { useSelector } from "react-redux"
import axios from "axios"
import { grey } from "@mui/material/colors"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"

const TimeTaken = () => {
  const [data, setData] = useState()
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
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }
    fetchData()
  }, [number, isAscending, startDate, endDate])

  if (!data) return <GraphPlaceholder numberOfGraph={3}/>
  return (
      <Box sx={{ display: "flex", gap: "1em" }}>
        <Box
          sx={{
            borderRadius: "16px",
            border: `1px ${grey[400]} solid`,
            backgroundColor: "white",
            flex : 1
          }}
        >
          <Plot
            data={[
              {
                y: data["max"]["maxTime"],
                x: data["max"]["vendor_name"],
                type: "bar",
                name: "Time Taken",
                marker: {
                  color: ["#4CB140", "#7CC674", "#4CB140"],
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
              },
              paper_bgcolor: "transparent",
              height : 360
            }}
          />
        </Box>
        <Box
          sx={{
            borderRadius: "16px",
            border: `1px ${grey[400]} solid`,
            backgroundColor: "white",
            flex : 1
          }}
        >
          <Plot
            data={[
              {
                y: data["avg"]["averageTime"],
                x: data["avg"]["vendor_name"],
                type: "bar",
                marker: {
                  color: ["#5752D1", "#B2B0EA", "#8481DD"],
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
              },
              paper_bgcolor: "transparent",
              height : 360
            }}
          />
        </Box>
        <Box
          sx={{
            borderRadius: "16px",
            border: `1px ${grey[400]} solid`,
            backgroundColor: "white",
            flex : 1
          }}
        >
          <Plot
            data={[
              {
                y: data["min"]["minTime"],
                x: data["min"]["vendor_name"],
                type: "bar",
                marker: {
                  color: ["#C9190B", "#A30000", "#7D1007"],
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
              },
              paper_bgcolor: "transparent",
              height : 360
            }}
          />
        </Box>
      </Box>
  )
}

export default TimeTaken

import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import Plot from "react-plotly.js"
import { useSelector } from "react-redux"
import axios from "axios"
import { grey } from "@mui/material/colors"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"
import FadeIn from "react-fade-in/lib/FadeIn"

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

  if (!data) return <GraphPlaceholder />
  return (
    <FadeIn>
      <Box sx={{ display: "flex", gap: "1em" }}>
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
                y: data["max"]["maxTime"],
                x: data["max"]["vendor_name"],
                type: "bar",
                name: "Time Taken",
                marker: {
                  color: "DarkRed",
                },
              },
            ]}
            layout={{
              title: "Maximum Response Time",
              width: 400,
              height: 340,
              yaxis: {
                title: "Time (in minutes)",
              },
              xaxis: {
                title: "Vendor Name",
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
                y: data["avg"]["averageTime"],
                x: data["avg"]["vendor_name"],
                type: "bar",
                marker: {
                  color: "purple",
                },
              },
            ]}
            layout={{
              title: "Average Response Time",
              width: 400,
              height: 340,
              yaxis: {
                title: "Time (in minutes)",
              },
              xaxis: {
                title: "Vendor Name",
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
                y: data["min"]["minTime"],
                x: data["min"]["vendor_name"],
                type: "bar",
                marker: {
                  color: "",
                },
              },
            ]}
            layout={{
              title: "Minimum Response Time",
              width: 400,
              height: 340,
              yaxis: {
                title: "Time (in minutes)",
              },
              xaxis: {
                title: "Vendor Name",
              },
              paper_bgcolor: "transparent",
            }}
          />
        </Box>
      </Box>
    </FadeIn>
  )
}

export default TimeTaken

import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import axios from "axios"
import Plot from "react-plotly.js"
import { useSelector } from "react-redux"

const DeliveryTime = () => {
  const [deliveryTime, setDeliveryTime] = useState()

  const state = useSelector((state) => state.app)
  const { number, startDate, endDate, isAscending } = state

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

  if (!deliveryTime) return <div></div>

  return (
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
              y: deliveryTime["max"]["maxTime"],
              x: deliveryTime["max"]["vendor_name"],
              type: "bar",
              name: "Time Taken",
              marker: {
                color: "#e75480",
              },
            },
          ]}
          layout={{
            title: "Maximum Delivery Time",
            width: 400,
            height: 340,
            yaxis: {
              title: "Time (in hours)",
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
              y: deliveryTime["avg"]["averageTime"],
              x: deliveryTime["avg"]["vendor_name"],
              type: "bar",
              marker: {
                color: "purple",
              },
            },
          ]}
          layout={{
            title: "Average Delivery Time",
            width: 400,
            height: 340,
            yaxis: {
              title: "Time (in hours)",
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
              y: deliveryTime["min"]["minTime"],
              x: deliveryTime["min"]["vendor_name"],
              type: "bar",
              name: "Time Taken",
              marker: {
                color: "",
              },
            },
          ]}
          layout={{
            title: "Minimum Delivery Time",
            width: 400,
            height: 340,
            yaxis: {
              title: "Time (in hours)",
            },
            xaxis: {
              title: "Vendor Name",
            },
            paper_bgcolor: "transparent",
          }}
        />
      </Box>
    </Box>
  )
}

export default DeliveryTime

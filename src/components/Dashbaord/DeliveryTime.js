import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import axios from "axios"
import Plot from "react-plotly.js"
import { useSelector } from "react-redux"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"
import { randomColor } from "../../utils/utils"


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




  if (!deliveryTime) return <GraphPlaceholder numberOfGraph={3}/>

  return (
    <>

      <Box sx={{ display: "flex", gap: "1em"}}>
        {" "}
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
                y: deliveryTime["max"]["maxTime"],
                x: deliveryTime["max"]["vendor_name"],
                type: "bar",
                name: "Time Taken",
                marker: {
                  color: randomColor(["#4CB140", "#7CC674"], deliveryTime["max"]["vendor_name"] ) ,
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
            flex :1 
          }}
        >
          <Plot
            data={[
              {
                y: deliveryTime["avg"]["averageTime"],
                x: deliveryTime["avg"]["vendor_name"],
                type: "bar",
                marker: {
                  color: randomColor(["#5752D1", "#B2B0EA", "#8481DD"], deliveryTime["avg"]["vendor_name"] ),
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
                y: deliveryTime["min"]["minTime"],
                x: deliveryTime["min"]["vendor_name"],
                type: "bar",
                name: "Time Taken",
                marker: {
                  color: randomColor(["#C9190B", "#A30000", "#7D1007"], deliveryTime["min"]["vendor_name"] ),
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
              },
              paper_bgcolor: "transparent",
              height : 360
            }}
          />
        </Box>
      </Box>

    </>
  )
}

export default DeliveryTime

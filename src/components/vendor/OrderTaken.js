import React, { useEffect, useState } from "react"
import axios from "axios"
import Plot from "react-plotly.js"
import { Grid, Box } from "@mui/material"
import { grey } from "@mui/material/colors"


const OrderTaken = ({ currentVendor, timeTaken, indexes }) => {
  const [orderTaken, setOrderTaken] = useState()

  useEffect(() => {
    const fetchData = async () => {
      if (!currentVendor._id) return
      let response
      try {
        response = await axios.get(
          `http://localhost:5000/orderTaken/${currentVendor._id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
      } catch (err) {
        console.log(err)
      }

      if (response.status === 200) {
        setOrderTaken(response.data)
      }
    }
    fetchData()
  }, [currentVendor])

  if (!orderTaken) return <div></div>

  return (
    <Grid container spacing={2}>
      <Grid
        item
        sm={12}
        md={6}
        lg={6}
        xl={6}
      >
        <Box sx={{
          borderRadius: "16px",
          border: `1px ${grey[400]} solid`,
          backgroundColor: "white",
        }}>
        <Plot
          data={[
            {
              x: orderTaken["createdAt"],
              y: orderTaken["count"],
              type: "scatter",
              mode: "lines+markers",
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
      <Grid
        item
        sm={12}
        md={6}
        lg={6}
        xl={6}
      >
                <Box sx={{
          borderRadius: "16px",
          border: `1px ${grey[400]} solid`,
          backgroundColor: "white",
        }}>
        <Plot
          data={[
            {
              type: "scatter",
              mode: "markers",
              x: indexes,
              y: timeTaken,
              marker: { color: "#FF0306" },
            },
          ]}
          style={{ width: "100%", height: "100%" }}
          layout={{
            title: `Minutes taken for ${currentVendor.name.en} to accept order`,
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

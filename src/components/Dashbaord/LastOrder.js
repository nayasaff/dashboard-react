import axios from "axios"
import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"

const LastOrder = () => {
  const [lastOrders, setLastOrders] = useState()
  const [lastUpdatedItems, setLastUpdatedItems] = useState()

  useEffect(() => {
    axios
      .get(`http://localhost:5000/lastOrder`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setLastOrders(res.data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/lastItemUpdated`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setLastUpdatedItems(res.data))
  }, [])

  if (!(lastOrders && lastUpdatedItems)) return <div></div>

  return (
    <Box sx={{ display: "flex", gap: "1em", justifyContent: "start" }}>
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
              x: lastOrders["lastOrder"],
              y: lastOrders["vendor_name"],
              type: "scatter",
              mode: "markers",
              marker: { color: "blue", size: 10 },
              name: "Last Order Date",
            },
          ]}
          layout={{
            title: "Last Order Date",
            yaxis: { type: "category" },
            xaxis: { type: "date", autorange: true },
            width: 500,
            height: 350,
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
              x: lastUpdatedItems["0"],
              y: lastOrders["vendor_name"],
              type: "scatter",
              mode: "markers",
              marker: { color: "red", size: 10 },
            },
          ]}
          layout={{
            title: "Last Updated Item Date",
            yaxis: { type: "category" },
            xaxis: { type: "date", autorange: true },
            width: 500,
            height: 350,
            paper_bgcolor: "transparent",
          }}
        />
      </Box>
    </Box>
  )
}

export default LastOrder

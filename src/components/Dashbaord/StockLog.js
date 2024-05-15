import axios from "axios"
import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import { useSelector } from "react-redux"
import { randomColor } from "../../utils/utils"
import { Grid, Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"

const StockLog = () => {
  const [stockLogCount, setStockLogCount] = useState()
  const [stockLog, setStockLog] = useState()
  const state = useSelector((state) => state.app)
  const { number, isAscending } = state

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `http://localhost:5000/stockLogCount?isAscending=${isAscending}&number=${number}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => setStockLogCount(res.data))
        .catch((err) => console.log(err))

      axios
        .get(
          `http://localhost:5000/stockLog?isAscending=${isAscending}&number=${number}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => setStockLog(res.data))
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [isAscending, number])

  if (!(stockLogCount && stockLog)) return <GraphPlaceholder numberOfGraph={2} />

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
                y: stockLogCount.map((value) => value["total"]),
                x: stockLogCount.map((value) => value["_id"]["vendor_name"]),
                type: "bar",
                marker: {
                  color: randomColor(
                    ["#EC7A08", "#F4B678", "#EF9234"],
                    stockLogCount
                  ),
                },
                name: "Times stock updated in last 2 weeks",
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: "Last Order Date",
              xaxis: {
                type: "category",
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
                y: Object.keys(stockLog).map((value) => 100),
                x: stockLog["vendor_name"],
                type: "bar",
                marker: { color: "#004B95", textPosition: "top" },
                name: "",
              },
              {
                x: stockLog["vendor_name"],
                y: stockLog["percentage_updated_items"],
                type: "bar",
                marker: { color: "#EC7A08", textPosition: "top" },
                name: "% of updated items",
              },
            ]}
            style={{ width: "100%", height: "100%" }}
            layout={{
              title: "Percentage of Updated Items in the Stock (last 2 weeks)",
              xaxis: {
                type: "category",
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

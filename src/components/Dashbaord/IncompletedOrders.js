import { Box, Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"
import { useSelector } from "react-redux"
import { grey } from "@mui/material/colors"
import CancelledOrderPlaceholder from "../placeholder/TagPlaceholder"
import { People, ShoppingCart } from "@mui/icons-material"
import Tag from "../Tag"
import { randomColor } from "../../utils/utils"

const IncompletedOrders = ({ totalOrders, insightsLength }) => {
  const [data, setData] = useState()
  const state = useSelector((state) => state.app)
  const { number, startDate, endDate, isAscending } = state

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `http://localhost:5000/cancellationRate?isAscending=${isAscending}&number=${number}&startDate=${startDate.format(
            "YYYY-MM-DD"
          )}&endDate=${endDate.format("YYYY-MM-DD")}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => console.log(err))
    }
    fetchData()
  }, [isAscending, number, startDate, endDate])

  if (!data) return <CancelledOrderPlaceholder />
  return (
    <Stack sx={{flexDirection : {xl : "row", lg : "column-reverse", md : "column-reverse" }, gap : "1rem" }} spacing={2}>
      <Box
        sx={{
          display: {
            xl: "flex",
            lg: "flex",
            md: "flex",
            sm: "block",
          },
          borderRadius: "16px",
          backgroundColor: "white",
          width: "auto",
          border: `1px ${grey[400]} solid`,
          flex: 3.5,
        }}
      >
        {/* Stacked Bar chart for cancelled orers and total price */}
        <Plot
          data={[
            {
              x: data["percentage"]["vendor_name"],
              y: data["percentage"]["total_count"],
              type: "bar",
              marker: { color: "#004B95", textPosition: "top" },
              name: "Total Orders",
            },
            {
              x: data["percentage"]["vendor_name"],
              y: data["percentage"]["cancelled_count"],
              type: "bar",
              marker: { color: "#EC7A08", textPosition: "top" },
              name: "Cancelled Orders",
            },
          ]}
          style={{ width: "100%", height: "100%" }}
          layout={{
            title: "Incompleted Orders",
            legend: { x: 0.6, y: 1.3 },
            paper_bgcolor: "transparent",
            height: 320,
          }}
        />

        <Plot
          data={[
            {
              x: data["subtotal"]["vendor_name"],
              y: data["subtotal"]["subtotal"],
              type: "bar",
              marker: {
                color: randomColor(
                  ["#F0AB00", "#F6D173", "#F4C145"],
                  data["subtotal"]["vendor_name"]
                ),
              },
              name: "Total Price",
            },
          ]}
          style={{ width: "100%", height: "100%" }}
          layout={{
            title: "Subtotal of Cancelled Orders",
            paper_bgcolor: "transparent",
            height: 320,
          }}
        />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: {xl : "column" , lg : "row"} }}>
        <Tag
          title="Orders"
          count={totalOrders}
          icon={<ShoppingCart sx={{ fontSize: "3rem" }} />}
        />
        <Box m={2} />
        <Tag
          title="Vendors"
          count={insightsLength}
          icon={<People sx={{ fontSize: "3.2rem" }} />}
        />
      </Box>
    </Stack>
  )
}

export default IncompletedOrders

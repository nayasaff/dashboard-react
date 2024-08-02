import { Box, Stack } from "@mui/material"
import React from "react"
import Plot from "react-plotly.js"
import { useSelector } from "react-redux"
import { grey } from "@mui/material/colors"
import TagPlaceholder from "../placeholder/TagPlaceholder"
import { People, ShoppingCart } from "@mui/icons-material"
import Tag from "../Tag"
import { randomColor, sliceArray } from "../../utils/utils"

const IncompletedOrders = ({ insightsLength, cancelledOrders, totalOrders }) => {

  const state = useSelector((state) => state.app)
  const { number} = state
  

  if (!cancelledOrders) return <TagPlaceholder />
  return (
    <Stack sx={{flexDirection : {xl : "row", lg : "column-reverse", md : "column-reverse", sm : "column-reverse" }, gap : "1rem" }}>
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
              x: sliceArray(cancelledOrders["percentage"]["vendor_name"], number),
              y: sliceArray(cancelledOrders["percentage"]["total_orders"], number),
              type: "bar",
              marker: { color: "#004B95", textPosition: "top" },
              name: "Total Orders",
            },
            {
              x: sliceArray(cancelledOrders["percentage"]["vendor_name"], number),
              y: sliceArray(cancelledOrders["percentage"]["cancelled_orders"], number),
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
            height: 380,
            xaxis : {
              automargin : "height",
              tickangle: 45,
            }
          }}
        />

        <Plot
          data={[
            {
              x: sliceArray(cancelledOrders["subtotal"]["vendor_name"], number),
              y: sliceArray(cancelledOrders["subtotal"]["subtotal_loss"], number),
              type: "bar",
              marker: {
                color: randomColor(
                  ["#F0AB00", "#F6D173", "#F4C145"],
                  cancelledOrders["subtotal"]["vendor_name"]
                ),
              },
              name: "Total Price",
            },
          ]}
          style={{ width: "100%", height: "100%" }}
          layout={{
            title: "Subtotal of Cancelled Orders",
            paper_bgcolor: "transparent",
            height: 380,
            xaxis : {
              automargin : "height",
              tickangle: 45,
            }
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

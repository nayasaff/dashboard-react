import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Box,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"
import { useSelector } from 'react-redux';
import { grey } from "@mui/material/colors";

const CancelledOrders = () => {
  const [data, setData] = useState()
  const state = useSelector((state) => state.app);
  const {number, startDate, endDate, isAscending} = state;

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:5000/cancelledOrder?isAscending=${isAscending}&number=${number}&startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}`,
          {
            headers: {
              Authorization : localStorage.getItem("token")
            }
          }
         )
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => console.log(err))
    }
    fetchData()
  }, [isAscending, number, startDate, endDate])


  if (!data) return <div>Loading...</div>
  return (
    <>
      <Box sx={{display : 'flex', borderRadius : '16px', backgroundColor : 'white', width : 'auto', border : `1px ${grey[400]} solid`}}>
        {/* Stacked Bar chart for cancelled orers and total price */}
        <Plot
          data={[
  
            {
              x: data['percentage']["vendor_name"],
              y: data['percentage']["total_count"],
              type: "bar",
              marker: { color: "navy", textPosition: "top"},
              name: "Total Orders",
            },
            {
              x: data['percentage']["vendor_name"],
              y: data['percentage']["cancelled_count"],
              type: "bar",
              marker: { color: "coral",  textPosition: "top" },
              name: "Cancelled Orders",
            },
          ]}
          layout={{
            title: "Cancelled Orders",
            width: 450,
            height: 340,
            legend : {x : 0.6, y : 1.3},
            paper_bgcolor: "transparent"
          }}
        />

        <Plot
          data={[
            {
              x: data['total_price']["vendor_name"],
              y: data['total_price']["total_price"],
              type: "bar",
              marker: { color: "green" },
              name: "Total Price",
            },
          ]}
          layout={{
            title: "Total price of cancelled orders",
            width: 450,
            height: 340,
            paper_bgcolor: "transparent"
          }}
        />
      </Box>
    </>
  )
}

export default CancelledOrders

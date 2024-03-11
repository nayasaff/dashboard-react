import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"
import { useSelector } from 'react-redux';


const CancelledOrders = () => {
  const [data, setData] = useState()
  const state = useSelector((state) => state.app);
  const {number, startDate, endDate, isAscending} = state;

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:5000/cancelledOrder?isAscending=${isAscending}&number=${number}&startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}` )
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Title */}
        <Typography variant="h5" gutterBottom>
          Rate of cancellation order by vendors
        </Typography>

      </div>
      {/*To make graphs next to each other */}
      <div className="center">
        {" "}
        {/* Stacked Bar chart for cancelled orers and total price */}
        <Plot
          data={[
            {
              x: data['percentage']["vendor_name"],
              y: data['percentage']["cancelled_count"],
              type: "bar",
              marker: { color: "coral" },
              name: "Cancelled Orders",
            },
            {
              x: data['percentage']["vendor_name"],
              y: data['percentage']["total_count"],
              type: "bar",
              marker: { color: "navy" },
              name: "Total Orders",
            },
          ]}
          layout={{
            title: "Cancelled Orders",
            width: 520,
            height: 340,
            barmode: "stack",
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
            width: 520,
            height: 340,
          }}
        />
      </div>
    </>
  )
}

export default CancelledOrders

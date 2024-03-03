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
  const [isAscending, setIsAscending] = useState(false)
  const state = useSelector((state) => state);
  const {number, startDate, endDate} = state;
  console.log(number)

  useEffect(() => {
    console.log(startDate)
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
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Rate of cancellation order by vendors
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Rate</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Age"
            onChange={(e) => setIsAscending(e.target.value)}
            value={isAscending}
          >
            <MenuItem value={false}>Highest</MenuItem>
            <MenuItem value={true}>Lowest</MenuItem>
          </Select>
        </FormControl>

      </div>
      <div className="center">
        {" "}
        <Plot
          data={[
            {
              x: data["vendor_name"],
              y: data["cancelled_count"],
              type: "bar",
              marker: { color: "coral" },
              name: "Cancelled Orders",
            },
            {
              x: data["vendor_name"],
              y: data["total_count"],
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
              x: data["vendor_name"],
              y: data["total_price"],
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

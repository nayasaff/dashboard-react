import {
  Grid,
  Item,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"
import Slider, {
} from "@mui/material/Slider"
import { styled } from "@mui/material/styles"

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 6,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
})

const CancelledOrders = () => {
  const [data, setData] = useState()
  const [isAscending, setIsAscending] = useState(false)
  const [number, setNumber] = useState(10)

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:5000/cancelledOrder?isAscending=${isAscending}&number=${number}`)
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => console.log(err))
    }
    fetchData()
  }, [isAscending, number])

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
        <div
          style={{
            width: "10rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span>0</span>{" "}
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={10}
            min={0}
            max={25}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <span>25</span>
        </div>
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

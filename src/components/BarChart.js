import { Grid, Item, Paper, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const BarChart = () => {

  const [cancelledOrders , setCancelledOrders] = useState([])
  const [totalOrders , setTotalOrders] = useState([])


  useEffect(()=>{
    fetch("http://localhost:5000/cancelledOrders")
    .then(res => res.json())
    .then(data => setCancelledOrders(Object.entries.map(data).map(([key, value]) => ({
      type: 'bar',
      x: [key],
      y: [value],
      name: `Cancelled Orders`
    })) )  )
    .catch(err => console.log(err))

    fetch("http://localhost:5000/totalOrders")
    .then(res => res.json())
    .then(data => setCancelledOrders(Object.entries.map(data).map(([key, value]) => ({
      type: 'bar',
      x: [key],
      y: [value],
      name: `Total Orders`
    })) )  )
    .catch(err => console.log(err))

  }, [])

  console.log(cancelledOrders)

  if(!(cancelledOrders && totalOrders)) return <div>Loading...</div>
  return ( <div className="center gap">
      <Plot
        data={[cancelledOrders, totalOrders]}
      />
      <div className="center">

      <Plot
      data={[
        {type : "scatter",mode: "markers" ,x: [1,2,3,4], y: [10,11,12,13], marker: {color: 'red'}},
      ]}
      layout={{ title: "Time taken to accept order of Dukes", width: 420, height: 340 }}
      />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Vendor</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        color="secondary"
      >
        <MenuItem value={10}>Dukes</MenuItem>
        <MenuItem value={20}>Way up</MenuItem>
      </Select>
    </FormControl>
      </div>
    </div>
  );
};

export default BarChart;

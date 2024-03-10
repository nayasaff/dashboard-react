import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Plot from "react-plotly.js";
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import AppContainer from '../components/AppContainer';


const Vendors = () => {

  const [avgTime, setAvgTime] = useState([])
  const [vendor, setVendor] = useState('')

  useEffect(()=>{
    const fetchData = ()=>{
     axios.get("http://localhost:5000/averageTime")
      .then(res => {
        setAvgTime(res.data)
        setVendor(Object.keys(res.data)[0])
      })
      .catch(err => console.log(err))
    }

    fetchData()
  }, [])



  if(!(avgTime && vendor)) return <div>Loading...</div>
  else return (
    
    <AppContainer>
      <div style={{display : "flex", alignItems : "center", gap : "1rem"}}>
      <Typography variant="h4" gutterBottom>
        Select vendor
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Vendor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={vendor}
          label="Vendor"
          onChange={(e) => setVendor(e.target.value)}
        >
          {Object.keys(avgTime).map((vendor, index) => (
            <MenuItem key={index} value={vendor}>{vendor}</MenuItem>
          ))}

        </Select>
      </FormControl>
      </div>
     
    <div className='center'>
            <Plot
      data={[
        {type : "scatter",mode: "markers" ,x: Array.from({length: avgTime[vendor].length }, (_, i) => i + 1), y: avgTime[vendor], marker: {color: 'blue'}},
      ]}
      layout={{ title: `Hours taken for ${vendor} to accept order`, width: 420, height: 340 }}
      />

    </div>
    </AppContainer>
   
  )
}

export default Vendors

import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import Plot from "react-plotly.js"
import { useSelector } from "react-redux"
import axios from "axios"
import { grey } from "@mui/material/colors"

const TimeTaken = () => {
  const [data, setData] = useState()
  const state = useSelector((state) => state.app)
  const { number, startDate, endDate, isAscending } = state

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:5000/timeTaken?isAscending=${isAscending}&number=${number}&startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}`
        ,{
          headers: {
            Authorization : localStorage.getItem("token")
          }
        }
        )
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
    }
    fetchData()
  }, [number, isAscending, startDate, endDate])

  if (!data) return <div>Loading...</div>
  return (
    <Box sx={{display : 'flex', gap : '1em'}}>

      <Box sx={{borderRadius : '16px',border: `1px ${grey[400]} solid`, backgroundColor : 'white' }}>
      <Plot
        data={[
          {
            y: data["maximum_time"]["maxTime"],
            x: data["maximum_time"]["vendor_name"],
            type: "bar",
            name: "Time Taken",
            marker: {
              color: "DarkRed",
            },
          },
        ]}
        layout={{
          title: "Maximum Response Time",
          width: 400,
          height: 340,
          yaxis: {
            title: "Time (in hours)",
          },
          xaxis : {
            title : "Vendor Name"
          },
          paper_bgcolor : 'transparent'
        }}
      />
      </Box>
      <Box sx={{
          borderRadius: "16px",
          border: `1px ${grey[400]} solid`,
          backgroundColor : 'white',
      }}>
      <Plot
        data={[
          {
            y: data["average_time"]["averageTime"],
            x: data["average_time"]["vendor_name"],
            type: "bar",
            marker: {
              color: "purple",
            },
          },
        ]}
        layout={{
          title: "Average Response Time",
          width: 400,
          height: 340,
          yaxis: {
            title: "Time (in hours)",
          },
          xaxis : {
            title : "Vendor Name"
          },
          paper_bgcolor : 'transparent'
        }}
      />
      </Box>
      <Box sx={{borderRadius : '16px',border: `1px ${grey[400]} solid`, backgroundColor : 'white' }}>
      <Plot
        data={[
          {
            y: data["minimum_time"]["minTime"],
            x: data["minimum_time"]["vendor_name"],
            type: "bar",
            marker: {
              color: "",
            },
          },
        ]}
        layout={{
          title: "Minimum Response Time",
          width: 400,
          height: 340,
          yaxis: {
            title: "Time (in hours)",
          },
          xaxis : {
            title : "Vendor Name"
          },
          paper_bgcolor : 'transparent'
        }}
      />
  </Box>
    </Box>
  )
}

export default TimeTaken

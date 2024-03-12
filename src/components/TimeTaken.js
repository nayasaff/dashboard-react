import React, { useEffect, useState } from "react"
import { Typography } from "@mui/material"
import Plot from "react-plotly.js"
import { useSelector } from "react-redux"
import axios from "axios"

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
    <>
      <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
        Time taken by each vendors to respond to the customer
      </Typography>
      <div className="center">
        <Plot
          data={[
            {
              y: data["average_time"]["averageTime"],
              x: data["average_time"]["vendor_name"],
              type: "bar",
              name: "Time Taken",
              marker: {
                color: "purple",
              },
            },
          ]}
          layout={{
            title: "Average Time",
            width: 520,
            height: 340,
            yaxis: {
              title: "Average Time Taken (in hours)",
            },
          }}
        />
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
            title: "Maximum Time",
            width: 520,
            height: 340,
            yaxis: {
              title: "Average Time Taken (in hours)",
            },
          }}
        />
      </div>
      <div className="center">
        <Plot
          data={[
            {
              y: data["minimum_time"]["minTime"],
              x: data["minimum_time"]["vendor_name"],
              type: "bar",
              name: "Time Taken",
              marker: {
                color: "",
              },
            },
          ]}
          layout={{
            title: "Minimum Time",
            width: 520,
            height: 340,
            yaxis: {
              title: "Average Time Taken (in hours)",
            },
          }}
        />
      </div>
    </>
  )
}

export default TimeTaken

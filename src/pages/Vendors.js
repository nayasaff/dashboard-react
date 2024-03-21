import axios from "axios"
import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material"
import AppContainer from "../components/AppContainer"

const Vendors = () => {
  const [data, setData] = useState([])
  const [userVendors, setUserVendors] = useState("")
  const [currentVendor, setCurrentVendor] = useState("")

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5000/users/vendorsOfUser", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setUserVendors(res.data)
          setCurrentVendor(res.data[0])
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:5000/timeTaken/${currentVendor._id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [currentVendor])

  if (!(data && userVendors)) return <div>Loading...</div>
  else
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant="h4" gutterBottom>
            Select vendor
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Vendor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentVendor}
              getOptionLabel={(option) => option.name.en}
              label="Vendor"
              onChange={(e) => setCurrentVendor(e.target.value)}
            >
              {userVendors.map((value) => (
                <MenuItem value={value}>{value.name.en}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="center">
          <Plot
            data={[
              {
                type: "scatter",
                mode: "markers",
                x: data["indexes"],
                y: data["time_taken"],
                marker: { color: "blue" },
              },
            ]}
            layout={{
              title: `Hours taken for ${currentVendor.name.en} to accept order`,
              width: 520,
              height: 340,
            }}
          />
          <Plot
            data={[
              {
                values: data["count"],
                labels: data["typeOfOrder"],
                type: "pie",
              },
            ]}
            layout={{
              title: `Type of Order`,
              width: 570,
              height: 390,
            }}
          />
        </div>
      </>
    )
}

export default Vendors

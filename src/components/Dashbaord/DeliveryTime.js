import React, { useState, useEffect } from "react"
import { Box, Grid } from "@mui/material"
import { grey } from "@mui/material/colors"
import axios from "axios"
import Plot from "react-plotly.js"
import { useSelector } from "react-redux"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"
import { randomColor } from "../../utils/utils"


const DeliveryTime = () => {
  

  const state = useSelector((state) => state.app)
  const { number, startDate, endDate, isAscending } = state



  return (
    <>

    </>
  )
}

export default DeliveryTime

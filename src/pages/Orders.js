import React, { useEffect, useState } from "react"
import axios from "axios"
import CancelledOrders from "../components/CancelledOrders"
import TimeTake from "../components/TimeTaken"
import {Box} from "@mui/material"

const Orders = () => {

  return (
    <div>

      <CancelledOrders/>
      <Box m={4} />
      <TimeTake/>
     </div>
  )
}

export default Orders

import React, { useEffect, useState } from "react";
import axios from "axios"
import Plot from "react-plotly.js"


const OrderTaken = ({currentVendor}) => {

    const [orderTaken, setOrderTaken] = useState()

    useEffect(()=>{
        const fetchData = async()=>{
            if(!currentVendor._id )
            return

            const response = await axios.get(`http://localhost:5000/orderTaken/${currentVendor._id}`, {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })

            if(response.status === 200){
                setOrderTaken(response.data)
            }

        }
        fetchData()
    }, [])

    if(!orderTaken) return <div>Loading...</div>

    return <Plot
    data={[
      {
        x: orderTaken["orderTaken"],
        y: orderTaken["orderTakenCount"],
        type: "scatter",
        mode: "lines+markers",
        marker: { size: 5 },
        line: { shape: "spline" },
      },
    ]}
    layout={{
      title: "Order Taken",
      xaxis: { type: "date", autorange: true },
      yaxis: {
        range: [0, Math.max(...orderTaken["orderTakenCount"]) + 1],
      },
      width: 850,
      height: 340,
      paper_bgcolor: "transparent",
    }}
  />
}

export default OrderTaken;
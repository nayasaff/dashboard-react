import React, { useEffect, useState } from "react";
import axios from "axios"
import Plot from "react-plotly.js"


const OrderTaken = ({currentVendor}) => {

    const [orderTaken, setOrderTaken] = useState()

    useEffect(()=>{
        const fetchData = async()=>{
            if(!currentVendor._id )
            return
          let response
            try{
           response = await axios.get(`http://localhost:5000/orderTaken/${currentVendor._id}`, {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })
          }catch(err){
              console.log(err)
          }

            if(response.status === 200){
                setOrderTaken(response.data)
            }

        }
        fetchData()
    }, [])

    if(!orderTaken) return <div></div>

    return <Plot
    data={[
      {
        x: orderTaken["orderTaken"],
        y: orderTaken["orderTakenCount"],
        type: "scatter",
        mode: "lines+markers",
        marker: {color : "#1CD0BB", size: 5 },
      
      },
    ]}
    style={{ width: "100%", height: "100%" }}
    layout={{
      title: "Orders per day",
      xaxis: { type: "date", autorange: true },
      yaxis: {
        range: [0, Math.max(...orderTaken["orderTakenCount"]) + 1],
      },
      paper_bgcolor: "transparent",
      height : 300
    }}
  />
}

export default OrderTaken;
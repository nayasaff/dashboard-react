import React, {useState, useEffect} from "react"
import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import axios from "axios"
import Plot from "react-plotly.js"

const DeliveryTime = () => {

    const [deliveryTime, setDeliveryTime] = useState()

    useEffect(() => {
        axios.get("http://localhost:5000/deliveryTime", {
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
        }).then(res => setDeliveryTime(res.data))
        .catch(err => console.log(err))
    },[])


    if(!deliveryTime) return <div></div>
 

  return (
    <Box sx={{display : 'flex', borderRadius : '16px', backgroundColor : 'white', border : `1px ${grey[400]} solid`, width : '50%'}}>
    <Plot data={Object.entries(deliveryTime).map(([key, value]) =>{
        if(key !== " Up") return {
            y : value,
            name : key,
            type : 'box',
        }

        return {}
    }
    )}
        layout={{
            title: 'Delivery Time',
            boxmode: 'group',
            width: 520,
            height: 340,
            paper_bgcolor : 'transparent'
        }}
    />
    </Box>
  )
}

export default DeliveryTime

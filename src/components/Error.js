import React from "react"
import { Box, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import { blue } from "@mui/material/colors"
import { useNavigate } from "react-router-dom"

export default function Error() {

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        padding: "1rem 2rem",
        height: "60vh",
      }}
    >
      <Typography variant="h1" sx={{fontWeight : "bold", color : "#374151", fontSize : "12rem"}}>404</Typography>
      <Typography
        fontWeight=""
        variant="h4"
        sx={{ margin: "0.5rem 0", color : "#374151", fontSize : "2.2rem"}}
      >
       Page Not Found
      </Typography>
      <Box sx={{margin : "0.5rem 0"}}></Box>
      <Button 
      onClick={()=> goBack()}
      variant="contained" size="large" sx={{bgcolor : blue[700]}}>Go Back</Button>
    </Box>
  )
}
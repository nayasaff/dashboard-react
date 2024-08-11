import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function Empty() {
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
      <img
        src={require("../assets/exclamation_mark.png")}
        alt="No data found"
      />
      <Typography
        variant="h4"
        fontWeight=""
        sx={{ margin: "0.5rem 0", fontWeight: "bold" }}
      >
        No Data Found
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 520 }}>
        Wait until one of the admins assign you to a vendor
      </Typography>
    </Box>
  )
}

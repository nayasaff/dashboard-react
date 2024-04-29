import { Box } from "@mui/material"
import React from "react"
import ContentLoader from "react-content-loader"

export default function VendorPlaceholder() {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        backgroundColor: "white",
        padding: 2,
        width: "100%",
      }}
    >
      <ContentLoader width="100%" height={300}>

          <rect x="0" y="0" width="20%" height="15%"></rect>
          <rect x="27%" y="0" width="20%" height="15%"></rect>
          <rect x="52%" y="0" width="20%"height="15%"></rect>
          <rect x="77%" y="0" width="20%" height="15%"></rect>
          <rect x='0' y="20%" width="72%" height="80%"></rect>

          <rect x="77%" y="25%" width="20%" height="15%"></rect>
          <rect x="77%" y="50%" width="20%" height="15%"></rect>
          <rect x="77%" y="75%" width="20%" height="15%"></rect>
      </ContentLoader>
    </Box>
  )
}

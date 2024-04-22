import { Box } from "@mui/material"
import React from "react"
import ContentLoader from "react-content-loader"

export default function GraphPlaceholder() {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        backgroundColor: "white",
        padding: 2,
      }}
    >
      <ContentLoader 
      width="100%"
      height={320}>
        {/* First rect */}
        <rect x="0" y="0" rx="5" ry="5" width="30%" height="320" />
         <rect x="33%" y="0" rx="5" ry="5" width="30%" height="320" />
        <rect x="66%" y="0" rx="5" ry="5" width="30%" height="320" /> *
      </ContentLoader>
    </Box>
  )
}

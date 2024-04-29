import { Box } from "@mui/material"
import React from "react"
import ContentLoader from "react-content-loader"

export default function TagPlaceholder() {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        backgroundColor: "white",
        padding: 2,
        width: "100%",
      }}
    >

      <ContentLoader width="100%" height={250}>
        <rect x="0" y="0" rx="5" ry="5" width="75%" height="320"></rect>
        <rect x="78%" y="0" rx="5" ry="5" width="25%" height="20%"></rect>
        <rect x="78%" y="25%" rx="5" ry="5" width="25%" height="20%"></rect>
      </ContentLoader>
    </Box>
  )
}

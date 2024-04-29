import { Box } from "@mui/material"
import React from "react"
import ContentLoader from "react-content-loader"

export default function HeaderPlaceholder() {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        backgroundColor: "white",
        padding: 1,
        paddingTop : 1.5,
        width: "100%",
      }}
    >
        <ContentLoader width="100%" height={30}>
        <rect x="0" y="0" width="30%" height="100%"></rect>
        <rect x="45%" y="0"  width="10%" height="100%"></rect>
        <rect x="58%" y="0" rx="5" ry="5" width="20%" height="100%"></rect>
        <rect x="80%" y="0" rx="5" ry="5" width="20%" height="100%"></rect> 
        </ContentLoader>
    </Box>
  )
}

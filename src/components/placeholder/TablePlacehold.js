import { Box } from "@mui/material"
import React from "react"
import ContentLoader from "react-content-loader"

export default function TablePlaceholder() {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        backgroundColor: "white",
        padding: 2,
      }}
    >
        <ContentLoader width="100%" height="150">
            <rect x="0" y="0" rx="5" ry="5" width="15%" height="25%"></rect>
            <rect x="0" y='30%' width="30%" height="25%"></rect>
            <rect x="32%" y='30%' width="9%" height="25%"></rect>
            <rect x="0" y='65%' width="100%" height="25%"></rect>
        </ContentLoader>

    </Box>
  )
}

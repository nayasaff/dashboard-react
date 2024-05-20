import { Box } from "@mui/material"
import React from "react"
import ContentLoader from "react-content-loader"

export default function VendorPlaceholder() {
  return (
    <>
    <Box
      sx={{
        borderRadius: "16px",
        backgroundColor: "white",
        padding: {
          xl : 2,
          lg : 2,
          md : 1.5,
          sm : 1
        },
        width: "100%",
        display: {
          sm: "none",
          md: "none",
          lg: "block",
          xl: "block",
        }
      }}
    >
      <ContentLoader width="100%" height={90}>
          <rect x="0" y="0" width="20%" height="100%"></rect>
          <rect x="27%" y="0" width="20%" height="100%"></rect>
          <rect x="52%" y="0" width="20%"height="100%"></rect>
          <rect x="77%" y="0" width="20%" height="100%"></rect>
      </ContentLoader>
    </Box>
    <Box
    sx={{
      borderRadius: "16px",
      backgroundColor: "white",
      padding: {
        xl : 2,
        lg : 2,
        md : 1.5,
        sm : 1
      },
      width: "100%",
      display: {
        sm: "block",
        md: "block",
        lg: "none",
        xl: "none",
      }
    }}
    >
      <ContentLoader width="100%" height={90}>
     <rect x="0" y="0" width="45%" height="100%"></rect>
     <rect x="50%" y="0" width="45%" height="100%"></rect>     
     </ContentLoader> 
    </Box>
    <Box
    sx={{
      borderRadius: "16px",
      backgroundColor: "white",
      padding: {
        xl : 2,
        lg : 2,
        md : 1.5,
        sm : 1
      },
      width: "100%",
      display: {
        sm: "block",
        md: "block",
        lg: "none",
        xl: "none",
      }
    }}
    >
      <ContentLoader width="100%" height={90}>
     <rect x="0" y="0" width="45%" height="100%"></rect>
     <rect x="50%" y="0" width="45%" height="100%"></rect>     
     </ContentLoader> 
    </Box>
    </>
  )
}

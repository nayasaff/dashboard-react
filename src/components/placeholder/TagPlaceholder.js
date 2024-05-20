import { Box } from "@mui/material"
import React from "react"
import ContentLoader from "react-content-loader"

export default function TagPlaceholder() {
  return (
    <>
    <Box
      sx={{
        borderRadius: "16px",
        backgroundColor: "white",
        padding: 2,
        width: "100%",
        display: {
          sm: "none",
          md: "none",
          lg: "none",
          xl: "block",
        }
      }}
    >

      <ContentLoader width="100%" height={250}>
        <rect x="0" y="0" rx="5" ry="5" width="75%" height="320"></rect>
        <rect x="78%" y="0" rx="5" ry="5" width="25%" height="20%"></rect>
        <rect x="78%" y="25%" rx="5" ry="5" width="25%" height="20%"></rect>
      </ContentLoader>
    </Box>
    <Box
      sx={{
        borderRadius: "16px",
        backgroundColor: "white",
        padding: 2,
        width: "100%",
        display: {
          sm: "block",
          md: "block",
          lg: "block",
          xl: "none",
        }
      }}
    >
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
        lg: "block",
        xl: "none",
      }
    }}
    >
      <ContentLoader width="100%" height={80}>
     <rect x="0" y="0" width="47.5%" height="100%"></rect>
     <rect x="52.5%" y="0" width="47.5%" height="100%"></rect>     
     </ContentLoader> 
    </Box>
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
            lg: "block",
            xl: "none",
          }
        }}
    >
     <ContentLoader width="100%" height={200}>
      <rect x="0" y="0" width="100%" height="100%"></rect>
      </ContentLoader>
    </Box>
    </>
  )
}

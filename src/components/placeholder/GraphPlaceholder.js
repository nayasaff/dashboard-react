import Box from "@mui/material/Box"
import React from "react"
import ContentLoader from "react-content-loader"

export default function GraphPlaceholder({ numberOfGraph }) {
  return (
    <>
      <Box
        sx={{
          borderRadius: "16px",
          backgroundColor: "white",
          padding: 2,
          display: {
            sm: "none",
            md: "none",
            lg: "none",
            xl: "block",
          },
        }}
      >
        <ContentLoader width="100%" height={300}>
          {/* First rect */}
          {numberOfGraph === 3 ? (
            <>
              {" "}
              <rect x="0" y="0" rx="5" ry="5" width="30%" height="300" />
              <rect x="33%" y="0" rx="5" ry="5" width="30%" height="300" />
              <rect x="66%" y="0" rx="5" ry="5" width="30%" height="300" />
            </>
          ) : (
            <>
              {" "}
              <rect x="1%" y="0" rx="5" ry="5" width="46%" height="300"></rect>
              <rect x="54%" y="0" rx="5" ry="5" width="45%" height="300"></rect>
            </>
          )}
        </ContentLoader>
      </Box>
      <Box
        sx={{
          borderRadius: "16px",
          backgroundColor: "white",
          padding: 2,
          display: {
            sm : "none",
            md: "block",
            lg: "block",
            xl: "none",
          },
        }}
      >
        <ContentLoader width="100%" height={300}>
          <rect x="1%" y="0" rx="5" ry="5" width="46%" height="300"></rect>
          <rect x="54%" y="0" rx="5" ry="5" width="45%" height="300"></rect>
        </ContentLoader>
      </Box>
      <Box         sx={{
          borderRadius: "16px",
          backgroundColor: "white",
          padding: 2,
          display: {
            sm : "block",
            md: "none",
            lg: "none",
            xl: "none",
          },
        }}>
          <ContentLoader width="100%" height={300}>
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
          </ContentLoader>
      </Box>
    </>
  )
}

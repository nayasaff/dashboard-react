import { Box } from "@mui/material"
import React from "react"
import ContentLoader from "react-content-loader"

export default function GraphPlaceholder({numberOfGraph}) {
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
      height={300}>
        {/* First rect */}
        {numberOfGraph === 3 ?<> <rect x="0" y="0" rx="5" ry="5" width="30%" height="300" />
         <rect x="33%" y="0" rx="5" ry="5" width="30%" height="300" />
        <rect x="66%" y="0" rx="5" ry="5" width="30%" height="300" /> 
        </>
      :<> <rect x="1%" y="0" rx="5" ry="5" width="46%" height="300" ></rect>
      <rect x="54%" y="0" rx="5" ry="5" width="45%" height="300" ></rect>
       </>
      }
      </ContentLoader>
    </Box>
  )
}

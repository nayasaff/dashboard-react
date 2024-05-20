import { Box, Card, CardContent, Typography } from "@mui/material"
import React from "react"
import { grey } from "@mui/material/colors"
import { Stack } from "@mui/material"



const Tag = ({ title, count, icon, subtitle }) => {
  return (
    <Card
      sx={{
        borderRadius: "16px",
        border: `1px ${grey[400]} solid`,
        boxShadow: "none",
        width: "100%",
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: "520" }}
              align="center"
            >
              {count} <span style={{ fontSize: "14px" }}>{subtitle}</span>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{whiteSpace : "nowrap", padding : "0", margin : "0",
              fontSize : {
                xl : "1.25rem" ,
               lg : title.length > 20 && "1rem" ,
               md : "1.25rem",
               sm : title.length > 20 && "1rem" ,
              }
            }} gutterBottom>
              {title}
            </Typography>
          </Box>
          {icon}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Tag

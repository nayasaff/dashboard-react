import { Box, Card, CardContent, Typography } from "@mui/material"
import React from "react"
import { grey } from "@mui/material/colors"
import { Stack } from "@mui/material"

const cardWidth = {xl : 225, lg : 220, md : 220}

const Tag = ({ title, count, icon, subtitle }) => {
  return (
    <Card
      sx={{
        width : {xl : cardWidth.xl, lg : cardWidth.lg, md : cardWidth.md},
        borderRadius: "16px",
        border: `1px ${grey[400]} solid`,
        boxShadow: "none",
        flex : 1
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
              {count}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{whiteSpace : "nowrap", padding : "0", margin : "0"}} gutterBottom>
              {title}
            </Typography>
            {subtitle && <Typography variant="body1" color="text.secondary" sx={{whiteSpace : "nowrap", padding : "0", margin : "0"}} gutterBottom>{subtitle}</Typography>}
          </Box>
          {icon}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Tag

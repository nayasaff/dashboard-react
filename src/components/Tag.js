import { Box, Card, CardContent, Typography } from "@mui/material"
import React from "react"
import { grey } from "@mui/material/colors"
import { Stack } from "@mui/material"

const cardWidth = {xl : 255, lg : 220, md : 220}

const Tag = ({ title, count, icon }) => {
  return (
    <Card
      sx={{
        width : "100%",
        borderRadius: "16px",
        border: `1px ${grey[400]} solid`,
        boxShadow: "none",
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
            <Typography variant="h6" color="text.secondary" gutterBottom>
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

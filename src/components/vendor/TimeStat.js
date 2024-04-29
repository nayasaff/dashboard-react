import React from "react"
import Plot from "react-plotly.js"
import { Stack, Box, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { TableContainer, Table } from "@mui/material"
import { TableHead, TableBody } from "@mui/material"
import { TableRow, Paper } from "@mui/material"
import { styled } from "@mui/material/styles"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import GraphPlaceholder from "../placeholder/GraphPlaceholder"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

export const TimeStat = ({ data }) => {
  const calculateAverage = (times) => {
    const sum = times.reduce((a, b) => a + b, 0)
    const avg = sum / times.length || 0

    return avg
  }

  if(!data)
  return <GraphPlaceholder numberOfGraph={3}/>

  return (
    <Stack direction="row" spacing={2}>
      <Box
        sx={{
          borderRadius: "16px",
          border: `1px ${grey[400]} solid`,
          backgroundColor: "white",
          flex : 1
        }}
      >
        <Plot
          data={[
            {
              y: data["deliveryTime"],
              name: "Delivery Time",
              type: "box",
              marker: { color: "#F5B041" },
            },
          ]}
          style={{ width: "100%", height: "100%" }}
          layout={{
            title: "Delivery Time",
            yaxis: {
              title: "Time in minutes",
            },
            paper_bgcolor: "transparent",
            height : 340
          }}
        />
      </Box>
      <Box
        sx={{
          borderRadius: "16px",
          border: `1px ${grey[400]} solid`,
          backgroundColor: "white",
          flex : 1
        }}
      >
        <Plot
          data={[
            {
              y: data["timeTaken"],
              name: "Response Time",
              type: "box",
              marker: { color: "#27AE60" },
            },
          ]}
          style={{ width: "100%", height: "100%" }}
          layout={{
            title: "Response Time",
            yaxis: {
              title: "Time in hours",
            },
            paper_bgcolor: "transparent",
            height : 340
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: "16px",
          border: `1px ${grey[400]} solid`,
          backgroundColor: "white",
          flex : 1
        }}
      >
        <Box sx={{padding : "1rem"}}>
        <Typography sx={{padding : "1rem"}} variant="h6">Delivery Time and Response Time</Typography>
        <TableContainer component={Paper} sx={{width : "auto"}}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="center">Min</StyledTableCell>
                <StyledTableCell align="center">Avg</StyledTableCell>
                <StyledTableCell align="center">Max</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Response Time (min)
                </StyledTableCell>
                <StyledTableCell align="center">
                  {Math.min(...data["timeTaken"]).toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="center">{calculateAverage(data["timeTaken"]).toFixed(2)}</StyledTableCell>
                <StyledTableCell align="center">
                  {Math.max(...data["timeTaken"]).toFixed(2)}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Delivery Time (hours)
                </StyledTableCell>
                <StyledTableCell align="center">
                  {Math.min(...data["deliveryTime"]).toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="center">{calculateAverage(data["deliveryTime"]).toFixed(2)}</StyledTableCell>
                <StyledTableCell align="center">
                  {Math.max(...data["deliveryTime"]).toFixed(2)}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
      </Box>
    </Stack>
  )
}

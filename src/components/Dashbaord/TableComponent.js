import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import { grey } from "@mui/material/colors"
import Menu from "@mui/material/Menu"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"
import { FilterList, Search } from "@mui/icons-material"
import { Box, Stack } from "@mui/material"
import { Pagination, Typography, InputAdornment, MenuItem } from "@mui/material"
import TextField from "@mui/material/TextField"
import { visuallyHidden } from "@mui/utils"
import TableSortLabel from "@mui/material/TableSortLabel"
import { useState } from "react"
import { Link } from "react-router-dom"
import TablePlaceholder from "../placeholder/TablePlaceholder"

const columns = [
  { name: "Total Orders", value: "total_orders" },
  { name: "Cancellation Rate", value: "cancellation_rate" },
  { name: "Total price loss", value: "total_price" },
  { name: "Last Order", value: "last_order" },
  { name: "Avg Response Time", value: "average_response_time" },
  { name: "Avg Delivery Time", value: "average_delivery_time" },
  { name: "Last Updated time", value: "upated_item" },
]

function stableSort(array, order, orderBy) {
  return array.sort((a, b) => {
    const orderFactor = order === "asc" ? 1 : -1;
    const valueA = typeof a[orderBy] === "string" ? a[orderBy].localeCompare(b[orderBy]) : a[orderBy];
    const valueB = typeof b[orderBy] === "string" ? b[orderBy].localeCompare(a[orderBy]) : b[orderBy];

    // Handle case sensitivity using localeCompare
    if (valueA > valueB) {
      return orderFactor;
    } else if (valueA < valueB) {
      return -orderFactor;
    } else {
      // If values are equal, use original array order for stability
      return array.indexOf(a) - array.indexOf(b);
    }
  });
}

const TableComponent = ({ insights, filteredValue, setFilteredValue }) => {
  const [page, setPage] = useState(0)

  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("total_orders")

  const [searchValue, setSearchValue] = useState("")
 

  // const emptyRows =
  //   page === Math.ceil(insights.length / 10) - 1
  //     ? Math.max(0, (1 + page) * 10 - insights.length)
  //     : 0

  const handleMenuItemSelected =(name, value, popupState)=>{
    setFilteredValue({name, value})
    popupState.close()
  }

  const formateNumber = (number) => {
    if(number === undefined || number === null) return number
    if (typeof number === "string") return number
    return number.toFixed(2)
  }


  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const filteredInsights = React.useMemo(() => {
    return insights.filter((insight) =>
      insight.vendor_name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [insights, searchValue])

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredInsights, order, orderBy).slice(
        page * 10,
        page * 10 + 10
      ),
    [filteredInsights, order, orderBy, page]
  )


  if (insights === undefined || insights === null) return <TablePlaceholder/>

  return (
    <Box
      sx={{
      
        borderRadius: "16px",
        border: `1px ${grey[400]} solid`,
        boxShadow: "none",
        backgroundColor: "white",
        padding: "1rem 1.5rem",
        display: {
          sm : "none", 
          md : 'flex'
        },
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }} margin={0}>
        Vendors
      </Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        {/********************************************SEARCH************************************************************ */}
        <TextField
          size="small"
          variant="outlined"
          sx={{ padding: "1rem 0rem", width: "24rem" }}
          placeholder="Search by name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {/********************************************FILTER************************************************************ */}
        <PopupState variant="popover" sx={{width : "100%"}}>
          {(popupState) => (
            <React.Fragment>
              <Button variant="outlined" {...bindTrigger(popupState)}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <span
                    style={{
                      fontWeight: "normal",
                      textTransform: "capitalize",
                    }}
                  >
                    {filteredValue.name ? filteredValue.name : "Filter"}
                  </span>
                  <FilterList />
                </Stack>
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={()=>handleMenuItemSelected("", "", popupState)}>All</MenuItem>
                <MenuItem onClick={()=>handleMenuItemSelected("On Demand", "onDemand", popupState)}>On Demand</MenuItem>
                <MenuItem onClick={()=>handleMenuItemSelected("Instant", "instant" ,popupState)}>Instant</MenuItem>
                <MenuItem onClick={()=>handleMenuItemSelected("Same Day", "sameDay" ,popupState)}>Same Day</MenuItem>
                <MenuItem onClick={()=>handleMenuItemSelected("Next Day", "nextDay", popupState)}>Next Day</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </Stack>

      {/********************************************TABLE************************************************************ */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ bgcolor: grey[300] }}>
            <TableRow>
              {/*************************TABLE COLUMNS************************************************ */}
              <TableCell>Name</TableCell>
              {columns.map((column, columnIndex) => (
                <TableCell
                  key={columnIndex}
                  sortDirection={orderBy === column.name ? order : false}
                  sx={{
                    display : {
                      sm : column.value === "average_delivery_time" || column.value === "average_response_time" ? "none" : "table-cell",
                      lg : "table-cell",
                      xl : "table-cell"
                    }
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column.value}
                    direction={orderBy === column.value ? order : "asc"}
                    onClick={() => handleRequestSort(column.value)}
                    sx={{ textAlign : "center"}}
                  >
                    {column.name}
                    {orderBy === column.value ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/********************************************TABLE DATA************************************************************* */}
            {visibleRows.map((insight, insightIndex) => (
              <TableRow
                key={insightIndex}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Link
                      to="/vendors"
                      state={{
                        _id: insight._vendor,
                        name: { en: insight.vendor_name },
                      }}
                    >
                      <Box
                        sx={{
                          color: "black",
                          "&:hover": {
                            color: "blue",
                            textDecoration: "underline",
                          },
                          cursor: "pointer",
                        }}
                      >
                        {insight.vendor_name}
                      </Box>
                    </Link>
                  </Stack>
                </TableCell>
                <TableCell align="center">{insight.total_orders}</TableCell>
                <TableCell align="center">
                  {formateNumber(insight.cancellation_rate)}%
                </TableCell>
                <TableCell align="center">
                  {formateNumber(insight.subtotal)}
                </TableCell>
                <TableCell align="center">{insight.last_order}</TableCell>
                <TableCell sx={{
                  display : {
                    sm : "none",
                    md : "table-cell",
                  }
                }} align="center">
                  {formateNumber(insight.average_response_time)}
                </TableCell>
                <TableCell
                sx={{
                  display : {
                    sm : "none",
                    md : "table-cell",
                  }
                }}
                align="center">
                  {insight.average_delivery_time}
                </TableCell>
                <TableCell align="center">{insight.upated_item}</TableCell>
              </TableRow>
            ))}

            {/********************************************EMPTY ROWS FOR LAST PAGE************************************************************ */}
          </TableBody>
        </Table>
      </TableContainer>

      {/********************************************Table Pages************************************************************ */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Pagination
          count={Math.ceil(insights.length / 10)}
          onChange={(e, value) => setPage(value - 1)}
          size="large"
        />
      </Box>
    </Box>
  )
}

export default TableComponent

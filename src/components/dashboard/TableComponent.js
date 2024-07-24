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
import { Link, useLocation } from "react-router-dom"
import TablePlaceholder from "../placeholder/TablePlaceholder"
import CircularProgress from '@mui/material/CircularProgress';

const columns = [
  { name: "Total Orders", value: "total_orders" },
  { name: "Incompleted Orders", value: "incompleted_orders" },
  {name : "Cancellation Rate", value : "cancellation_rate"},
  { name: "Expected Income", value: "subtotal_loss" },
  { name: "Last Order", value: "last_order" },
  { name: "Avg Response Time", value: "average_response_time", label : "in minutes" },
  { name: "Avg Delivery Time", value: "average_delivery_time", label : "in hours" },
  { name: "Total Items", value: "total_items" },
  { name: "Last Updated Item", value: "updated_item" },
  {name : "Num Items Update", value : "stock_update", label : "(last 2 weeks)"},
  {name : "Stock Updates", value : "stock_update_count", label : "(last 2 weeks)"},
  {name : "Last Stocklog Update", value : "stock_update_date"}
]

function stableSort(array, order, orderBy) {
  return array.sort((a, b) => {
    const orderFactor = order === "asc" ? 1 : -1
    const valueA =
      typeof a[orderBy] === "string"
        ? a[orderBy].localeCompare(b[orderBy])
        : a[orderBy]
    const valueB =
      typeof b[orderBy] === "string"
        ? b[orderBy].localeCompare(a[orderBy])
        : b[orderBy]

    // Handle case sensitivity using localeCompare
    if (valueA > valueB) {
      return orderFactor
    } else if (valueA < valueB) {
      return -orderFactor
    } else {
      // If values are equal, use original array order for stability
      return array.indexOf(a) - array.indexOf(b)
    }
  })
}

const TableComponent = ({ insights, filteredValue, setFilteredValue, isLoading }) => {
  const [page, setPage] = useState(0)

  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("total_orders")
  const location = useLocation()

  const pagesNumber = location.pathname === "/table" ? 10 : 5

  const [searchValue, setSearchValue] = useState("")
  

  const emptyRows =
    page === Math.ceil(insights.length / pagesNumber) - 1
      ? Math.max(0, (1 + page) * pagesNumber - insights.length)
      : 0

  const handleMenuItemSelected = (name, value, popupState) => {
    setFilteredValue({ name, value })
    popupState.close()
  }

  const formateNumber = (number) => {
    if (number === undefined || number === null) return number
    if (typeof number === "string") return number
    return number.toFixed(2)
  }

  const formatDate = (datetime) =>{
    if(datetime === "N/A" || datetime === null || datetime === undefined)
      return datetime
    try{
    const date = datetime.split(" ")[0].split("-")
    return `${date[2]}/${date[1]}/${date[0]}`
    }
    catch(e){
      return datetime
    }
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }


  console.log(insights)

  const filteredInsights = React.useMemo(() => {
    return insights.filter((insight) =>
      insight.vendor_name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [insights, searchValue])

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredInsights, order, orderBy).slice(
        page * pagesNumber,
        page * pagesNumber + pagesNumber
      ),
    [filteredInsights, order, orderBy, page, pagesNumber]
  )

  if (insights === undefined || insights === null) return <TablePlaceholder />

  return (
    <>
    
    <Box
      sx={{
        borderRadius: "16px",
        border: `1px ${grey[400]} solid`,
        boxShadow: "none",
        backgroundColor: "white",
        padding: "1rem 1.5rem",
        display: {
          sm: location.pathname === "/table" ? "flex" : "none",
          md: "flex",
        },
        flexDirection: "column",
      }}
    >
      <Box sx={{display : "flex", justifyContent : "space-between"}}>
      <Box>
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
        <PopupState variant="popover" sx={{ width: "100%" }}>
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
                <MenuItem
                  onClick={() => handleMenuItemSelected("", "", popupState)}
                >
                  All
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleMenuItemSelected("On Demand", "onDemand", popupState)
                  }
                >
                  On Demand
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleMenuItemSelected("Instant", "instant", popupState)
                  }
                >
                  Instant
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleMenuItemSelected("Same Day", "sameDay", popupState)
                  }
                >
                  Same Day
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleMenuItemSelected("Next Day", "nextDay", popupState)
                  }
                >
                  Next Day
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </Stack>
      </Box>
      {isLoading && <CircularProgress/>}
      </Box>
      {/********************************************TABLE************************************************************ */}
      <TableContainer sx={{ overflowX: "auto", maxWidth : '1180px' }} component={Paper}>
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
                    display: {
                      sm:
                        column.value === "average_delivery_time" ||
                        column.value === "average_response_time"
                          ? "none"
                          : "table-cell",
                      md: "table-cell",
                      lg: "table-cell",
                      xl: "table-cell",
                    },
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column.value}
                    direction={orderBy === column.value ? order : "asc"}
                    onClick={() => handleRequestSort(column.value)}
                    sx={{ textAlign: "center" }}
                  >
                    {column.label ?
                    <>
                  <Box>
                    <Typography variant="body2">{column.name}</Typography>
                    <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
                      {column.label}
                    </Typography>
                  </Box>
                  {orderBy === column.value ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                    </>
                    : <>
                    {column.name}
                    {orderBy === column.value ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                    </>}
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
                  {insight.incompleted_orders}
                </TableCell>
                <TableCell align="center">{formateNumber(insight.cancellation_rate)}%</TableCell>
                <TableCell align="center">
                  {formateNumber(insight.subtotal_loss)}
                </TableCell>
                <TableCell align="center">
                  {insight.last_order}{insight.last_order === "N/A" ? "" : insight.last_order === 1 || insight.last_order === 0 ? " day ago" : " days ago"}
                </TableCell>
                <TableCell
                  sx={{
                    display: {
                      sm: "none",
                      md: "table-cell",
                    },
                  }}
                  align="center"
                >
                  {formateNumber(insight.average_response_time)}
                </TableCell>
                <TableCell
                  sx={{
                    display: {
                      sm: "none",
                      md: "table-cell",
                    },
                  }}
                  align="center"
                >
                  {insight.average_delivery_time}
                </TableCell>
                <TableCell align="center">{insight.total_items}</TableCell>
                <TableCell align="center">{insight.updated_item}{insight.updated_item === "N/A" ? "" : insight.updated_item === 1 || insight.updated_item === 0 ? " day ago" : " days ago"}</TableCell>
                <TableCell align="center">{insight.stock_update}</TableCell>
                <TableCell align="center">
                  {insight.stock_update_count}
                </TableCell>
                <TableCell align="center">{formatDate(insight.stock_update_date)}</TableCell>
              </TableRow>
            ))}

            {/********************************************EMPTY ROWS FOR LAST PAGE************************************************************ */}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/********************************************Table Pages************************************************************ */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Pagination
          count={Math.ceil(insights.length / pagesNumber)}
          onChange={(e, value) => setPage(value - 1)}
          size="large"
        />
      </Box>
    </Box>
  
    </>
  )
}

export default TableComponent

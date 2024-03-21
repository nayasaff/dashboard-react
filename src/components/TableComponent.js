import React, { useEffect } from "react"
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
import InputLabel from "@mui/material/InputLabel"
import TextField from "@mui/material/TextField"
import { visuallyHidden } from "@mui/utils"
import TableSortLabel from "@mui/material/TableSortLabel"
import axios from "axios"
import { useState } from "react"

const columns = [
  { name: "Total Orders", value: "total_orders" },
  { name: "Cancellation Rate", value: "cancellation_rate" },
  { name: "Total price loss", value: "total_price" },
  { name: "Last Order", value: "last_order" },
  { name: "Avg Response Time", value: "average_time" },
  { name: "Avg Delivery Time", value: "average_delivery_time" },
  { name: "Last Updated time", value: "upated_item" },
]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, order, orderBy) {
  return array.sort((a, b) => {
    if (order === "asc") {
      if (a[orderBy] > b[orderBy]) {
        return 1
      } else {
        return -1
      }
    } else {
      if (a[orderBy] < b[orderBy]) {
        return 1
      } else {
        return -1
      }
    }
  })
}

const TableComponent = () => {
  const [insights, setInsights] = useState([])
  const [page, setPage] = useState(0)

  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("total_orders")

  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/all_insights", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => setInsights(res.data))
    } catch (e) {
      console.log(e)
    }
  }, [])

  const emptyRows =
    page === Math.ceil(insights.length / 10) - 1
      ? Math.max(0, (1 + page) * 10 - insights.length)
      : 0

  const sortData = (column, order) => {
    setInsights((prev) => {
      return prev.sort((a, b) => {
        if (order === "asc") {
          if (a[column] > b[column]) {
            return 1
          } else {
            return -1
          }
        } else {
          if (a[column] < b[column]) {
            return 1
          } else {
            return -1
          }
        }
      })
    })
  }



  

  const formateNumber = (number) => {
    return number.toFixed(2)
  }

  const fomratTimeDelta = (timeDelta) => {
    let timeSplit = timeDelta.split(" ")
    let time = timeSplit[timeSplit.length - 1]

    let timeWithoutNano = time.split(".")[0]

    return timeWithoutNano
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const filteredInsights = React.useMemo(() => {
    return insights.filter(insight => insight.vendor_name.toLowerCase().includes(searchValue.toLowerCase()) )
  }, [insights, searchValue])


  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredInsights, order, orderBy).slice(
        page * 10,
        page * 10 + 10
      ),
    [filteredInsights, order, orderBy, page]
  )

  if (!insights) return <div></div>

  return (
    <>
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
        <PopupState variant="popover" popupId="demo-popup-menu">
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
                    Filter
                  </span>
                  <FilterList />
                </Stack>
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>On Demand</MenuItem>
                <MenuItem onClick={popupState.close}>Instant</MenuItem>
                <MenuItem onClick={popupState.close}>Same Day</MenuItem>
                <MenuItem onClick={popupState.close}>Next Day</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </Stack>

      {/********************************************TABLE************************************************************ */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: grey[300] }}>
            <TableRow>
              {/*************************TABLE COLUMNS************************************************ */}
              <TableCell>Name</TableCell>
              {columns.map((column) => (
                <TableCell
                  sortDirection={orderBy === column.name ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.value}
                    direction={orderBy === column.value ? order : "asc"}
                    onClick={() => handleRequestSort(column.value)}
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
            {visibleRows.map((insight) => (
              <TableRow
                key={insight.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <span>{insight.vendor_name}</span>
                  </Stack>
                </TableCell>
                <TableCell align="center">{insight.total_orders}</TableCell>
                <TableCell align="center">
                  {formateNumber(insight.cancellation_rate)}
                </TableCell>
                <TableCell align="center">
                  {formateNumber(insight.total_price)}
                </TableCell>
                <TableCell align="center">{insight.last_order}</TableCell>
                <TableCell align="center">
                  {formateNumber(insight.average_time)}
                </TableCell>
                <TableCell align="center">
                  {fomratTimeDelta(insight.average_delivery_time)}
                </TableCell>
                <TableCell align="center">{insight.upated_item}</TableCell>
              </TableRow>
            ))}

            {/********************************************EMPTY ROWS FOR LAST PAGE************************************************************ */}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 30 * emptyRows,
                }}
              >
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
          count={Math.ceil(insights.length / 10)}
          onChange={(e, value) => setPage(value - 1)}
          size="large"
        />
      </Box>
    </>
  )
}

export default TableComponent

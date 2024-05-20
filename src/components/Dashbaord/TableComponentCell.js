import React from "react"
import TableCell from "@mui/material/TableCell"
import TableSortLabel from "@mui/material/TableSortLabel"
import Box from "@mui/material/Box"
import { visuallyHidden } from "@mui/utils"


const columns = [
    { name: "Total Orders", value: "total_orders" },
    { name: "Cancellation Rate", value: "cancellation_rate" },
    { name: "Total price loss", value: "total_price" },
    { name: "Last Order", value: "last_order" },
    { name: "Avg Response Time", value: "average_response_time" },
    { name: "Avg Delivery Time", value: "average_delivery_time" },
    {name : "Total Items", value : "total_items" },
    { name: "Last Updated time", value: "upated_item" },
    {name : "Stock Update (last 2 weeks)", value : "stock_update"},
    {name : "Stock Update Count (last 2 weeks)", value : "stock_update_count"}
    
  ]


const TableComponentCell = ({ orderBy, handleRequestSort, order }) => {
  return (
    <>
    <TableCell>Name</TableCell>
      <TableCell sortDirection={orderBy === "Total Orders" ? order : false}>
        <TableSortLabel
          active={orderBy === "total_orders"}
          direction={orderBy === "total_orders" ? order : "asc"}
          onClick={() => handleRequestSort("total_orders")}
          sx={{ textAlign: "center" }}
        >
          Total Orders
          {orderBy === "total_orders" ? (
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>

      <TableCell sortDirection={orderBy === "Cancellation Rate" ? order : false}>
        <TableSortLabel
          active={orderBy === "cancellation_rate"}
          direction={orderBy === "cancellation_rate" ? order : "asc"}
          onClick={() => handleRequestSort("cancellation_rate")}
          sx={{ textAlign: "center" }}
        >
          Cancellation Rate
          {orderBy === "cancellation_rate" ? (
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>

      <TableCell sortDirection={orderBy === "Total price loss" ? order : false}>
        <TableSortLabel
          active={orderBy === "total_price"}
          direction={orderBy === "total_price" ? order : "asc"}
          onClick={() => handleRequestSort("total_price")}
          sx={{ textAlign: "center" }}
        >
          Total price loss
          {orderBy === "total_price" ? (
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>

      <TableCell sortDirection={orderBy === "Last Order" ? order : false}>
        <TableSortLabel
          active={orderBy === "last_order"}
          direction={orderBy === "last_order" ? order : "asc"}
          onClick={() => handleRequestSort("last_order")}
          sx={{ textAlign: "center" }}
        >
          Last Order
          {orderBy === "last_order" ? (
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>

      <TableCell sortDirection={orderBy === "Avg Response Time" ? order : false}>
        <TableSortLabel
          active={orderBy === "average_response_time"}
          direction={orderBy === "average_response_time" ? order : "asc"}
          onClick={() => handleRequestSort("average_response_time")}
          sx={{ textAlign: "center" }}
        >
          Avg Response Time
          {orderBy === "average_response_time" ? (
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>

      <TableCell sx={{
        display : {
            sm : "none",
            md : "table-cell",
        }
      }} sortDirection={orderBy === "Avg Delivery Time" ? order : false}>
        <TableSortLabel
          active={orderBy === "average_delivery_time"}
          direction={orderBy === "average_delivery_time" ? order : "asc"}
          onClick={() => handleRequestSort("average_delivery_time")}
          sx={{ textAlign: "center" }}
        >
          Avg Delivery Time
          {orderBy === "average_delivery_time" ? (
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>

      <TableCell sortDirection={orderBy === "Total Items" ? order : false}>
        <TableSortLabel
          active={orderBy === "total_items"}
          direction={orderBy === "total_items" ? order : "asc"}
          onClick={() => handleRequestSort("total_items")}
          sx={{ textAlign: "center" }}
        >
          Total Items
          {orderBy === "total_items" ? (
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>

      <TableCell sortDirection={orderBy === "Last Updated time" ? order : false}>
        <TableSortLabel
          active={orderBy === "updated_item"}
          direction={orderBy === "updated_item" ? order : "asc"}
          onClick={() => handleRequestSort("updated_item")}
          sx={{ textAlign: "center" }}
        >
          Last Updated time
          {orderBy === "updated_item" ? (
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>

      <TableCell sortDirection={orderBy === "Stock Update (last 2 weeks)" ? order : false}>
        <TableSortLabel
          active={orderBy === "stock_update"}
          direction={orderBy === "stock_update" ? order : "asc"}
          onClick={() => handleRequestSort("stock_update")}
          sx={{ textAlign: "center" }}
        >
          Stock Update (last 2 weeks)
          {orderBy === "stock_update" ? (
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>

      <TableCell sortDirection={orderBy === "Stock Update Count (last 2 weeks)" ? order : false}>
        <TableSortLabel
          active={orderBy === "stock_update_count"}
          direction={orderBy === "stock_update_count" ? order : "asc"}
          onClick={() => handleRequestSort("stock_update_count")}
          sx={{ textAlign: "center" }}
        >
          Stock Update Count (last 2 weeks)
          {orderBy === "stock_update_count" ? (
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      </TableCell>
    </>
  )
}



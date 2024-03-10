import React, { useState } from "react"
import { red, blue } from "@mui/material/colors"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import { Button, Collapse, List, ListItem, Typography } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material"
import ExpandMore from "@mui/material/IconButton"

const UserCard = ({ user }) => {
  const [expanded, setExpanded] = useState(false)

  const formatDate = (date) => {
    return `${date.getDay()} ${date.toLocaleString("default", {
      month: "long",
    })}, ${date.getFullYear()}`
  }


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.username[0].toUpperCase()}
          </Avatar>
        }
        title={user.username}
        subheader={formatDate(new Date(user.createdAt))}
      />
      <CardContent>
        <Typography
          sx={{ fontWeight: "600" }}
          variant="body1"
          color="text.secondary"
        >
          Vendors
        </Typography>
        <List
          sx={{
            listStyleType: "disc",
            pl: 2,
            "& .MuiListItem-root": {
              display: "list-item",
              color: "text.secondary",
            },
          }}
        >
          {user.vendors.map((vendor, i) => (
            <ListItem key={i} disablePadding>
              {vendor}
            </ListItem>
          ))}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {user.vendors.slice(3).map((vendor, i) => (
                <ListItem key={i} disablePadding>
                    {vendor}
                </ListItem>
            ))}
          </Collapse>
          {user.vendors.length > 3 && (
            <ListItem disablePadding>
              <Typography
                variant="body1"
                component="div"
                display="flex"
                alignItems="center"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "gray",
                  },
                }}
              >
                Show more
                <ExpandMore
                  expand={expanded}
                  onClick={() => setExpanded((prev) => !prev)}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon sx={{ mr: 1 }} />
                </ExpandMore>
              </Typography>
            </ListItem>
          )}
        </List>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          sx={{ color: red[500], border: `1px solid ${red[500]}` }}
          endIcon={<Delete />}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: blue[700] }}
          endIcon={<Edit />}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  )
}

export default UserCard

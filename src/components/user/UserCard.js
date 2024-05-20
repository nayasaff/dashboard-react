import React, { useState } from "react"
import { red, blue } from "@mui/material/colors"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import { Button, Chip, Collapse, List, ListItem, Stack, Typography } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material"
import ExpandMore from "@mui/material/IconButton"
import UserModal from "./UserModal"
import DeleteModal from "./DeleteModal"
import Box from "@mui/material/Box"

const UserCard = ({ user }) => {
  const [expanded, setExpanded] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openDialogue, setOpenDialogue] = useState(false)

  const formatDate = (date) => {
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
    })}, ${date.getFullYear()}`
  }

  const formateRole = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1)
  }


  return (
    <Card sx={{ maxWidth: 345, alignSelf : {
      sm : "center",
      md : "flex-start",
      lg : "flex-start",
      xl : "flex-start"
    } }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.username[0].toUpperCase()}
          </Avatar>
        }
        title={user.username}
        subheader={formatDate(new Date(user.createdAt))}
      />
      <Box sx={{paddingRight : "1rem" }}>
      <Chip label={formateRole(user.role)} sx={{bgcolor :"#D1E9FF", color : "#2B8BE6", fontWeight : "550"}}/>
      </Box>
      </Stack>
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
          {user.vendors.slice(0,3).map((vendor, i) => (
            <ListItem key={i} disablePadding>
              {vendor.name.en}
            </ListItem>
          ))}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {user.vendors.slice(3).map((vendor, i) => (
                <ListItem key={i} disablePadding>
                    {vendor.name.en}
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
          onClick={()=> setOpenDialogue(true)}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: blue[700] }}
          endIcon={<Edit />}
          onClick={() => setOpenModal(true)}
        >
          Edit
        </Button>
       {openModal && <UserModal openModal={openModal} setOpenModal={setOpenModal} isEditable={true} user={user} />}
       {openDialogue && <DeleteModal openDialogue={openDialogue} setOpenDialogue={setOpenDialogue} userId={user._id}/>}
      </CardActions>
    </Card>
  )
}

export default UserCard

import { MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { format, isBefore } from "date-fns";
import { getRecentNotes } from "modules/localStorage";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  appBar: {
    position: "relative",
  },
  navDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const AppHeader = () => {
  const classes = useStyles();
  const recentNotes = getRecentNotes();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: SyntheticEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const now = new Date();

  const visibleNotes = recentNotes
    .filter(({ expirationDate }) => {
      const d = new Date(expirationDate);
      console.log({ d });

      const isExpired = isBefore(now, d);
      const n = format(now, "dd-MM-yyyy HH:mm");
      const e = format(d, "dd-MM-yyyy HH:mm");
      console.log({ isExpired, n, e });
      return isExpired;
    })
    .map(({ title, _id }) => (
      <MenuItem
        component="a"
        onClick={handleClose}
        href={`/notes/${_id}`}
        key={_id}
      >
        {title}
      </MenuItem>
    ));

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Make a note app
        </Typography>
        <Toolbar>
          <List
            aria-controls="main-nav"
            aria-labelledby="main navigation"
            component="nav"
            className={classes.navDisplayFlex}
          >
            <ListItem button component={Link} to="/notes/create">
              Create note
            </ListItem>
            <ListItem button title="Recent notes" onClick={handleClick}>
              Recent notes
            </ListItem>
            <Menu
              anchorEl={anchorEl}
              id="main-nav"
              keepMounted
              open={open}
              onClose={handleClose}
            >
              {visibleNotes}
            </Menu>
          </List>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;

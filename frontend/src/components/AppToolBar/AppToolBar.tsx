import React from "react";
import { AppBar, Grid, styled, Toolbar, Typography } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import AnonymousMenu from "./AnonymusMenu";

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">Lalafo</Link>
          </Typography>
          <Grid item>
            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;

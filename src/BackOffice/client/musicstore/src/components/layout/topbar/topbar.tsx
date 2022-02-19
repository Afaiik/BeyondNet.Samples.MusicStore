import { memo } from "react";
import { Toolbar, Typography, IconButton, AppBar, Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import { Profile } from "../../ui";

const TopBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MusicStore
          </Typography>

          <Profile />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default memo(TopBar);

import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';

const NavBarFooter = () => {
  return (
    <Box
      p={2}
      m={2}
      bgcolor="background.dark"
    >
      <Typography
        align="center"
        gutterBottom
        variant="h4"
      >
        Need more?
      </Typography>
      <Typography
        align="center"
        variant="body2"
      >
        Upgrade to PRO version and access 20 more screens
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        mt={2}
      >
        <Button
          color="primary"
          component="a"
          href="https://react-material-kit.devias.io"
          variant="contained"
        >
          See PRO version
        </Button>
      </Box>
    </Box>
  );
};

export default NavBarFooter;

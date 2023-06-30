import { Box, Typography, Divider, Stack } from "@mui/material";
import React from "react";
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
const Footer = () => {
  return (
    <Box sx={{backgroundColor: '#449B44',position:'relative',bottom:'0px'}}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem",width:'90%',margin:'0 auto' }} >
          <Typography
            variant="h5"
            sx={{
              mt: { xs: '1.5rem' }, letterSpacing: 1.5,
              fontSize: { xs: '1rem', sm: '1rem', md: '1.5rem' }, fontWeight: '400'
            }}
          >
            Contact us
          </Typography>
          <Box sx={{ display: 'flex', gap: '2rem' }}>
            <Typography
              variant="body1"
              sx={{
                letterSpacing: 2,
                fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1rem' }
              }}
            ><PhoneForwardedIcon />(+268) 2406 4050</Typography>
              
              <Typography
              variant="body1"
              sx={{
                letterSpacing: 2,
                fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1rem' }
              }}
            ><PhoneForwardedIcon />(+268) 2406 4000</Typography>
          </Box>

        </Box>
      <Divider sx={{ backgroundColor: "#449B44", mt: { xs: '1rem',} }} />
      <Stack sx={{ textAlign: "center", mt: { xs: "1rem",} }}>
        <Typography sx={{
          fontSize: { xs: '0.7rem', sm: '1rem', md: '1.1rem' }
        }}>
          2023 © Powered by Computronics Systems
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;

import { Box, Typography, Divider, Stack } from "@mui/material";
import React from "react";
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import BusinessIcon from '@mui/icons-material/Business';
import Link from "next/link";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#449B44', position: 'relative', bottom: '0px' }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", width: '90%', margin: '0 auto' }} >
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            mt: { xs: '1.5rem' }, letterSpacing: 1.5,
            fontSize: { xs: '1rem', sm: '1rem', md: '1.5rem' }, fontWeight: '400'
          }}
        >
          Contact us
        </Typography>
        <Box sx={{ display: 'flex', gap: '2rem' }}>
          <Stack direction="row" spacing={1.5}>
            <PhoneForwardedIcon sx={{ color: 'white' }} />
            <Typography
              variant="body1"
              sx={{
                letterSpacing: 2,
                fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1rem', color: 'white' }
              }}
            >+268 2404 6960/7893</Typography></Stack>
          <Stack direction="row" spacing={1.5}>
            <MarkunreadIcon sx={{ color: 'white' }} />
            <Typography
              variant="body1"
              sx={{
                letterSpacing: 2,
                fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1rem', color: 'white' }
              }}
            >systems@eea.org.sz</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5}>
            <BusinessIcon sx={{ color: 'white' }} />
            <Typography
              variant="body1"
              sx={{
                letterSpacing: 2,
                fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1rem', color: 'white' }
              }}
            >RHUS Office Park, Karl Grant Street</Typography></Stack>
        </Box>

      </Box>
      <Divider sx={{ backgroundColor: "#449B44", mt: { xs: '1rem', } }} />
      <Stack sx={{ textAlign: "center", mt: { xs: "1rem", } }}>
        <Link href="https://computronics.sz/" target="_blank"> <Typography sx={{
          color: 'white',
          fontSize: { xs: '0.7rem', sm: '1rem', md: '1.1rem' }
        }}>
          2023 © Powered by Computronics Systems
        </Typography></Link>
      </Stack>
    </Box>
  );
};

export default Footer;

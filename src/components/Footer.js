import { Box, Typography, Divider, Stack } from "@mui/material";
import React from "react";
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
const Footer = () => {
  return (
    <Box
      // className="footer self-end dark:bg-white bg-zinc-900 px-4 py-2 border-t-2"
      sx={{
        backgroundColor: "#449B44",
         position: 'relative', width: '100%',
         bottom: '0',
        left:'0',
        right:'0',
        px: { xs: "1rem", sm: "3rem", md: "5rem", lg: '5rem', xl: '8rem' },
        pb: { xs: "1rem" },
        color: "black",
        zIndex:'9999',
        // mt:'3 rem'
        // minHeight: 'calc(100% - 95px)'
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: { xs: "0.8rem", sm: "1rem", md: "1rem" },
          flexDirection: { xs: "column", sm: "row", md: "row" },
          gap: { xs: "0.2rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
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
      </Box>

      <Divider sx={{ backgroundColor: "white", mt: { xs: '1rem',} }} />
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

import { Box, Container, CssBaseline, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

const MainPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Box component="header">
        <Header />
      </Box>
      <Box
        component="main"
        sx={{
          my: "1rem",
        }}
      >
        <Outlet />
      </Box>
      
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="textSecondary">
                We are a modern company focused on delivering the best user experience.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: info@modernapp.com
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Phone: +123 456 7890
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton color="primary" href="https://facebook.com/alisonsandrade">                  
                  <Facebook />
                </IconButton>
                <IconButton color="primary" href="#">
                  <Twitter />
                </IconButton>
                <IconButton color="default" href="https://instagram.com/alisonsandrade">
                  <Instagram />
                </IconButton>
                <IconButton color="secondary" href="https://linkedin.com/alisonsandrade">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              &copy; {new Date().getFullYear()} My Modern App. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
      
    </Box>
  );
};

export default MainPage;
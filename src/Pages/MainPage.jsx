import { Box, Container, CssBaseline, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

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
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Footer - Todos os Direitos Reservados
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainPage;

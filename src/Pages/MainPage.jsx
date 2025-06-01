import { Box, Container, CssBaseline, Grid, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import Header from "./Header";
import { Facebook, GitHub, Instagram, LinkedIn } from "@mui/icons-material";

const MainPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <CssBaseline />
      <Box component="header">
        <Header />
      </Box>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          my: "1rem",
          flexGrow: 1,
        }}
      >
        <Outlet />
      </Container>
      
      <Box
        component="footer"
        sx={{
          py: 4,
          px: 2,
          mt: 'auto',
          backgroundColor: theme.palette.grey[100],
          boxShadow: theme.shadows[6],
          borderTop: `1px solid ${theme.palette.divider}`
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom>
                Sobre
              </Typography>
              <Typography variant="body2" color="text.secondary">
                O <b>SISCA - Câmara Aberta React</b> é um sistema web desenvolvido em JavaScript que visa democratizar o acesso à informação, oferecendo uma interface pública e gratuita para explorar os dados da API de Dados Abertos da Câmara. Nosso objetivo é promover a transparência e a acessibilidade das informações legislativas para todos os cidadãos.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom>
                Contatos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                E-mail: <a href="mailto:alison.sandrade@hotmail.com">alison.sandrade@hotmail.com</a>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                GitHub do Projeto: <a href="https://github.com/alisonsandrade/camara-aberta-react" target="_blank" rel="noopener noreferrer">SISCA - Câmara Aberta React</a>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
                <RouterLink to="/sobre" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                  Saiba mais sobre o projeto
                </RouterLink>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom>
                Redes Sociais
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <IconButton color="primary" href="https://facebook.com/alisonsandrade" target="_blank" rel="noopener noreferrer">                  
                  <Facebook />
                </IconButton>
                <IconButton color="primary" href="https://github.com/alisonsandrade/" target="_blank" rel="noopener noreferrer">
                  <GitHub />
                </IconButton>
                <IconButton color="primary" href="https://www.instagram.com/alison.andrade.juristec" target="_blank" rel="noopener noreferrer">
                  <Instagram />
                </IconButton>
                <IconButton color="primary" href="https://www.linkedin.com/in/alisonsandrade/" target="_blank" rel="noopener noreferrer">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              &copy; {new Date().getFullYear()} SISCA - Sistema Câmara Aberta.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainPage;
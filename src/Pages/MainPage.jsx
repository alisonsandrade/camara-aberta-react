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
          <Grid container spacing={2}>
            <Grid size={{ xs:12, md:4 }}>
              <Typography variant="h6" gutterBottom>
                Sobre
              </Typography>
              <Typography variant="body2" color="textSecondary">
                O <b>SISCA - Câmara Aberta React</b> é um sistema web desenvolvido em JavaScript que visa democratizar o acesso à informação, oferecendo uma interface pública e gratuita para explorar os dados da API de Dados Abertos da Câmara. Nosso objetivo é promover a transparência e a acessibilidade das informações legislativas para todos os cidadãos.
              </Typography>
            </Grid>
            <Grid size={{ xs:12, md:4 }}>
              <Typography variant="h6" gutterBottom>
                Contatos
              </Typography>
              <Typography variant="body2" color="textSecondary">
                E-mail: <a href="mailto:seu_email@dominio.com">alison.sandrade@hotmail.com</a>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                GitHub do Projeto: <a href="https://github.com/alisonsandrade/camara-aberta-react" target="_blank" rel="noopener noreferrer">SISCA - Câmara Aberta React</a>
              </Typography>
            </Grid>
            <Grid size={{ xs:12, md:4 }}>
              <Typography variant="h6" gutterBottom>
                Redes Sociais
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
              &copy; {new Date().getFullYear()} SISCA - Sistema Câmara Aberta.
            </Typography>
          </Box>
        </Container>
      </Box>
      
    </Box>
  );
};

export default MainPage;
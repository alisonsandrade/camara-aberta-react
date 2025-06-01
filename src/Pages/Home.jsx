import { Box, Container, Grid, Typography, Button } from "@mui/material";
import React from "react";
import deputados from "../assets/deputados.jpg";
import partidosPoliticos from "../assets/partidos_politicos.jpg";
import projetoLei from "../assets/Projeto-de-Lei.jpg";
import MyCard from "../Components/MyCard";
import { Link as RouterLink } from "react-router-dom";

const cards = [
  {
    path: "/legislaturas",
    image: deputados,
    name: "Deputados",
    description:
      "Os Deputados Federais são agentes políticos que podem propor novas leis e sugerir a alteração ou revogação das já existentes, incluindo a própria Constituição. As propostas são votadas pelo Plenário – ou pelas comissões, quando for o caso.",
  },
  {
    path: "/partidos",
    image: partidosPoliticos,
    name: "Partido Político",
    description:
      "O partido político, pessoa jurídica de direito privado, destina-se a assegurar, no interesse do regime democrático, a autenticidade do sistema representativo e a defender os direitos fundamentais definidos na Constituição Federal.",
  },
  {
    path: "/proposicoes",
    image: projetoLei,
    name: "Proposição Legislativa",
    description:
      "Proposição legislativa é toda matéria submetida à deliberação da casa legislativa. Abaixo é possível obter modelos de diversos tipos de proposições tais como projetos de lei, moções, requerimentos, recursos, pareceres, entre outros.",
  },
];

const Home = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: { xs: 4, md: 8 },
            px: { xs: 2, md: 4 },
            mb: 4,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #e3f2fd 30%, #bbdefb 90%)',
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
            Bem-vindo ao SISCA - Câmara Aberta
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary" sx={{ maxWidth: 800, mb: 3 }}>
            Seu portal para a transparência legislativa. Explore dados abertos da Câmara dos Deputados de forma intuitiva e acessível.
            Promovendo o controle social e a participação cidadã.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/sobre"
            sx={{ mt: 2 }}
          >
            Saiba Mais Sobre o Projeto
          </Button>
        </Box>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
          Explore os Módulos
        </Typography>

        <Box sx={{ flexGrow: 1, my: "1rem" }}>
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid key={index} size={{ xs: 12, md: 6, lg:4 }} >
                <MyCard
                  path={card.path}
                  image={card.image}
                  name={card.name}
                  description={card.description}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
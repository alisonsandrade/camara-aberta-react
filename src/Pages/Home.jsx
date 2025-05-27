import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import deputados from "../assets/deputados.jpg";
import partidosPoliticos from "../assets/partidos_politicos.jpg";
import projetoLei from "../assets/Projeto-de-Lei.jpg";
import MyCard from "../Components/MyCard";

const cards = [
  {
    path: "/deputados",
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
    path: "proposicoes",
    image: projetoLei,
    name: "Proposição Legislativa",
    description:
      "Proposição legislativa é toda matéria submetida à deliberação da casa legislativa. Abaixo é possível obter modelos de diversos tipos de proposições tais como projetos de lei, moções, requerimentos, recursos, pareceres, entre outros.",
  },
];

const Home = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h5" component="div">
          Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1, my: "1rem" }}>
          <Grid container spacing={2}>
            {cards.map((card, index) => (
              <Grid key={index} size={{xs:12, md: 6, lg:4}}>
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

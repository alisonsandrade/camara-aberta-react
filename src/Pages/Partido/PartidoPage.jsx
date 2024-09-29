import { Container, Typography } from "@mui/material";
import React from "react";
import PartidoList from "./PartidoList";

const PartidoPage = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" component="div">
        Partidos Políticos
      </Typography>
      <Typography variant="subtitle" component="div" sx={{ mb: "1rem" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, suscipit?
        Corporis sapiente possimus, quis ad doloribus culpa reiciendis eius rem,
        deleniti perspiciatis nisi a porro ut aliquam cumque tempora
        exercitationem.
          Partidos Políticos. Página de teste.
      </Typography>
      <PartidoList />
    </Container>
  );
};

export default PartidoPage;

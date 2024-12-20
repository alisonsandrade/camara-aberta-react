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
        O partido político, pessoa jurídica de direito privado, destina-se a
        assegurar, no interesse do regime democrático, a autenticidade do
        sistema representativo e a defender os direitos fundamentais definidos
        na Constituição Federal.
      </Typography>
      <PartidoList />
    </Container>
  );
};

export default PartidoPage;

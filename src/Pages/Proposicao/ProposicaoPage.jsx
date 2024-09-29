import { Container, Typography } from "@mui/material";
import React from "react";
import ProposicaoList from "./ProposicaoList";

function ProposicaoPage() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" component="div">
        Proposições Legislativas
      </Typography>
      <Typography variant="subtitle" component="div" sx={{ mb: "1rem" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, suscipit?
        Corporis sapiente possimus, quis ad doloribus culpa reiciendis eius rem,
        deleniti perspiciatis nisi a porro ut aliquam cumque tempora
        exercitationem.
      </Typography>
      <ProposicaoList />
    </Container>
  );
}

export default ProposicaoPage;

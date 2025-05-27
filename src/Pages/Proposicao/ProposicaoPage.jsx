import { Container, Typography } from "@mui/material";
import React from "react";
import ProposicaoList from "./ProposicaoList";

function ProposicaoPage() {
  return (
    <Container maxWidth="xl">
      <ProposicaoList />
    </Container>
  );
}

export default ProposicaoPage;

import { Box, Chip, Divider, Grid } from "@mui/material";
import React from "react";
import { PARTIDOS_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";
import Membros from "./Membros";

function PartidoDetails({ panelId }) {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    (async () => {
      await request(`${PARTIDOS_URL_API}/${panelId}`);
    })();
  }, [request]);

  if (error) return <Error error={error.message} />;
  if (loading) return <MyLinearProgress />;
  if (data)
    return (
      <Box component="div" sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={3}>
            <img src={data.dados.urlLogo} alt={data.dados.nome} width="72" />
          </Grid>
          <Grid item xs="auto">
            <div>Número Eleitoral: {data.dados.numeroEleitoral}</div>
            <div>Site: {data.dados.urlWebSite}</div>
            <div>Facebook: {data.dados.urlFacebook}</div>
          </Grid>
        </Grid>

        <Divider>
          <Chip label="Lider" size="small" />
        </Divider>

        <Grid container spacing={2} sx={{ m: 2 }}>
          <Grid item xs="auto">
            <img
              src={data.dados.status.lider.urlFoto}
              alt={data.dados.status.lider.nome}
              width="170"
              height="200"
            />
          </Grid>
          <Grid item xs>
            <div>{data.dados.status.lider.nome}</div>
            <div>Estado: {data.dados.status.lider.uf}</div>
            <div>Legislatura: {data.dados.status.lider.idLegislatura}</div>
          </Grid>
        </Grid>

        <Divider>
          <Chip label="Membros" size="small" />
        </Divider>

        <Membros partidoId={data.dados.id} />
      </Box>
    );
}

export default PartidoDetails;

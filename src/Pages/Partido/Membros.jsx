import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { PARTIDOS_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";

function Membros({ partidoId }) {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    (async () => {
      await request(`${PARTIDOS_URL_API}/${partidoId}/membros`);
    })();
  }, [request]);

  if (error) return <Error error={error.message} />;
  if (loading) return <MyLinearProgress />;
  if (data)
    return (
      <>
        {data.dados.map((membro) => (
          <Grid key={membro.id} container spacing={2} sx={{ m: 2 }}>
            <Grid item xs="auto">
              <img
                src={membro.urlFoto}
                alt={membro.nome}
                width="130"
                height="160"
              />
            </Grid>
            <Grid item xs>
              <div>{membro.nome}</div>
              <div>Estado: {membro.siglaUf}</div>
              <div>E-mail: {membro.email}</div>
            </Grid>
          </Grid>
        ))}
      </>
    );
}

export default Membros;

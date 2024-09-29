import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { ROOT_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";
import PartidoListItem from "./PartidoListItem";

export default function PartidoList() {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const url = ROOT_URL_API + "/partidos";
    async function getData() {
      await request(url);
    }

    getData();
  }, []);

  if (error) return <Error message={error} />;
  if (loading) return <MyLinearProgress />;
  if (data)
    return (
      <>
        <Typography component="div">Filtro:</Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            my: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Nome" variant="outlined" />
        </Box>

        <Button variant="contained">Pesquisar</Button>

        <Box component="div" sx={{ my: 2 }}>
          {data.dados.map((partido) => (
            <PartidoListItem
              key={partido.id}
              partidoId={partido.id}
              nome={partido.nome}
              sigla={partido.sigla}
            />
          ))}
        </Box>
        <span>Total: {data.dados.length}</span>
      </>
    );
}

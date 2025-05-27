import { Typography, Box, TextField } from "@mui/material";
import * as React from "react";
import { ROOT_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";
import PartidoListItem from "./PartidoListItem";

export default function PartidoList() {
  const { data, error, loading, request } = useFetch();
  const [filtro, setFiltro] = React.useState("");

  React.useEffect(() => {
    const url = ROOT_URL_API + "/partidos";
    async function getData() {
      await request(url);
    }

    getData();
  }, []);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value.toLowerCase());
  };

  if (error) return <Error message={error} />;
  if (loading) return <MyLinearProgress />;

  if (data) {
    const partidosFiltrados = data.dados.filter((partido) =>
      partido.nome.toLowerCase().includes(filtro)
    );

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
          <TextField
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            value={filtro}
            onChange={handleFiltroChange}
          />
        </Box>

        <Box component="div" sx={{ my: 2 }}>
          {partidosFiltrados.map((partido) => (
            <PartidoListItem
              key={partido.id}
              partidoId={partido.id}
              nome={partido.nome}
              sigla={partido.sigla}
            />
          ))}
        </Box>
        <span>Total: {partidosFiltrados.length}</span>
      </>
    );
  }

  return null;
}

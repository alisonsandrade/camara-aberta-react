import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ROOT_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";

function ProposicaoList() {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const url = ROOT_URL_API + "/referencias/proposicoes/codTema";

    async function getData() {
      await request(url);
    }

    getData();
  }, [request]);

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
          <TextField id="outlined-basic" label="Tema" variant="outlined" />
        </Box>

        <Button variant="contained">Pesquisar</Button>

        <Box component="div" sx={{ my: 2 }}>
          <ul>
            {data.dados.map((tema) => (
              <li key={tema.cod}>
                <Link to={`/proposicoes/temas/${tema.cod}?tema=${tema.nome}`}>
                  {tema.nome}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
        <span>Total: {data.dados.length}</span>
      </>
    );
}

export default ProposicaoList;

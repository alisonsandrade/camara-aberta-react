import { Container, Typography } from "@mui/material";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { PROPOSICOES_URL_API } from "../../Api";
import MyLinearProgress from "../../Components/MyLinearProgress";
import MyPagination from "../../Components/MyPagination";
import useFetch from "../../Hooks/useFetch";

function TemaPage() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { data, error, loading, request } = useFetch();

  function getCurrentPage() {
    const currentPage = searchParams.get("pagina");
    if (isNaN(currentPage) || !currentPage) return 1;
    return parseInt(currentPage);
  }

  function getLastPage(array) {
    const link = array.find((link) => link.rel === "last");
    if (link) return parseInt(new URLSearchParams(link.href).get("pagina"));
    return 1;
  }

  React.useEffect(() => {
    async function handlePagination(page) {
      const url = `${PROPOSICOES_URL_API}/?codTema=${params.codTema}&ordem=ASC&ordenarPor=id&pagina=${page}&itens=15`;
      await request(url);
    }
    handlePagination(getCurrentPage());
  }, [searchParams]);

  React.useEffect(() => {
    async function getProposicoes() {
      const url = `${PROPOSICOES_URL_API}?codTema=${params.codTema}&pagina=2&itens=15`;
      await request(url);
    }
    getProposicoes();
  }, [request]);

  if (error) return <Error message={error} />;
  if (loading) return <MyLinearProgress />;
  if (data)
    return (
      <Container maxWidth="xl">
        <Typography variant="h5" component="div">
          Tema: {searchParams.get("tema")}
        </Typography>
        <ul>
          {data.dados.map((proposicao) => (
            <li key={proposicao.id}>
              <div>ID: {proposicao.id}</div>
              <div>Tipo: {proposicao.siglaTipo}</div>
              <div>codTipo: {proposicao.codTipo}</div>
              <div>Número: {proposicao.numero}</div>
              <div>Ano: {proposicao.ano}</div>
              <div>Ementa: {proposicao.ementa}</div>
            </li>
          ))}
        </ul>
        <span>
          <b>Total: {data.dados.length}</b>
        </span>

        <MyPagination
          currentPage={getCurrentPage()}
          lastPage={getLastPage(data.links)}
          url={`/proposicoes/temas/${params.codTema}`}
        />
      </Container>
    );
}

export default TemaPage;

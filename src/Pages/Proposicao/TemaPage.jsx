import {   
  Container, 
  Typography, 
  Button,
  Card, 
  CardContent, 
  CardActions,
  Divider, 
  Box, 
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { PROPOSICOES_URL_API } from "../../Api";
import MyLinearProgress from "../../Components/MyLinearProgress";
import MyPagination from "../../Components/MyPagination";
import useFetch from "../../Hooks/useFetch";

function TemaPage() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { data, error, loading, request } = useFetch();
  const [temaNome, setTemaNome] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Obtém a página atual dos parâmetros de URL
  function getCurrentPage() {
    const currentPage = searchParams.get("pagina");
    if (isNaN(currentPage) || !currentPage) return 1;
    return parseInt(currentPage);
  }

  // Obtém a última página disponível
  function getLastPage(array) {
    const link = array.find((link) => link.rel === "last");
    if (link) return parseInt(new URLSearchParams(link.href).get("pagina"));
    return 1;
  }

  // Carrega os dados quando a página muda
  useEffect(() => {
    async function fetchData() {
      const currentPage = getCurrentPage();
      const url = `${PROPOSICOES_URL_API}?codTema=${params.codTema}&ordem=ASC&ordenarPor=id&pagina=${currentPage}&itens=15`;
      await request(url);
      // Armazena o nome do tema se disponível
      const tema = searchParams.get("tema");
      if (tema) setTemaNome(tema);
    }
    
    fetchData();
  }, [searchParams, params.codTema, request]);

  // Componente para exibir mensagem de erro
  const Error = ({ message }) => (
    <Container maxWidth="xl">
      <Typography variant="h5" color="error" sx={{ mt: 4, textAlign: "center" }}>
        Erro ao carregar dados: {message}
      </Typography>
    </Container>
  );

  // Renderiza o componente conforme o estado
  if (error) return <Error message={error} />;
  if (loading) return <MyLinearProgress />;
  if (!data) return <CircularProgress sx={{ display: "block", margin: "0 auto", mt: 4 }} />;

  // Filtra as proposições com base na consulta de pesquisa
  const filteredProposicoes = data.dados.filter((proposicao) =>
    proposicao.ementa.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proposicao.numero.toString().includes(searchQuery) ||
    `${proposicao.numero}/${proposicao.ano}`.includes(searchQuery)
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tema: {temaNome || `#${params.codTema}`}
      </Typography>

      {/* Componente de busca automática */}
      <Box sx={{ my: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar proposições..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredProposicoes.map((proposicao) => (
        <Card key={proposicao.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {proposicao.siglaTipo} {proposicao.numero}/{proposicao.ano}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary" paragraph>
              {proposicao.ementa}
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <Typography variant="body2">
                <b>Tipo:</b> {proposicao.siglaTipo} (código: {proposicao.codTipo})
              </Typography>
              <Typography variant="body2">
                <b>Número:</b> {proposicao.numero}
              </Typography>
              <Typography variant="body2">
                <b>Ano:</b> {proposicao.ano}
              </Typography>
            </Box>            
          </CardContent>
          <CardActions>
            <Button size="small" href={`/proposicoes/detalhes/${proposicao.id}?redirecionar=${encodeURIComponent(window.location.href)}`}>Detalhar</Button>
          </CardActions>
        </Card>
      ))}

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <MyPagination
          currentPage={getCurrentPage()}
          lastPage={getLastPage(data.links)}
          url={`/proposicoes/temas/${params.codTema}`}
        />
      </Box>
    </Container>
  );
}

export default TemaPage;

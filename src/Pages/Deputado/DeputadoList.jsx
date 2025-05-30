import {
  Typography,
  Box,
  TextField,
  Container,
  Paper,
  Card,
  CardContent,
  InputAdornment,
  Chip,
  Divider,
  useTheme,
  alpha,
  Grid,
  ListItem,
  ListItemText,
  Pagination
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ROOT_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";
import SearchIcon from '@mui/icons-material/Search';
import DeputadoCard from "./DeputadoCard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function DeputadoList({ idLegislatura: propIdLegislatura }) {
  const { idLegislatura: paramIdLegislatura } = useParams();
  const actualIdLegislatura = propIdLegislatura || paramIdLegislatura;

  const { data: deputadosData, error: deputadosError, loading: deputadosLoading, request: requestDeputados } = useFetch();
  const { data: legislaturaData, error: legislaturaError, loading: legislaturaLoading, request: requestLegislatura } = useFetch(); // Novo useFetch para a legislatura

  const [searchTerm, setSearchTerm] = useState("");
  const [deputadosUnicos, setDeputadosUnicos] = useState([]);
  const [filteredDeputados, setFilteredDeputados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const theme = useTheme();

  const formatDate = (dateString) => {
    if (!dateString) return "Não disponível";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  useEffect(() => {
    if (actualIdLegislatura) {
      const legislaturaUrl = `${ROOT_URL_API}/legislaturas/${actualIdLegislatura}`;
      requestLegislatura(legislaturaUrl);
    }
  }, [requestLegislatura, actualIdLegislatura]);

  useEffect(() => {
    let url = ROOT_URL_API + "/deputados";
    if (actualIdLegislatura) {
      url += `?idLegislatura=${actualIdLegislatura}`;
    }
    url += `${actualIdLegislatura ? '&' : '?'}ordem=ASC&ordenarPor=nome`;

    requestDeputados(url);
  }, [requestDeputados, actualIdLegislatura]);

  useEffect(() => {
    if (deputadosData && deputadosData.dados) {
      const uniqueDeputadosMap = new Map();
      deputadosData.dados.forEach(deputado => {
        if (deputado.id && !uniqueDeputadosMap.has(deputado.id)) { // Garantir que ID existe
          uniqueDeputadosMap.set(deputado.id, deputado);
        }
      });
      const uniqueDeputadosArray = Array.from(uniqueDeputadosMap.values());
      setDeputadosUnicos(uniqueDeputadosArray);

      const filtered = uniqueDeputadosArray.filter(deputado => {
        const nome = deputado.nome ? deputado.nome.toLowerCase() : '';
        const siglaPartido = deputado.siglaPartido ? deputado.siglaPartido.toLowerCase() : '';
        const siglaUf = deputado.siglaUf ? deputado.siglaUf.toLowerCase() : '';
        const lowerSearchTerm = searchTerm.toLowerCase();

        return (
          nome.includes(lowerSearchTerm) ||
          siglaPartido.includes(lowerSearchTerm) ||
          siglaUf.includes(lowerSearchTerm)
        );
      });
      setFilteredDeputados(filtered);
      setCurrentPage(1);
    } else if (deputadosData && !deputadosData.dados) {
      setDeputadosUnicos([]);
      setFilteredDeputados([]);
      setCurrentPage(1);
    }
  }, [deputadosData, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDeputados = filteredDeputados.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredDeputados.length / itemsPerPage);

  if (deputadosLoading || legislaturaLoading) return <MyLinearProgress />;
  if (deputadosError) return <Error message={`Erro ao carregar deputados: ${deputadosError.message || deputadosError}`} />;
  if (legislaturaError && actualIdLegislatura) return <Error message={`Erro ao carregar dados da legislatura ${actualIdLegislatura}: ${legislaturaError.message || legislaturaError}`} />;


  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'medium' }}>
          {actualIdLegislatura ? (
            `Deputados da Legislatura ${actualIdLegislatura}`
          ) : (
            `Todos os Deputados Federais`
          )}
        </Typography>
        {legislaturaData && legislaturaData.dados && actualIdLegislatura && (
          <Typography variant="body1" color="text.secondary" paragraph>
            {`Período: ${formatDate(legislaturaData.dados.dataInicio)} - ${formatDate(legislaturaData.dados.dataFim)}`}
          </Typography>
        )}
        {!actualIdLegislatura && (
            <Typography variant="body1" color="text.secondary" paragraph>
                Explore a lista completa de deputados federais e seus detalhes.
            </Typography>
        )}
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="search-deputado"
                label="Buscar por deputado, partido ou UF"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Digite para filtrar os deputados"
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center' }}>
            <Typography variant="h6" component="h2">
              Deputados Encontrados
            </Typography>
            <Chip
              label={`Total: ${filteredDeputados.length}`}
              color="primary"
              variant="outlined"
              size="small"
            />
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            {paginatedDeputados.length > 0 ? (
              paginatedDeputados.map((deputado) => (
                <DeputadoCard
                  key={deputado.id}
                  id={deputado.id}
                  nome={deputado.nome}
                  siglaPartido={deputado.siglaPartido}
                  siglaUf={deputado.siglaUf}
                  urlFoto={deputado.urlFoto}
                  email={deputado.email}
                  uri={deputado.uri}
                  idLegislatura={deputado.idLegislatura}
                />
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary={
                    deputadosData?.dados && deputadosData.dados.length === 0
                      ? `Nenhum deputado encontrado para a Legislatura ${actualIdLegislatura || ''}.`
                      : "Nenhum deputado encontrado com os critérios de busca."
                  }
                  primaryTypographyProps={{ textAlign: 'center', color: 'text.secondary' }}
                />
              </ListItem>
            )}
          </Box>
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
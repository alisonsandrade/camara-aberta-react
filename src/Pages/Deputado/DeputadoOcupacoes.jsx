import React, { useEffect, useState, useMemo } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  alpha,
  Paper,
  TextField,
  InputAdornment,
  Pagination
} from "@mui/material";
import MyLinearProgress from "../../Components/MyLinearProgress";
import Error from "../../Components/Error";
import useFetch from "../../Hooks/useFetch";
import { ROOT_URL_API } from "../../Api";
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import EventIcon from '@mui/icons-material/Event';

export default function DeputadoOcupacoes({ idDeputado }) {
  const { data, error, loading, request } = useFetch();
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (idDeputado) {
      const url = `${ROOT_URL_API}/deputados/${idDeputado}/ocupacoes`;
      request(url);
    }
  }, [request, idDeputado]);

  const ocupacoes = useMemo(() => {
    return data?.dados || [];
  }, [data]);

  const filteredOcupacoes = useMemo(() => {
    if (!searchTerm) {
      return ocupacoes;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return ocupacoes.filter(
      (ocupacao) =>
        ocupacao.titulo?.toLowerCase().includes(lowercasedFilter) ||
        ocupacao.entidade?.toLowerCase().includes(lowercasedFilter) ||
        ocupacao.entidadeUF?.toLowerCase().includes(lowercasedFilter) ||
        ocupacao.entidadePais?.toLowerCase().includes(lowercasedFilter) ||
        ocupacao.anoInicio?.toString().includes(lowercasedFilter) ||
        ocupacao.anoFim?.toString().includes(lowercasedFilter)
    );
  }, [ocupacoes, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredOcupacoes.length / itemsPerPage);
  const paginatedOcupacoes = filteredOcupacoes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) return <MyLinearProgress />;
  if (error) return <Error message={`Erro ao carregar ocupações: ${error.message || error}`} />;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
          Ocupações Profissionais
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Filtrar Ocupações (Título, Entidade, UF, País ou Ano)"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <List>
          {paginatedOcupacoes.length > 0 ? (
            paginatedOcupacoes.map((ocupacao, index) => (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    py: 1.5,
                    px: 0,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.action.hover, 0.05),
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {ocupacao.titulo || 'Título não especificado'}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <WorkIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {`Entidade: ${ocupacao.entidade || 'Não informada'}`}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <LocationOnIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {`Local: ${ocupacao.entidadeUF || 'N/A'}`}
                            {ocupacao.entidadePais && ocupacao.entidadePais !== 'BRASIL' && ` - ${ocupacao.entidadePais}`}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <EventIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {`Período: ${ocupacao.anoInicio || 'N/A'} - ${ocupacao.anoFim || 'Atual'}`}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < paginatedOcupacoes.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: alpha(theme.palette.grey[100], 0.5) }}>
              <Typography variant="body1" color="text.secondary">
                Nenhuma ocupação profissional encontrada para este deputado com o filtro atual.
              </Typography>
            </Paper>
          )}
        </List>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, pb: 1 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
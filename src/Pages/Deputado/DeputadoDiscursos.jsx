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
  Link as MuiLink,
  TextField,
  InputAdornment,
  Pagination
} from "@mui/material";
import MyLinearProgress from "../../Components/MyLinearProgress";
import Error from "../../Components/Error";
import useFetch from "../../Hooks/useFetch";
import { ROOT_URL_API } from "../../Api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SearchIcon from '@mui/icons-material/Search';

export default function DeputadoDiscursos({ idDeputado, idLegislatura }) {
  const { data, error, loading, request } = useFetch();
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (idDeputado) {
      const url = `${ROOT_URL_API}/deputados/${idDeputado}/discursos?idLegislatura=${idLegislatura}&pagina=${currentPage}&itens=${itemsPerPage}`;
      request(url);
    }
  }, [request, idDeputado]);

  const discursos = useMemo(() => {    
    return data?.dados || [];
  }, [data]);

  const filteredDiscursos = useMemo(() => {
    if (!searchTerm) {
      return discursos;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return discursos.filter(
      (discurso) =>
        discurso.tipoEvento?.toLowerCase().includes(lowercasedFilter) ||
        discurso.faseEvento?.toLowerCase().includes(lowercasedFilter) ||
        discurso.sumario?.toLowerCase().includes(lowercasedFilter)
    );
  }, [discursos, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredDiscursos.length / itemsPerPage);
  const paginatedDiscursos = filteredDiscursos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Não disponível";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });
  };

  if (loading) return <MyLinearProgress />;
  if (error) return <Error message={`Erro ao carregar discursos: ${error.message || error}`} />;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
          Discursos Parlamentares
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Filtrar Discursos (Tipo de Evento, Fase ou Sumário)"
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
          {paginatedDiscursos.length > 0 ? (
            paginatedDiscursos.map((discurso, index) => (
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
                        {discurso.tipoEvento || 'Evento não especificado'}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          {`Fase: ${discurso.faseEvento?.titulo || 'Não disponível'}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`Início: ${formatDate(discurso.dataHoraInicio)}`}
                        </Typography>
                        {discurso.dataHoraFim && (
                            <Typography variant="body2" color="text.secondary">
                                {`Fim: ${formatDate(discurso.dataHoraFim)}`}
                            </Typography>
                        )}
                        {discurso.sumario && (
                          <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                            {discurso.sumario.length > 200 ? `${discurso.sumario.substring(0, 200)}...` : discurso.sumario}
                          </Typography>
                        )}
                        <Box sx={{ mt: 1 }}>
                          {discurso.urlAudio && (
                            <MuiLink href={discurso.urlAudio} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ mr: 2 }}>
                              Ouvir Áudio
                            </MuiLink>
                          )}
                          {discurso.urlVideo && (
                            <MuiLink href={discurso.urlVideo} target="_blank" rel="noopener noreferrer" underline="hover">
                              Ver Vídeo
                            </MuiLink>
                          )}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < paginatedDiscursos.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: alpha(theme.palette.grey[100], 0.5) }}>
              <Typography variant="body1" color="text.secondary">
                Nenhum discurso encontrado para este deputado com o filtro atual.
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
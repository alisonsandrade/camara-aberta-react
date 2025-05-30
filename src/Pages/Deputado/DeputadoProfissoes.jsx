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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function DeputadoProfissoes({ idDeputado }) {
  const { data, error, loading, request } = useFetch();
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (idDeputado) {
      const url = `${ROOT_URL_API}/deputados/${idDeputado}/profissoes`;
      request(url);
    }
  }, [request, idDeputado]);

  const profissoes = useMemo(() => {
    return data?.dados || [];
  }, [data]);

  const filteredProfissoes = useMemo(() => {
    if (!searchTerm) {
      return profissoes;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return profissoes.filter(
      (profissao) =>
        profissao.titulo?.toLowerCase().includes(lowercasedFilter)
    );
  }, [profissoes, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredProfissoes.length / itemsPerPage);
  const paginatedProfissoes = filteredProfissoes.slice(
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
  if (error) return <Error message={`Erro ao carregar profissões: ${error.message || error}`} />;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
          Profissões Declaradas
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Filtrar Profissões (Título)"
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
          {paginatedProfissoes.length > 0 ? (
            paginatedProfissoes.map((profissao, index) => (
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
                        {profissao.titulo || 'Profissão não especificada'}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {`Data de Registro: ${formatDate(profissao.dataHora)}`}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < paginatedProfissoes.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: alpha(theme.palette.grey[100], 0.5) }}>
              <Typography variant="body1" color="text.secondary">
                Nenhuma profissão encontrada para este deputado com o filtro atual.
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
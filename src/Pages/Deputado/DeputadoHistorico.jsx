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
  Pagination,
  Chip
} from "@mui/material";
import MyLinearProgress from "../../Components/MyLinearProgress";
import Error from "../../Components/Error";
import useFetch from "../../Hooks/useFetch";
import { ROOT_URL_API } from "../../Api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import HowToVoteIcon from '@mui/icons-material/HowToVote'; 
import InfoIcon from '@mui/icons-material/Info';

export default function DeputadoHistorico({ idDeputado }) {
  const { data, error, loading, request } = useFetch();
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (idDeputado) {
      const url = `${ROOT_URL_API}/deputados/${idDeputado}/historico`;
      request(url);
    }
  }, [request, idDeputado]);

  const historico = useMemo(() => {
    return data?.dados || [];
  }, [data]);

  const filteredHistorico = useMemo(() => {
    if (!searchTerm) {
      return historico;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return historico.filter(
      (item) =>
        item.situacao?.toLowerCase().includes(lowercasedFilter) ||
        item.condicaoEleitoral?.toLowerCase().includes(lowercasedFilter) ||
        item.siglaPartido?.toLowerCase().includes(lowercasedFilter) ||
        item.siglaUf?.toLowerCase().includes(lowercasedFilter) ||
        item.descricaoStatus?.toLowerCase().includes(lowercasedFilter) ||
        item.idLegislatura?.toString().includes(lowercasedFilter)
    );
  }, [historico, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredHistorico.length / itemsPerPage);
  const paginatedHistorico = filteredHistorico.slice(
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

  const getSituationChipColor = (situacao) => {
    switch (situacao) {
      case 'Exercício':
        return 'success';
      case 'Licenciado':
        return 'warning';
      case 'Suplente':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) return <MyLinearProgress />;
  if (error) return <Error message={`Erro ao carregar histórico: ${error.message || error}`} />;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
          Histórico Parlamentar
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Filtrar Histórico (Situação, Partido, UF, Condição Eleitoral ou Descrição)"
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
          {paginatedHistorico.length > 0 ? (
            paginatedHistorico.map((item, index) => (
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
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                          {`Legislatura: ${item.idLegislatura || 'N/A'}`}
                        </Typography>
                        {item.situacao && (
                          <Chip
                            label={item.situacao}
                            size="small"
                            color={getSituationChipColor(item.situacao)}
                            sx={{ borderRadius: '4px' }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {`Data: ${formatDate(item.dataHora)}`}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <HowToVoteIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {`Condição Eleitoral: ${item.condicaoEleitoral || 'N/A'}`}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <SchoolIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {`Partido: ${item.siglaPartido || 'N/A'} - UF: ${item.siglaUf || 'N/A'}`}
                          </Typography>
                        </Box>
                        {item.descricaoStatus && (
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
                            <InfoIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary', mt: 0.2 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                              {`Status: ${item.descricaoStatus}`}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < paginatedHistorico.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: alpha(theme.palette.grey[100], 0.5) }}>
              <Typography variant="body1" color="text.secondary">
                Nenhum registro de histórico encontrado para este deputado com o filtro atual.
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
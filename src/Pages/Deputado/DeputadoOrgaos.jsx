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
import EventIcon from '@mui/icons-material/Event';

export default function DeputadoOrgaos({ idDeputado }) {
  const { data, error, loading, request } = useFetch();
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (idDeputado) {
      const url = `${ROOT_URL_API}/deputados/${idDeputado}/orgaos`;
      request(url);
    }
  }, [request, idDeputado]);

  const orgaos = useMemo(() => {
    return data?.dados || [];
  }, [data]);

  const filteredOrgaos = useMemo(() => {
    if (!searchTerm) {
      return orgaos;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return orgaos.filter(
      (orgao) =>
        orgao.nomeOrgao?.toLowerCase().includes(lowercasedFilter) ||
        orgao.siglaOrgao?.toLowerCase().includes(lowercasedFilter) ||
        orgao.titulo?.toLowerCase().includes(lowercasedFilter)
    );
  }, [orgaos, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredOrgaos.length / itemsPerPage);
  const paginatedOrgaos = filteredOrgaos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Não disponível";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  const getTitleChipColor = (titulo) => {
    switch (titulo) {
      case 'Titular':
        return 'primary';
      case 'Suplente':
        return 'info';
      case 'Presidente':
        return 'secondary';
      case 'Vice-Presidente':
        return 'secondary';
      default:
        return 'default';
    }
  };

  if (loading) return <MyLinearProgress />;
  if (error) return <Error message={`Erro ao carregar órgãos: ${error.message || error}`} />;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
          Membro de Órgãos (Comissões, etc.)
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Filtrar Órgãos (Nome, Sigla ou Título)"
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
          {paginatedOrgaos.length > 0 ? (
            paginatedOrgaos.map((orgao, index) => (
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
                          {`${orgao.nomeOrgao || 'Nome não especificado'}`}
                          {orgao.siglaOrgao && ` (${orgao.siglaOrgao})`}
                        </Typography>
                        {orgao.titulo && (
                          <Chip
                            label={orgao.titulo}
                            size="small"
                            color={getTitleChipColor(orgao.titulo)}
                            sx={{ borderRadius: '4px' }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <EventIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {`Período: ${formatDate(orgao.dataInicio)} - ${orgao.dataFim ? formatDate(orgao.dataFim) : 'Atual'}`}
                          </Typography>
                        </Box>
                        {orgao.uriOrgao && (
                          <MuiLink href={orgao.uriOrgao} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
                            Ver Detalhes do Órgão
                          </MuiLink>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < paginatedOrgaos.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: alpha(theme.palette.grey[100], 0.5) }}>
              <Typography variant="body1" color="text.secondary">
                Nenhuma filiação a órgãos encontrada para este deputado com o filtro atual.
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
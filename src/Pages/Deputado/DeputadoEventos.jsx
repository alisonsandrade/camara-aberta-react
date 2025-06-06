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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export default function DeputadoEventos({ idDeputado }) {
  const { data, error, loading, request } = useFetch();
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (idDeputado) {      
      const url = `${ROOT_URL_API}/deputados/${idDeputado}/eventos?pagina=${currentPage}&itens=${itemsPerPage}`;
      request(url);
    }
  }, [request, idDeputado]);

  const eventos = useMemo(() => {
    return data?.dados || [];
  }, [data]);

  const filteredEventos = useMemo(() => {
    if (!searchTerm) {
      return eventos;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return eventos.filter(
      (evento) =>
        evento.descricaoTipo?.toLowerCase().includes(lowercasedFilter) ||
        evento.descricao?.toLowerCase().includes(lowercasedFilter) ||
        evento.situacao?.toLowerCase().includes(lowercasedFilter) ||
        evento.localExterno?.toLowerCase().includes(lowercasedFilter) ||
        evento.localCamara?.nome?.toLowerCase().includes(lowercasedFilter) ||
        evento.orgaos?.some(orgao => orgao.nome?.toLowerCase().includes(lowercasedFilter))
    );
  }, [eventos, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredEventos.length / itemsPerPage);
  const paginatedEventos = filteredEventos.slice(
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
      case 'Encerrada':
        return 'default';
      case 'Convocada':
        return 'info';
      case 'Em Andamento':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getEventLocation = (evento) => {
    if (evento.localExterno) {
      return `Externo: ${evento.localExterno}`;
    }
    if (evento.localCamara && evento.localCamara.nome) {
      let location = `Câmara: ${evento.localCamara.nome}`;
      if (evento.localCamara.predio) location += `, Prédio: ${evento.localCamara.predio}`;
      if (evento.localCamara.sala) location += `, Sala: ${evento.localCamara.sala}`;
      if (evento.localCamara.andar) location += `, Andar: ${evento.localCamara.andar}`;
      return location;
    }
    return 'Local não informado';
  };

  const getOrganNames = (orgaos) => {
    if (!orgaos || orgaos.length === 0) return 'N/A';
    return orgaos.map(orgao => orgao.nome || orgao.sigla).join(', ');
  };


  if (loading) return <MyLinearProgress />;
  if (error) return <Error message={`Erro ao carregar eventos: ${error.message || error}`} />;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
          Eventos com Participação
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Filtrar Eventos (Tipo, Descrição, Situação, Local ou Órgão)"
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
          {paginatedEventos.length > 0 ? (
            paginatedEventos.map((evento, index) => (
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
                          {evento.descricaoTipo || 'Tipo não especificado'}
                        </Typography>
                        {evento.situacao && (
                          <Chip
                            label={evento.situacao}
                            size="small"
                            color={getSituationChipColor(evento.situacao)}
                            sx={{ borderRadius: '4px' }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        {evento.descricao && (
                          <Typography variant="body2" color="text.primary" sx={{ mb: 0.5 }}>
                            {evento.descricao}
                          </Typography>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {`Início: ${formatDate(evento.dataHoraInicio)}`}
                            {evento.dataHoraFim && ` - Fim: ${formatDate(evento.dataHoraFim)}`}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <LocationOnIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {getEventLocation(evento)}
                          </Typography>
                        </Box>
                        {evento.orgaos && evento.orgaos.length > 0 && (
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
                            <PermIdentityIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary', mt: 0.2 }} />
                            <Typography variant="body2" color="text.secondary">
                              {`Órgãos: ${getOrganNames(evento.orgaos)}`}
                            </Typography>
                          </Box>
                        )}
                        {evento.urlRegistro && (
                          <MuiLink href={evento.urlRegistro} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ display: 'block', mt: 1 }}>
                            Ver Registro do Evento
                          </MuiLink>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < paginatedEventos.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: alpha(theme.palette.grey[100], 0.5) }}>
              <Typography variant="body1" color="text.secondary">
                Nenhum evento encontrado para este deputado com o filtro atual.
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
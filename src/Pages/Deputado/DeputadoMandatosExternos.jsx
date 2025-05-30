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
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import EventIcon from '@mui/icons-material/Event';
import GavelIcon from '@mui/icons-material/Gavel';

export default function DeputadoMandatosExternos({ idDeputado }) {
  const { data, error, loading, request } = useFetch();
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (idDeputado) {
      const url = `${ROOT_URL_API}/deputados/${idDeputado}/mandatosExternos`;
      request(url);
    }
  }, [request, idDeputado]);

  const mandatos = useMemo(() => {
    return data?.dados || [];
  }, [data]);

  const filteredMandatos = useMemo(() => {
    if (!searchTerm) {
      return mandatos;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return mandatos.filter(
      (mandato) =>
        mandato.cargo?.toLowerCase().includes(lowercasedFilter) ||
        mandato.siglaUf?.toLowerCase().includes(lowercasedFilter) ||
        mandato.municipio?.toLowerCase().includes(lowercasedFilter) ||
        mandato.siglaPartidoEleicao?.toLowerCase().includes(lowercasedFilter) ||
        mandato.anoInicio?.toString().includes(lowercasedFilter) ||
        mandato.anoFim?.toString().includes(lowercasedFilter)
    );
  }, [mandatos, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredMandatos.length / itemsPerPage);
  const paginatedMandatos = filteredMandatos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) return <MyLinearProgress />;
  if (error) return <Error message={`Erro ao carregar mandatos externos: ${error.message || error}`} />;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
          Mandatos Políticos Externos
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Filtrar Mandatos (Cargo, UF, Município, Partido ou Ano)"
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
          {paginatedMandatos.length > 0 ? (
            paginatedMandatos.map((mandato, index) => (
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
                        {`${mandato.cargo || 'Não especificado'}`}
                        {mandato.siglaUf && ` - ${mandato.siglaUf}`}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        {mandato.municipio && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <LocationOnIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {`Município: ${mandato.municipio}`}
                            </Typography>
                          </Box>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <EventIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {`Período: ${mandato.anoInicio || 'N/A'} - ${mandato.anoFim || 'Atual'}`}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <GavelIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {`Partido: ${mandato.siglaPartidoEleicao || 'N/A'}`}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < paginatedMandatos.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: alpha(theme.palette.grey[100], 0.5) }}>
              <Typography variant="body1" color="text.secondary">
                Nenhum mandato político externo encontrado para este deputado com o filtro atual.
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
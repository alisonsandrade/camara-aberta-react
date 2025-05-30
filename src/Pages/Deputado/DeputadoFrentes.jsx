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
import SearchIcon from '@mui/icons-material/Search';

export default function DeputadoFrentes({ idDeputado }) {
  const { data, error, loading, request } = useFetch();
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (idDeputado) {
      const url = `${ROOT_URL_API}/deputados/${idDeputado}/frentes`;
      request(url);
    }
  }, [request, idDeputado]);

  const frentes = useMemo(() => {
    return data?.dados || [];
  }, [data]);

  const filteredFrentes = useMemo(() => {
    if (!searchTerm) {
      return frentes;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return frentes.filter(
      (frente) =>
        frente.titulo?.toLowerCase().includes(lowercasedFilter)
    );
  }, [frentes, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredFrentes.length / itemsPerPage);
  const paginatedFrentes = filteredFrentes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) return <MyLinearProgress />;
  if (error) return <Error message={`Erro ao carregar frentes: ${error.message || error}`} />;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
          Frentes Parlamentares
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Filtrar Frentes (Título)"
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
          {paginatedFrentes.length > 0 ? (
            paginatedFrentes.map((frente, index) => (
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
                        {frente.titulo || 'Título não especificado'}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          {`Legislatura: ${frente.idLegislatura || 'Não disponível'}`}
                        </Typography>
                        {frente.uri && (
                          <MuiLink href={frente.uri} target="_blank" rel="noopener" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
                            Ver Detalhes da Frente
                          </MuiLink>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < paginatedFrentes.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: alpha(theme.palette.grey[100], 0.5) }}>
              <Typography variant="body1" color="text.secondary">
                Nenhuma frente parlamentar encontrada para este deputado com o filtro atual.
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
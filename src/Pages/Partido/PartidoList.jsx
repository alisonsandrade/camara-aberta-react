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
  ListItemText
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { ROOT_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";
import PartidoCard from "./PartidoCard";
import SearchIcon from '@mui/icons-material/Search';

export default function PartidoList() {
  const { data, error, loading, request } = useFetch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPartidos, setFilteredPartidos] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const url = ROOT_URL_API + "/partidos";

    async function getData() {
      await request(url);
    }

    getData();
  }, [request]);

  useEffect(() => {
    if (data && data.dados) {
      const filtered = data.dados.filter(partido =>
        partido.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partido.sigla.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPartidos(filtered);
    }
  }, [data, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (error) return <Error message={error} />;
  if (loading) return <MyLinearProgress />;

  if (data) {
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
            Partidos Políticos
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Explore a lista de partidos políticos disponíveis e seus detalhes.
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid size={{xs: 12}}>
                <TextField
                  fullWidth
                  id="search-partido"
                  label="Buscar por partido"
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
                  placeholder="Digite para filtrar os partidos pelo nome"
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center' }}>
              <Typography variant="h6" component="h2">
                Partidos Disponíveis
              </Typography>
              <Chip
                label={`Total: ${filteredPartidos.length}`}
                color="primary"
                variant="outlined"
                size="small"
              />
            </Box>

            <Divider />

            <Box sx={{ p: 2 }}>
              {filteredPartidos.length > 0 ? (
                filteredPartidos.map((partido) => (
                  <PartidoCard
                    key={partido.id}
                    partidoId={partido.id}
                    nome={partido.nome}
                    sigla={partido.sigla}
                    uri={partido.uri}
                  />
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary="Nenhum partido encontrado"
                    primaryTypographyProps={{ textAlign: 'center', color: 'text.secondary' }}
                  />
                </ListItem>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return null;
}
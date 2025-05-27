import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  InputAdornment, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Divider,
  Chip,
  Paper,
  Grid,
  useTheme,
  alpha
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROOT_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';

function ProposicaoList() {
  const { data, error, loading, request } = useFetch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const url = ROOT_URL_API + "/referencias/proposicoes/codTema";
    
    async function getData() {
      await request(url);
    }

    getData();
  }, [request]);

  useEffect(() => {
    if (data && data.dados) {
      const filtered = data.dados.filter(tema => 
        tema.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (error) return <Error message={error} />;
  if (loading) return <MyLinearProgress />;
  if (data)
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
            Proposições por Tema
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Selecione um tema para visualizar as proposições relacionadas
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="search-tema"
                  label="Buscar por tema"
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
                  placeholder="Digite para filtrar os temas..."
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center' }}>
              <Typography variant="h6" component="h2">
                Temas Disponíveis
              </Typography>
              <Chip 
                label={`Total: ${filteredData.length}`} 
                color="primary" 
                variant="outlined" 
                size="small"
              />
            </Box>
            
            <Divider />
            
            <List sx={{ 
              '& .MuiListItem-root': { 
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                }
              }
            }}>
              {filteredData.length > 0 ? (
                filteredData.map((tema, index) => (
                  <React.Fragment key={tema.cod}>
                    <ListItem 
                      component={Link} 
                      to={`/proposicoes/temas/${tema.cod}?tema=${tema.nome}`}
                      sx={{ 
                        textDecoration: 'none', 
                        color: 'inherit',
                        py: 1.5
                      }}
                    >
                      <ListItemIcon>
                        <DescriptionIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={tema.nome} 
                        primaryTypographyProps={{ 
                          fontWeight: 'medium',
                          color: theme.palette.text.primary
                        }}
                        secondary={`Código: ${tema.cod}`}
                      />
                    </ListItem>
                    {index < filteredData.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText 
                    primary="Nenhum tema encontrado"
                    primaryTypographyProps={{ textAlign: 'center', color: 'text.secondary' }}
                  />
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      </Container>
    );
  
  return null;
}

export default ProposicaoList;
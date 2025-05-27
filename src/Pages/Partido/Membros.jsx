import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Divider,
  Chip,
  Paper,
  Grid,
  useTheme,
  alpha,
  Avatar
} from "@mui/material";
import React, { useEffect } from "react";
import { PARTIDOS_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";
import PersonIcon from '@mui/icons-material/Person'; // Example icon

function Membros({ partidoId }) {
  const { data, error, loading, request } = useFetch();
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      await request(`${PARTIDOS_URL_API}/${partidoId}/membros`);
    })();
  }, [request, partidoId]);

  if (error) return <Error message={error.message} />;
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
            Membros do Partido
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Lista de membros filiados ao partido.
          </Typography>
        </Paper>

        <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center' }}>
              <Typography variant="h6" component="h2">
                Membros Disponíveis
              </Typography>
              <Chip 
                label={`Total: ${data.dados.length}`} 
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
                },
                gap: 1
              }
            }}>
              {data.dados.length > 0 ? (
                data.dados.map((membro, index) => (
                  <React.Fragment key={membro.id+index}>
                    <ListItem sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <Avatar alt={membro.nome} src={membro.urlFoto} sx={{ width: 56, height: 56 }}>
                          {!membro.urlFoto && <PersonIcon />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={membro.nome} 
                        primaryTypographyProps={{ 
                          fontWeight: 'medium',
                          color: theme.palette.text.primary
                        }}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'block' }}
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              Estado: {membro.siglaUf}
                            </Typography>
                            {membro.email && (
                              <Typography
                                sx={{ display: 'block' }}
                                component="span"
                                variant="body2"
                                color="text.secondary"
                              >
                                E-mail: {membro.email}
                              </Typography>
                            )}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    {index < data.dados.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText 
                    primary="Nenhum membro encontrado para este partido."
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

export default Membros;
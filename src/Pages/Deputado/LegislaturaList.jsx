import {
  Typography,
  Box,
  Container,
  Paper,
  Card,
  CardContent,
  useTheme,
  alpha,
  Grid,
  Button
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROOT_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function LegislaturaList() {
  const { data, error, loading, request } = useFetch();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const url = ROOT_URL_API + "/legislaturas";
    async function getData() {
      await request(url);
    }
    getData();
  }, [request]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  if (error) return <Error message={error} />;
  if (loading) return <MyLinearProgress />;

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
          Legislaturas
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Explore a lista de legislaturas e clique para ver os detalhes da Mesa Diretora.
        </Typography>
      </Paper>

      <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center' }}>
            <Typography variant="h6" component="h2">
              Legislaturas Disponíveis
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {data?.dados.map((legislatura) => (
                <Grid size={{ xs: 12, sm: 6, md: 4}} key={legislatura.id}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/legislaturas/${legislatura.id}`)}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                      boxShadow: theme.shadows[2],
                      '&:hover': {
                        boxShadow: theme.shadows[4],
                      }
                    }}
                  >
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="h6">{`Legislatura ${legislatura.id}`}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Início: ${formatDate(legislatura.dataInicio)}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Fim: ${formatDate(legislatura.dataFim)}`}
                      </Typography>
                    </Box>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

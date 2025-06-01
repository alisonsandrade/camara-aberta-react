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
  Avatar,
  Button,
  CardActionArea
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ROOT_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function LegislaturaDetails() {
  const { id: idLegislatura } = useParams();
  const { data: mesaData, error: mesaError, loading: mesaLoading, request: requestMesa } = useFetch();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const mesaUrl = `${ROOT_URL_API}/legislaturas/${idLegislatura}/mesa`;
    requestMesa(mesaUrl);
  }, [requestMesa, idLegislatura]);

  const formatDate = (dateString) => {
    if (!dateString) return "Atual";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  if (mesaLoading) return <MyLinearProgress />;
  if (mesaError) return <Error message={`Erro ao carregar Mesa Diretora: ${mesaError.message || mesaError}`} />;

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
          Mesa Diretora da Legislatura {idLegislatura}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Veja os deputados que ocuparam cargos na Mesa Diretora desta legislatura.
        </Typography>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate(`/legislaturas/${idLegislatura}/deputados`)}
            sx={{
              fontWeight: 'bold',
              letterSpacing: 1,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              boxShadow: theme.shadows[6],
              '&:hover': {
                boxShadow: theme.shadows[8],
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            LISTAGEM DOS DEPUTADOS
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={2}>
        {mesaData?.dados?.length > 0 ? (
          mesaData.dados.map((deputado) => (
            <Grid size={{ xs:12, sm:6, md:4 }} key={`${deputado.id}-${deputado.codTitulo}`}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  '&:hover': {
                    boxShadow: theme.shadows[3],
                  },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardActionArea onClick={() => navigate(`/legislaturas/${idLegislatura}/deputados/${deputado.id}`)} >
                  <CardContent
                    sx={{
                      flexGrow: 1, 
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: 180, 
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid>
                        <Avatar
                          alt={deputado.nome}
                          src={deputado.urlFoto}
                          sx={{ width: 64, height: 64, referrerPolicy: "no-referrer" }}
                          slotProps={{
                            img: { referrerPolicy: 'no-referrer' }
                          }}
                        />                        
                      </Grid>
                      <Grid>
                        <Typography variant="h6">{deputado.nome}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {deputado.siglaPartido} - {deputado.siglaUf}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {deputado.titulo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`Período: ${formatDate(deputado.dataInicio)} - ${formatDate(deputado.dataFim)}`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid size={{ xs:12 }}>
            <Typography variant="body1" color="text.secondary">
              Nenhum membro da Mesa Diretora encontrado para esta legislatura.
            </Typography>
        </Grid>
        )}
      </Grid>
    </Container>
  );
}
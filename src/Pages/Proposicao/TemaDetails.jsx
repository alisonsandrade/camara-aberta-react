import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  Divider,
  Card,
  CardContent,
  IconButton,
  Button,
  Tooltip,
  Link as MuiLink,
  useTheme,
  alpha,
  Pagination
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";

// Importação de ícones
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NumbersIcon from '@mui/icons-material/Numbers';
import GavelIcon from '@mui/icons-material/Gavel';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import PublicIcon from '@mui/icons-material/Public';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LabelIcon from '@mui/icons-material/Label';
import { PROPOSICOES_URL_API } from "../../Api";

function ProposicaoDetalhes() {
  const params = useParams();
  let [searchParams] = useSearchParams()

  const { data, error, loading, request } = useFetch();
  const { data: tramitacoesData, error: tramitacoesError, loading: tramitacoesLoading, request: tramitacoesRequest } = useFetch();
  const theme = useTheme();
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatDate = (dateString) => {
    if (!dateString) return "Data não disponível";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    async function fetchProposicaoDetails() {
      const url = `${PROPOSICOES_URL_API}/${params.idProposicao}`;
      await request(url);
    }

    async function fetchTramitacoes() {
      const url = `${PROPOSICOES_URL_API}/${params.idProposicao}/tramitacoes`;
      await tramitacoesRequest(url);
    }

    if (params.idProposicao) {
      fetchProposicaoDetails();
      fetchTramitacoes();
    }
  }, [params.idProposicao, request, tramitacoesRequest]);

  if (error) return <Error message={error.message} />;
  if (loading) return <MyLinearProgress />;
  if (!data) return null;

  const proposicao = data.dados;
  const status = proposicao.statusProposicao;

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const sortedTramitacoes = tramitacoesData ? [...tramitacoesData.dados].sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora)) : [];
  
  const paginatedTramitacoes = sortedTramitacoes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Button
        component={Link}
        to={searchParams.get('redirecionar')}
        startIcon={<KeyboardBackspaceIcon />}
        sx={{ mb: 3 }}
        color="primary"
      >
        Voltar para Lista
      </Button>

      {/* Cabeçalho */}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="overline" color="primary" gutterBottom>
              {proposicao.descricaoTipo}
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'medium' }}>
              {proposicao.siglaTipo} {proposicao.numero}/{proposicao.ano}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Chip 
                icon={<NumbersIcon fontSize="small" />} 
                label={`ID: ${proposicao.id}`} 
                size="small" 
                variant="outlined"
              />
              <Chip 
                icon={<CalendarTodayIcon fontSize="small" />} 
                label={`Apresentação: ${formatDate(proposicao.dataApresentacao)}`} 
                size="small" 
                variant="outlined"
              />
              <Chip 
                icon={<GavelIcon fontSize="small" />} 
                label={status.siglaOrgao || "Órgão não especificado"} 
                size="small" 
                color="primary"
              />
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              startIcon={<PictureAsPdfIcon />}
              href={proposicao.urlInteiroTeor}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                borderRadius: 1,
                boxShadow: 3,
                px: 2,
              }}
            >
              Texto Integral
            </Button>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 2, height: '100%', boxShadow: theme.shadows }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                <ArticleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Ementa
              </Typography>
              <Typography variant="body1" paragraph>
                {proposicao.ementa}
              </Typography>
              
              {proposicao.ementaDetalhada && (
                <>
                  <Typography variant="h6" color="primary" gutterBottom>
                    <InfoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Ementa Detalhada
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {proposicao.ementaDetalhada}
                  </Typography>
                </>
              )}
              
              {proposicao.keywords && (
                <>
                  <Typography variant="h6" color="primary" gutterBottom>
                    <LabelIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Palavras-chave
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {proposicao.keywords.split(',').map((keyword, index) => (
                      <Chip 
                        key={index} 
                        label={keyword.trim()} 
                        size="small" 
                        sx={{ 
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) }
                        }}
                      />
                    ))}
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 2, boxShadow: theme.shadows, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                <AccessTimeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Status Atual
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Situação
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {status.descricaoSituacao || "Não especificado"}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  Última Atualização
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {formatDate(status.dataHora)}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  Órgão Atual
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {status.siglaOrgao || "Não especificado"}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  Regime
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {status.regime || "Não especificado"}
                </Typography>
              </Box>
              
              {status.despacho && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Despacho
                  </Typography>
                  <Typography variant="body2">
                    {status.despacho}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 2, boxShadow: theme.shadows }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                <AccountBalanceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Informações Adicionais
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Apreciação
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {status.apreciacao || "Não especificado"}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  Âmbito
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {status.ambito || "Não especificado"}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom>
                  Código do Tipo
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {proposicao.codTipo}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2">
                    ID da Proposição
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {proposicao.id}
                    </Typography>
                    <Tooltip title="Copiar ID">
                      <IconButton size="small" onClick={() => copyToClipboard(proposicao.id)}>
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                
                {proposicao.uri && (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2">
                      API URI
                    </Typography>
                    <Tooltip title="Abrir URI">
                      <IconButton 
                        size="small" 
                        component="a" 
                        href={proposicao.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <PublicIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" component="div" gutterBottom sx={{ mt: 4 }}>
        Tramitações
      </Typography>
      {tramitacoesLoading && <MyLinearProgress />}
      {tramitacoesError && <Error message={tramitacoesError.message} />}
      {tramitacoesData && (
        <>
          <Grid container spacing={1}>
            {paginatedTramitacoes.map((tramitacao, index) => (
              <Grid size={{ xs: 12 }} key={index}>
                <Card sx={{ borderRadius: 2, boxShadow: theme.shadows, position: 'relative' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {tramitacao.descricaoTramitacao}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Data e Hora: {formatDate(tramitacao.dataHora)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Órgão: {tramitacao.siglaOrgao}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Regime: {tramitacao.regime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Despacho: {tramitacao.despacho}
                    </Typography>
                    {tramitacao.url && (
                      <MuiLink href={tramitacao.url} target="_blank" rel="noopener noreferrer">
                        Ver mais detalhes
                      </MuiLink>
                    )}
                    <Box sx={{ position: 'absolute', bottom: 8, right: 8, backgroundColor: alpha(theme.palette.primary.main, 0.1), borderRadius: '50%', padding: '4px 8px' }}>
                      <Typography variant="body2" color="primary">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={Math.ceil(sortedTramitacoes.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
}

export default ProposicaoDetalhes;

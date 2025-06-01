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
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ROOT_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";
import { format } from "date-fns"; // Corrigido
import { ptBR } from "date-fns/locale"; // Corrigido

import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CakeIcon from '@mui/icons-material/Cake';
import SchoolIcon from '@mui/icons-material/School';
import PublicIcon from '@mui/icons-material/Public';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

import DeputadoDespesas from "./DeputadoDespesas";
import DeputadoDiscursos from "./DeputadoDiscursos";
import DeputadoEventos from "./DeputadoEventos";
import DeputadoFrentes from "./DeputadoFrentes";
import DeputadoHistorico from "./DeputadoHistorico";
import DeputadoMandatosExternos from "./DeputadoMandatosExternos";
import DeputadoOcupacoes from "./DeputadoOcupacoes";
import DeputadoOrgaos from "./DeputadoOrgaos";
import DeputadoProfissoes from "./DeputadoProfissoes";


export default function DeputadoDetails() {
  const { idLegislatura, idDeputado } = useParams();
  const { data: deputadoData, error: deputadoError, loading: deputadoLoading, request: requestDeputado } = useFetch();
  const theme = useTheme();

  const [activeSection, setActiveSection] = useState('none');

  useEffect(() => {
    if (idDeputado) {
      const url = `${ROOT_URL_API}/deputados/${idDeputado}`;
      requestDeputado(url);
    }
  }, [requestDeputado, idDeputado]);

  const formatDate = (dateString) => {
    if (!dateString) return "Não disponível";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  const getSocialIcon = (url) => {
    if (url.includes("facebook.com")) return <FacebookIcon color="primary" />;
    if (url.includes("twitter.com")) return <TwitterIcon color="primary" />;
    if (url.includes("youtube.com")) return <YouTubeIcon color="primary" />;
    if (url.includes("instagram.com")) return <InstagramIcon color="primary" />;
    return <PublicIcon color="primary" />;
  };

  if (deputadoLoading) return <MyLinearProgress />;
  if (deputadoError) return <Error message={`Erro ao carregar detalhes do deputado: ${deputadoError.message || deputadoError}`} />;
  if (!deputadoData || !deputadoData.dados) return <Error message="Dados do deputado não encontrados." />;

  const deputado = deputadoData.dados;
  const ultimoStatus = deputado.ultimoStatus;
  const gabinete = ultimoStatus?.gabinete;

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
        <Grid container spacing={3} alignItems="center">
          <Grid>
            <Avatar
              alt={deputado.nomeCivil || ultimoStatus?.nomeEleitoral}
              src={ultimoStatus?.urlFoto}
              sx={{ width: 120, height: 120, border: `2px solid ${theme.palette.primary.main}`}}
              slotProps={{
                img: { referrerPolicy: 'no-referrer' }
              }}
            />
          </Grid>
          <Grid>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'medium' }}>
              {deputado.nomeCivil}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {ultimoStatus?.nomeEleitoral} ({ultimoStatus?.siglaPartido} - {ultimoStatus?.siglaUf})
            </Typography>
            <Chip
              label={ultimoStatus?.situacao || 'Situação Desconhecida'}
              color={ultimoStatus?.situacao === 'Exercício' ? 'success' : 'info'}
              sx={{ mt: 1 }}
            />
            <Chip
              label={'Legislatura n.º ' + idLegislatura}
              color='secondary'
              sx={{ mt: 1, ml: 1 }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs:12, md:6 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
                Dados Pessoais
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CakeIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Data de Nascimento" secondary={formatDate(deputado.dataNascimento)} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><LocationOnIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Local de Nascimento" secondary={`${deputado.municipioNascimento || 'Não disponível'} - ${deputado.ufNascimento || 'ND'}`} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><PublicIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Nacionalidade" secondary="Brasileiro(a)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><SchoolIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Escolaridade" secondary={deputado.escolaridade || 'Não informada'} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Typography variant="body1" sx={{ ml: 0.5, fontWeight: 'bold' }}>CPF:</Typography></ListItemIcon>
                  <ListItemText primary={deputado.cpf || 'Não disponível'} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Typography variant="body1" sx={{ ml: 0.5, fontWeight: 'bold' }}>Sexo:</Typography></ListItemIcon>
                  <ListItemText primary={deputado.sexo === 'M' ? 'Masculino' : deputado.sexo === 'F' ? 'Feminino' : 'Não informado'} />
                </ListItem>
                {deputado.urlWebsite && (
                  <ListItem>
                    <ListItemIcon><PublicIcon color="primary" /></ListItemIcon>
                    <ListItemText
                      primary="Website Pessoal"
                      secondary={
                        <Link href={deputado.urlWebsite} target="_blank" rel="noopener" underline="hover">
                          {deputado.urlWebsite}
                        </Link>
                      }
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs:12, md:6 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>              
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
                Gabinete e Contato
              </Typography>
              <List dense>
                {gabinete && (
                  <>
                    <ListItem>
                      <ListItemIcon><LocationOnIcon color="primary" /></ListItemIcon>
                      <ListItemText primary="Localização do Gabinete" secondary={`Prédio ${gabinete.predio || 'ND'}, Sala ${gabinete.sala || 'ND'}, Andar ${gabinete.andar || 'ND'} (Gabinete ${gabinete.nome || 'ND'})`} />
                    </ListItem>
                    {gabinete.telefone && (
                      <ListItem>
                        <ListItemIcon><PhoneIcon color="primary" /></ListItemIcon>
                        <ListItemText primary="Telefone" secondary={gabinete.telefone} />
                      </ListItem>
                    )}
                    {gabinete.email && (
                      <ListItem>
                        <ListItemIcon><AlternateEmailIcon color="primary" /></ListItemIcon>
                        <ListItemText primary="Email do Gabinete" secondary={gabinete.email} />
                      </ListItem>
                    )}
                  </>
                )}
                {ultimoStatus?.email && (
                  <ListItem>
                    <ListItemIcon><EmailIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Email Pessoal" secondary={ultimoStatus.email} />
                  </ListItem>
                )}
                {!gabinete?.telefone && !gabinete?.email && !ultimoStatus?.email && (
                    <ListItem>
                        <ListItemText primary="Informações de contato não disponíveis." />
                    </ListItem>
                )}
              </List>              
            </CardContent>
          </Card>
        </Grid>

        {deputado.redeSocial && deputado.redeSocial.length > 0 && (
          <Grid size={{ xs:12 }}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
                  Redes Sociais
                </Typography>
                <List dense>
                  {deputado.redeSocial.map((url, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>{getSocialIcon(url)}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Link href={url} target="_blank" rel="noopener" underline="hover">
                            {url}
                          </Link>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={1} justifyContent="center">
          <Grid size={{ xs:12, sm:"auto" }}>
            <Button
              fullWidth
              onClick={() => setActiveSection('despesas')}
              variant={activeSection === 'despesas' ? 'contained' : 'outlined'}
            >
              Despesas
            </Button>
          </Grid>
          <Grid size={{ xs:12, sm:"auto" }}>
            <Button
              fullWidth
              onClick={() => setActiveSection('discursos')}
              variant={activeSection === 'discursos' ? 'contained' : 'outlined'}
            >
              Discursos
            </Button>
          </Grid>
          <Grid size={{ xs:12, sm:"auto" }}>
            <Button
              fullWidth
              onClick={() => setActiveSection('eventos')}
              variant={activeSection === 'eventos' ? 'contained' : 'outlined'}
            >
              Eventos
            </Button>
          </Grid>
          <Grid size={{ xs:12, sm:"auto" }}>
            <Button
              fullWidth
              onClick={() => setActiveSection('frentes')}
              variant={activeSection === 'frentes' ? 'contained' : 'outlined'}
            >
              Frentes
            </Button>
          </Grid>
          <Grid size={{ xs:12, sm:"auto" }}>
            <Button
              fullWidth
              onClick={() => setActiveSection('historico')}
              variant={activeSection === 'historico' ? 'contained' : 'outlined'}
            >
              Histórico
            </Button>
          </Grid>
          <Grid size={{ xs:12, sm:"auto" }}>
            <Button
              fullWidth
              onClick={() => setActiveSection('mandatosExternos')}
              variant={activeSection === 'mandatosExternos' ? 'contained' : 'outlined'}
            >
              Mandatos Externos
            </Button>
          </Grid>
          <Grid size={{ xs:12, sm:"auto" }}>
            <Button
              fullWidth
              onClick={() => setActiveSection('ocupacoes')}
              variant={activeSection === 'ocupacoes' ? 'contained' : 'outlined'}
            >
              Ocupações
            </Button>
          </Grid>
          <Grid size={{ xs:12, sm:"auto" }}>
            <Button
              fullWidth
              onClick={() => setActiveSection('orgaos')}
              variant={activeSection === 'orgaos' ? 'contained' : 'outlined'}
            >
              Órgãos
            </Button>
          </Grid>
          <Grid size={{ xs:12, sm:"auto" }}>
            <Button
              fullWidth
              onClick={() => setActiveSection('profissoes')}
              variant={activeSection === 'profissoes' ? 'contained' : 'outlined'}
            >
              Profissões
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        {activeSection === 'despesas' && <DeputadoDespesas idDeputado={idDeputado} idLegislatura={idLegislatura} />}
        {activeSection === 'discursos' && <DeputadoDiscursos idDeputado={idDeputado} idLegislatura={idLegislatura} />}
        {activeSection === 'eventos' && <DeputadoEventos idDeputado={idDeputado} />}
        {activeSection === 'frentes' && <DeputadoFrentes idDeputado={idDeputado} />}
        {activeSection === 'historico' && <DeputadoHistorico idDeputado={idDeputado} />}
        {activeSection === 'mandatosExternos' && <DeputadoMandatosExternos idDeputado={idDeputado} />}
        {activeSection === 'ocupacoes' && <DeputadoOcupacoes idDeputado={idDeputado} />}
        {activeSection === 'orgaos' && <DeputadoOrgaos idDeputado={idDeputado} />}
        {activeSection === 'profissoes' && <DeputadoProfissoes idDeputado={idDeputado} />}
        {activeSection === 'none' && (
          <Paper elevation={1} sx={{ p: 3, textAlign: 'center', color: 'text.secondary', borderRadius: 2 }}>
            <Typography variant="h6">Selecione uma categoria acima para ver mais detalhes sobre o deputado.</Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
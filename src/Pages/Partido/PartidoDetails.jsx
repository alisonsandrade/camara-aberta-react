import {
  Box,
  Container,
  Paper,
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Link as MuiLink,
  useTheme,
  alpha
} from "@mui/material";
import React, { useEffect } from "react";
import { PARTIDOS_URL_API } from "../../Api";
import Error from "../../Components/Error";
import MyLinearProgress from "../../Components/MyLinearProgress";
import useFetch from "../../Hooks/useFetch";
import Membros from "./Membros";
import { useParams } from "react-router-dom";
import {
  Public as PublicIcon,
  Facebook as FacebookIcon,
  LooksOne as LooksOneIcon,
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarTodayIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  EventAvailable as EventAvailableIcon
} from "@mui/icons-material";

function PartidoDetails() {
  const { data, loading, error, request } = useFetch();
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => {
    request(`${PARTIDOS_URL_API}/${id}`);
  }, [request, id]);

  if (error) return <Error message={error.message} />;
  if (loading) return <MyLinearProgress />;
  if (!data) return null;

  const InfoItem = ({ icon: Icon, label, value }) =>
    value ? (
      <Box sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
        <Icon color="action" sx={{ mr: 1, minWidth: 24 }} />
        <Typography variant="body1">
          {label}: <Typography component="span" fontWeight="medium">{value}</Typography>
        </Typography>
      </Box>
    ) : null;

  return (
    <Container sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 4,
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          gap: { xs: 2, sm: 3 },
          textAlign: { xs: "center", sm: "left" }
        }}
      >
        <Avatar
          alt={data.dados.nome}
          src={data.dados.urlLogo || undefined}
          sx={{
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            border: `2px solid ${theme.palette.primary.main}`,
            bgcolor: !data.dados.urlLogo ? theme.palette.primary.light : "transparent",
            color: !data.dados.urlLogo ? "white" : "inherit",
            fontSize: "1.5rem",
            fontWeight: "bold",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          slotProps={{
            img: { referrerPolicy: 'no-referrer' }
          }}
        >
          {!data.dados.urlLogo && (data.dados.sigla || data.dados.nome?.charAt(0))}
        </Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "medium", fontSize: { xs: "1.8rem", sm: "2.5rem" } }}>
            {data.dados.nome} ({data.dados.sigla})
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Detalhes completos e informações sobre o partido.
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[2], height: "100%" }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: `1px solid ${theme.palette.divider}`, pb: 1, mb: 2 }}>
                Informações Gerais
              </Typography>
              <InfoItem icon={LooksOneIcon} label="Número Eleitoral" value={data.dados.numeroEleitoral} />
              {data.dados.urlWebSite && (
                <InfoItem icon={PublicIcon} label="Site" value={<MuiLink href={data.dados.urlWebSite} target="_blank" rel="noopener noreferrer">{data.dados.urlWebSite}</MuiLink>} />
              )}
              {data.dados.urlFacebook && (
                <InfoItem icon={FacebookIcon} label="Facebook" value={<MuiLink href={data.dados.urlFacebook} target="_blank" rel="noopener noreferrer">{data.dados.urlFacebook}</MuiLink>} />
              )}
              <InfoItem icon={EventAvailableIcon} label="Situação" value={data.dados.status?.situacao} />
              <InfoItem icon={CalendarTodayIcon} label="Data do Status" value={data.dados.status?.data && new Date(data.dados.status.data).toLocaleDateString()} />
              <InfoItem icon={GroupIcon} label="Total de Membros" value={data.dados.status?.totalMembros} />
              <InfoItem icon={PersonIcon} label="Total em Posse" value={data.dados.status?.totalPosse} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[2], height: "100%" }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: `1px solid ${theme.palette.divider}`, pb: 1, mb: 2 }}>
                Líder do Partido
              </Typography>
              {data.dados.status?.lider ? (
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: 2, textAlign: { xs: "center", sm: "left" } }}>
                  <Avatar
                    src={data.dados.status.lider.urlFoto}
                    alt={data.dados.status.lider.nome}
                    sx={{ width: 100, height: 100, flexShrink: 0, border: `1px solid ${theme.palette.divider}`}}
                    slotProps={{
                      img: { referrerPolicy: 'no-referrer' }
                    }}
                  >
                    {!data.dados.status.lider.urlFoto && <PersonIcon sx={{ fontSize: 50 }} />}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="medium" gutterBottom>
                      {data.dados.status.lider.nome}
                    </Typography>
                    {data.dados.status.lider.uf && (
                      <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                        <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Estado: {data.dados.status.lider.uf}
                      </Typography>
                    )}
                    {data.dados.status.lider.idLegislatura && (
                      <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Legislatura: {data.dados.status.lider.idLegislatura}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 3 }}>
                  Informações do líder não disponíveis.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12} item xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[2], mb: 2 }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: `1px solid ${theme.palette.divider}`, pb: 1, mb: 2 }}>
                Membros do Partido
              </Typography>
              <Membros partidoId={data.dados.id} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PartidoDetails;

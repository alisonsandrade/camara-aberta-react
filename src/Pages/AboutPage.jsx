import React from "react";
import { Box, Container, Typography, Paper, useTheme, Link as MuiLink, Chip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

const AboutPage = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.shadows[5]
        }}
      >
        <InfoIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}>
          Sobre o SISCA - Câmara Aberta React
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '700px', mx: 'auto', mt: 2 }}>
          O <b>SISCA - Câmara Aberta React</b> é uma iniciativa desenvolvida para democratizar o acesso à informação legislativa brasileira. Nosso objetivo é transformar os dados brutos disponibilizados pela API de Dados Abertos da Câmara dos Deputados em uma interface amigável e acessível para todos os cidadãos.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '700px', mx: 'auto' }}>
          Acreditamos que a transparência é a base de uma democracia forte. Ao facilitar a consulta de informações sobre deputados, suas despesas, participações em órgãos e profissões, esperamos capacitar o cidadão comum a fiscalizar e entender melhor o trabalho de seus representantes.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, fontWeight: 'medium', color: theme.palette.secondary.main }}>
          Tecnologias Utilizadas
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Este projeto foi construído utilizando as seguintes tecnologias:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Chip label="React" color="primary" variant="outlined" />
            <Chip label="Material-UI" color="primary" variant="outlined" />
            <Chip label="React Router DOM" color="primary" variant="outlined" />
            <Chip label="date-fns" color="primary" variant="outlined" />
            <Chip label="Hooks Personalizados" color="primary" variant="outlined" />
            <Chip label="API de Dados Abertos da Câmara" color="primary" variant="outlined" />
        </Box>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3, fontWeight: 'medium', color: theme.palette.secondary.main }}>
          Colaboração e Contato
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Este é um projeto de código aberto e incentivamos a colaboração. Sinta-se à vontade para explorar o código, sugerir melhorias ou reportar problemas.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          E-mail: <MuiLink href="mailto:alison.sandrade@hotmail.com" underline="hover">alison.sandrade@hotmail.com</MuiLink>
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          GitHub do Projeto: <MuiLink href="https://github.com/alisonsandrade/camara-aberta-react" target="_blank" rel="noopener noreferrer" underline="hover">SISCA - Câmara Aberta React</MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
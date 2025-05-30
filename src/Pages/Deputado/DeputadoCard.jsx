import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
  Link,
  useTheme,
  alpha
} from "@mui/material";

export default function DeputadoCard({ id, nome, siglaPartido, siglaUf, urlFoto, email, uri, idLegislatura }) {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderRadius: 2,
        borderColor: alpha(theme.palette.primary.main, 0.2),
        '&:hover': {
          boxShadow: theme.shadows[3],
        }
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid>
            <Avatar
              alt={nome}
              src={urlFoto}
              sx={{ width: 64, height: 64 }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6">{nome}</Typography>
            <Typography variant="body2" color="text.secondary">
              {siglaPartido} - {siglaUf}
            </Typography>
            <Box mt={1}>
              <Link href={`/legislaturas/${idLegislatura}/deputados/${id}`} rel="noopener" underline="hover">
                Perfil na Câmara
              </Link>
              {email && (
                <>
                  {" | "}
                  <Link href={`mailto:${email}`} underline="hover">
                    {email}
                  </Link>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
  Link,
  useTheme,
  alpha
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DeputadoCard({ id, nome, siglaPartido, siglaUf, urlFoto, email, uri, idLegislatura }) {
  const theme = useTheme();
  const navigate = useNavigate();

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
      <CardActionArea onClick={() => navigate(`/legislaturas/${idLegislatura}/deputados/${id}`)} >
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid>
              <Avatar
                alt={nome}
                src={urlFoto}
                sx={{ width: 64, height: 64, referrerPolicy: "no-referrer" }}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="h6">{nome}</Typography>
              <Typography variant="body2" color="text.secondary">
                {siglaPartido} - {siglaUf}
              </Typography>
              <Box mt={1}>
                {email && (
                  <>
                    <Link href={`mailto:${email}`} underline="hover">
                      {email}
                    </Link>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Divider,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icon for leader
import useFetch from '../../Hooks/useFetch';
import MyLinearProgress from '../../Components/MyLinearProgress';
import Error from '../../Components/Error';

function PartidoCard({ partidoId, nome, sigla, uri }) {
  const { data, error, loading, request } = useFetch();
  const theme = useTheme();

  useEffect(() => {
    async function getData() {
        await request(uri)
    }

    getData()

  }, [request])

  if (error) return <Error message={error} />;
  if (loading) return <MyLinearProgress />;

  if (data) {
    return (
        <Card
        sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            mb: 2,
            borderRadius: 2,
            boxShadow: theme.shadows[1],
            transition: '0.3s',
            '&:hover': {
            boxShadow: theme.shadows[4],
            },
        }}
        >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: { sm: 120 } }}>
            {data.dados.urlLogo ? (
            <Avatar alt={nome} src={data.dados.urlLogo} sx={{ width: 80, height: 80, border: `1px solid ${theme.palette.divider}` }} />
            ) : (
            <Avatar sx={{ width: 80, height: 80, bgcolor: theme.palette.primary.light }}>
                <Typography variant="h5" color="white">{sigla}</Typography>
            </Avatar>
            )}
        </Box>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
            {nome} ({sigla})
            </Typography>
            {data.dados.lider && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountCircleIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                <Typography variant="body2" color="text.secondary">
                Líder: {data.dados.lider}
                </Typography>
            </Box>
            )}
            <Button
            variant="outlined"
            size="small"
            component={Link}
            to={`/partidos/${partidoId}`} // Adjust this path to your detail page
            endIcon={<ArrowForwardIcon />}
            sx={{ mt: data.dados.lider ? 0 : 2 }} // Adjust margin if no leader is present
            >
            Ver Detalhes
            </Button>
        </CardContent>
        </Card>
    );
  }
}

export default PartidoCard;
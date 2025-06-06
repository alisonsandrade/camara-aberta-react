import React, { useEffect, useState, useMemo } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  alpha,
  Paper,
  Link as MuiLink,
  TextField,
  InputAdornment,
  Pagination,
  Grid,
  Chip
} from "@mui/material";
import MyLinearProgress from "../../Components/MyLinearProgress";
import Error from "../../Components/Error";
import useFetch from "../../Hooks/useFetch";
import { ROOT_URL_API } from "../../Api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SearchIcon from '@mui/icons-material/Search';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function DeputadoDespesas({ idDeputado, idLegislatura }) {
  const { data, error, loading, request } = useFetch();
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [totalPages, setTotalPages] = useState(1);
  const [shouldShowPagination, setShouldShowPagination] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    setShouldShowPagination(false);
  }, [idDeputado, searchTerm]); 

  useEffect(() => {
    if (idDeputado) {
      const url = `${ROOT_URL_API}/deputados/${idDeputado}/despesas?idLegislatura=${idLegislatura}&pagina=${currentPage}&itens=${itemsPerPage}&ordem=DESC&ordenarPor=ano`;
      request(url);
    }
  }, [request, idDeputado, currentPage, itemsPerPage]);

  useEffect(() => {
    if (data && data.links) {
      const lastLink = data.links.find(link => link.rel === 'last');
      const nextLink = data.links.find(link => link.rel === 'next');
      
      if (lastLink) {
        const urlParams = new URLSearchParams(lastLink.href);
        const totalPaginasFromApi = parseInt(urlParams.get('pagina'), 10);
        setTotalPages(totalPaginasFromApi);
        setShouldShowPagination(totalPaginasFromApi > 1 || !!nextLink); 
      } else if (nextLink) {
        setTotalPages(currentPage + 1);
        setShouldShowPagination(true);
      } else {
        setTotalPages(data.dados && data.dados.length > 0 ? 1 : 0);
        setShouldShowPagination(false);
      }
    } else if (data && data.dados && data.dados.length > 0) {
        setTotalPages(1);
        setShouldShowPagination(false);
    } else {
        setTotalPages(0); 
        setShouldShowPagination(false);
    }
  }, [data, currentPage]); 

  const despesas = useMemo(() => {
    return data?.dados || [];
  }, [data]);

  const filteredDespesas = useMemo(() => {
    if (!searchTerm) {
      return despesas;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return despesas.filter(
      (despesa) =>
        despesa.tipoDespesa?.toLowerCase().includes(lowercasedFilter) ||
        despesa.nomeFornecedor?.toLowerCase().includes(lowercasedFilter) ||
        despesa.cnpjCpfFornecedor?.toLowerCase().includes(lowercasedFilter) ||
        despesa.tipoDocumento?.toLowerCase().includes(lowercasedFilter) ||
        despesa.ano?.toString().includes(lowercasedFilter) ||
        despesa.mes?.toString().includes(lowercasedFilter)
    );
  }, [despesas, searchTerm]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Não disponível";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  if (loading) return <MyLinearProgress />;
  if (error) return <Error message={`Erro ao carregar despesas: ${error.message || error}`} />;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
          Despesas (Cota Parlamentar)
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Filtrar Despesas (Tipo, Fornecedor, CNPJ/CPF, Documento ou Ano/Mês)"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <List>
          {filteredDespesas.length > 0 ? (
            filteredDespesas.map((despesa, index) => (
              <React.Fragment key={despesa.codDocumento || index}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    py: 1.5,
                    px: 0,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.action.hover, 0.05),
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mb: 0.5 }}>
                        <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                          {despesa.tipoDespesa || 'Despesa não especificada'}
                        </Typography>
                        <Chip
                          label={`R$ ${despesa.valorLiquido?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                          color="success"
                          size="small"
                          sx={{ borderRadius: '4px' }}
                        />
                      </Box>
                    }
                    secondary={
                      <Grid container spacing={1} sx={{ mt: 0.5 }}>
                        <Grid size={{ xs:12, sm: 6 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <PersonIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {`Fornecedor: ${despesa.nomeFornecedor || 'Não informado'}`}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <DescriptionIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {`Documento: ${despesa.tipoDocumento || 'N/A'}`}
                              {despesa.numDocumento && ` (${despesa.numDocumento})`}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs:12, sm: 6 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <CalendarMonthIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {`Data: ${formatDate(despesa.dataDocumento)}`}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <PaidIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {`Ano/Mês: ${despesa.ano}/${String(despesa.mes).padStart(2, '0')}`}
                            </Typography>
                          </Box>
                        </Grid>
                        {despesa.urlDocumento && (
                          <Grid size={{ xs:12 }}>
                            <MuiLink href={despesa.urlDocumento} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
                              Ver Documento
                            </MuiLink>
                          </Grid>
                        )}
                      </Grid>
                    }
                  />
                </ListItem>
                {index < filteredDespesas.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: alpha(theme.palette.grey[100], 0.5) }}>
              <Typography variant="body1" color="text.secondary">
                Nenhuma despesa encontrada para este deputado com o filtro atual.
              </Typography>
            </Paper>
          )}
        </List>

        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, pb: 1 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            disabled={loading}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
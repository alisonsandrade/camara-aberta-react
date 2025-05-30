import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import PartidoPage from "../Pages/Partido/PartidoPage";
import PartidoDetails from "../Pages/Partido/PartidoDetails";
import ProposicaoPage from "../Pages/Proposicao/ProposicaoPage";
import TemaDetails from "../Pages/Proposicao/TemaDetails";
import TemaPage from "../Pages/Proposicao/TemaPage";
import LegislaturaPage from "../Pages/Deputado/LegislaturaPage";
import LegislaturaDetails from "../Pages/Deputado/LegislaturaDetails";
import DeputadoList from "../Pages/Deputado/DeputadoList";
import DeputadoDetails from "../Pages/Deputado/DeputadoDetails";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "partidos",
        element: <PartidoPage />,
      },
      {
        path: "partidos/:id",
        element: <PartidoDetails />,
      },
      {
        path: "proposicoes",
        element: <ProposicaoPage />,
      },
      {
        path: "proposicoes/temas/:codTema",
        element: <TemaPage />,
      },
      {
        path: "proposicoes/detalhes/:idProposicao",
        element: <TemaDetails />,
      },
      {
        path: "legislaturas",
        element: <LegislaturaPage />
      },
      {
        path: "legislaturas/:id",
        element: <LegislaturaDetails />
      },
      {
        path: "legislaturas/:idLegislatura/deputados",
        element: <DeputadoList />
      },
      {
        path: "legislaturas/:idLegislatura/deputados/:idDeputado",
        element: <DeputadoDetails />
      }
    ],
  },
];

export default routes;

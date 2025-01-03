import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import PartidoPage from "../Pages/Partido/PartidoPage";
import ProposicaoPage from "../Pages/Proposicao/ProposicaoPage";
import TemaPage from "../Pages/Proposicao/TemaPage";

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
        path: "proposicoes",
        element: <ProposicaoPage />,
      },
      {
        path: "proposicoes/temas/:codTema",
        element: <TemaPage />,
      },
    ],
  },
];

export default routes;

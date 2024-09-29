import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import PartidoDetails from "./PartidoDetails";

function PartidoListItem({ partidoId, sigla, nome }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === partidoId}
      onChange={handleChange(partidoId)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={partidoId + "-content"}
        id={partidoId + "-header"}
      >
        <Typography sx={{ width: "30%", flexShrink: 0 }}>{sigla}</Typography>
        <Typography sx={{ color: "text.secondary" }}>{nome}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {expanded && <PartidoDetails panelId={partidoId} />}
      </AccordionDetails>
    </Accordion>
  );
}

export default PartidoListItem;

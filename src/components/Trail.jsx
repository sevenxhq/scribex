import { Box, Breadcrumbs, Chip } from "@mui/material";
import { getTypeFromPerf } from "../core/getType";

export default function Trail({ state, actions }) {
  const { perfHtml, sequenceIds } = state || {};
  const { setSequenceIds } = actions || {};

  const onClickBreadcrumb = (index) => {
    setSequenceIds(sequenceIds.slice(0, index + 1));
  };

  const breadcrumbsComponents = sequenceIds?.map((sequenceId, index) => (
    <Chip
      size="small"
      key={index + sequenceId}
      color={index + 1 === sequenceIds.length ? "default" : "info"}
      label={getTypeFromPerf({ perfHtml, sequenceId })}
      onClick={() => onClickBreadcrumb(index)}
      sx={{ textTransform: "capitalize", color: "white" }}
    />
  ));

  return (
    <Box sx={{ flexGrow: 1, paddingLeft: "2em" }}>
      <Breadcrumbs
        className="breadcrumbs"
        sx={{ flexGrow: 1, color: "white" }}
        aria-label="breadcrumb"
      >
        {breadcrumbsComponents}
      </Breadcrumbs>
    </Box>
  );
}

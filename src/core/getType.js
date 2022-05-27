export const getTypeFromPerf = ({ perfHtml, sequenceId }) => {
  const html = perfHtml?.sequencesHtml[sequenceId];
  const div = document.createElement("div");
  div.innerHTML = html;
  const type = div.firstChild?.dataset?.sequencetype;

  return type;
};

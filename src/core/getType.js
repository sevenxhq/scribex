export const getTypeFromPerf = ({ perfHtml, sequenceId }) => {
  const sequenceHtml = perfHtml?.sequencesHtml[sequenceId];
  let type = getTypeFromSequenceHtml({ sequenceHtml });

  if (type === "main") {
    const { h, toc, toc2 } = perfHtml?.headers;
    type = toc || toc2 || h;
  }

  return type;
};

export const getTypeFromSequenceHtml = ({ sequenceHtml }) => {
  console.log("sequenceHtml", sequenceHtml);
  let type = sequenceHtml?.match(/data-[Tt]ype="(\w+)"/);
  type &&= type[1];
  console.log("type", type);
  return type;
};

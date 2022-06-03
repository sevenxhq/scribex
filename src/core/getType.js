export const getTypeFromPerf = ({ perfHtml, sequenceId }) => {
  const sequenceHtml = perfHtml?.sequencesHtml[sequenceId];
  return getTypeFromSequenceHtml({ sequenceHtml });
};

export const getTypeFromSequenceHtml = ({ sequenceHtml }) => {
  let type = sequenceHtml?.match(/data-sequence[Tt]ype="(\w+)"/);
  type &&= type[1];

  return type;
};

import { useProskomma, useImport, useCatalog } from "proskomma-react-hooks";
import { useDeepCompareEffect } from "use-deep-compare";

import usePerf from "./usePerf";
import useApplicationReducer from "./useApplicationReducer";

const _documents = [
  // { 
  //   selectors: { org: 'bcs', lang: 'hi', abbr: 'irv' },
  //   bookCode: 'tit',
  //   url: '/bcs-hi_irv.tit.usfm',
  // },
  { 
    selectors: { org: 'unfoldingWord', lang: 'en', abbr: 'ult' },
    bookCode: 'psa',
    url: '/unfoldingWord-en_ult.psa.usfm',
  },
];

export default function useApplicationState(props) {
  const { state, actions } = useApplicationReducer(props);
  const { verbose } = state;

  const { proskomma, stateId, newStateId } = useProskomma({ verbose });
  const { done } = useImport({ proskomma, stateId, newStateId, documents: _documents });
  if (verbose) console.log({ done });

  const { catalog } = useCatalog({ proskomma, stateId, verbose });

  const { id: docSetId, documents } = done && catalog.docSets[0] || {};
  const { bookCode } = documents && documents[0] || {};
  const ready = docSetId && bookCode || false;
  if (verbose) console.log({ready, catalog});

  const {
    state: { perfHtml, canUndo, canRedo },
    actions: { savePerfHtml, undo, redo }
  } = usePerf({ proskomma, ready, docSetId, bookCode, verbose });

  useDeepCompareEffect(() => {
    if (perfHtml && perfHtml.mainSequenceId !== state.sequenceIds[0]) {
      actions.setSequenceIds([perfHtml?.mainSequenceId]);
    };
  }, [perfHtml, state.sequenceIds]);

  return {
    state: {...state, perfHtml, canUndo, canRedo },
    actions: {...actions, savePerfHtml, undo, redo },
  };
};
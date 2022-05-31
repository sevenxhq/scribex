import { useProskomma, useImport, useCatalog } from "proskomma-react-hooks";
import { useDeepCompareEffect } from "use-deep-compare";

import usePerf from "./usePerf";
import useApplicationReducer from "./useApplicationReducer";

const verbose = true;

const _documents = [
  { 
    selectors: { org: 'unfoldingWord', lang: 'en', abbr: 'psa' },
    bookCode: 'tit',
    url: '/unfoldingWord-en_ult.psa.usfm',
  },
];

export default function useApplicationState() {
  const { state, actions } = useApplicationReducer();

  const { proskomma, stateId, newStateId } = useProskomma({ verbose });
  const { done } = useImport({ proskomma, stateId, newStateId, documents: _documents });
  console.log({ done });

  const { catalog } = useCatalog({ proskomma, stateId, verbose });

  const { id: docSetId, documents } = done && catalog.docSets[0] || {};
  const { bookCode } = documents && documents[0] || {};
  const ready = docSetId && bookCode || false;
  console.log({ready, catalog});

  const {
    state: { perfHtml, canUndo, canRedo },
    actions: { savePerfHtml, undo, redo }
  } = usePerf({ proskomma, ready, docSetId, bookCode });

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
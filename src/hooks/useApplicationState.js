import { useProskomma, useImport, useCatalog } from "proskomma-react-hooks";
import { useDeepCompareEffect } from "use-deep-compare";

import usePerf from "./usePerf";
import useApplicationReducer from "./useApplicationReducer";
import htmlMap from "../data/htmlmap.json";

const _documents = [
  // {
  //   selectors: { org: 'bcs', lang: 'hi', abbr: 'irv' },
  //   bookCode: 'tit',
  //   url: '/bcs-hi_irv.tit.usfm',
  // },
  {
    selectors: { org: "unfoldingWord", lang: "en", abbr: "ult" },
    bookCode: "psa",
    url: "/unfoldingWord-en_ult.psa.usfm",
  },
];

export default function useApplicationState(props) {
  const { state, actions } = useApplicationReducer(props);
  const { verbose } = state;

  const { proskomma, stateId, newStateId } = useProskomma({ verbose });
  const { done } = useImport({
    proskomma,
    stateId,
    newStateId,
    documents: _documents,
  });

  const { catalog } = useCatalog({ proskomma, stateId, verbose });

  const { id: docSetId, documents } = (done && catalog.docSets[0]) || {};
  const { bookCode } = (documents && documents[0]) || {};
  const ready = (docSetId && bookCode) || false;
  const isLoading = !done || !ready;

  const { state: perfState, actions: perfActions } = usePerf({
    proskomma,
    ready,
    docSetId,
    bookCode,
    verbose,
    htmlMap, //uncomment if pasing custom classes.
    // proskomma, ready, docSetId, bookCode, verbose
  });
  const { perfHtml } = perfState;

  useDeepCompareEffect(() => {
    if (perfHtml && perfHtml.mainSequenceId !== state.sequenceIds[0]) {
      actions.setSequenceIds([perfHtml?.mainSequenceId]);
    }
  }, [perfHtml, state.sequenceIds]);

  return {
    state: { ...state, ...perfState, isLoading },
    actions: { ...actions, ...perfActions },
  };
}

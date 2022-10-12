import React from 'react';
import { useState, useCallback } from "react";
import { useProskomma, useImport, useCatalog } from "proskomma-react-hooks";
import { useDeepCompareEffect } from "use-deep-compare";
import htmlMap from "../data/htmlmap.json";

import usePerf from "../hooks/usePerf";

export const ScribexContext = React.createContext();

export function ScribexContextProvider({ children }) {
  const initialState = {
    sequenceIds: [],
    sectionable: false,
    blockable: true,
    editable: true,
    preview: false,
    verbose: false,
    graftSequenceId: null,
  };

  const [state, setState] = useState(initialState);

  const setSectionable = useCallback((sectionable) => {
    setState((prev) => ({ ...prev, sectionable }));
  }, []);

  const setBlockable = useCallback((blockable) => {
    setState((prev) => ({ ...prev, blockable }));
  }, []);

  const setEditable = useCallback((editable) => {
    setState((prev) => ({ ...prev, editable }));
  }, []);

  const setPreview = useCallback((preview) => {
    setState((prev) => ({ ...prev, preview }));
  }, []);

  const setToggles = useCallback((toggles) => {
    setState((prev) => ({ ...prev, ...toggles }));
  }, []);

  const setSequenceIds = useCallback((sequenceIds) => {
    setState((prev) => ({ ...prev, sequenceIds }));
  }, []);

  const setGraftSequenceId = useCallback((graftSequenceId) => {
    setState((prev) => ({ ...prev, graftSequenceId }));
  }, []);

  const addSequenceId = useCallback(
    (_sequenceId) => {
      setSequenceIds([...state.sequenceIds, _sequenceId]);
    },
    [state.sequenceIds, setSequenceIds]
  );
  const actions = {
    setSectionable,
    setBlockable,
    setEditable,
    setPreview,
    setToggles,
    setSequenceIds,
    addSequenceId,
    setGraftSequenceId,
  };
  // code that fetches data
  // const _documents = [
  //   // {
  //   //   selectors: { org: 'bcs', lang: 'hi', abbr: 'irv' },
  //   //   bookCode: 'tit',
  //   //   url: '/bcs-hi_irv.tit.usfm',
  //   // },
  //   {
  //     selectors: { org: "unfoldingWord", lang: "en", abbr: "ult" },
  //     bookCode: "psa",
  //     url: "/unfoldingWord-en_ult.psa-short.usfm",
  //   },
  // ];

  // const { verbose } = state;
  // const { proskomma, stateId, newStateId } = useProskomma({ verbose });
  // const { done } = useImport({
  //   proskomma,
  //   stateId,
  //   newStateId,
  //   documents: _documents,
  // });

  // const { catalog } = useCatalog({ proskomma, stateId });

  // const { id: docSetId, documents } = (done && catalog.docSets[0]) || {};
  // const { bookCode } = (documents && documents[0]) || {};
  // const { h: bookName } = (documents && documents[0]) || {};
  // const ready = (docSetId && bookCode) || false;
  // const isLoading = !done || !ready;

  // const { state: perfState, actions: perfActions } = usePerf({
  //   proskomma,
  //   ready,
  //   docSetId,
  //   bookCode,
  //   verbose,
  //   htmlMap,
  // });
  // const { htmlPerf } = perfState;

  // useDeepCompareEffect(() => {
  //   if (htmlPerf && htmlPerf.mainSequenceId !== state.sequenceIds[0]) {
  //     actions.setSequenceIds([htmlPerf?.mainSequenceId]);
  //   }
  // }, [htmlPerf, state.sequenceIds]);
  const value = {
    state,
    actions,
  };
  return <ScribexContext.Provider value={value}>{children}</ScribexContext.Provider>;
};

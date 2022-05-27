import { useState, useCallback } from "react";
import { useDeepCompareEffect } from "use-deep-compare";

// import perf from "../data/webbe.luke.perf.html.json";
// import perf from "../data/jonah.perf.html.json";

export default function useApplicationState({
  perfHtml,
  savePerfHtml,
  undo,
  redo,
  canUndo,
  canRedo
}) {
  const initialState = {
    title: "PERF HTML Editor",
    sequenceIds: [perfHtml?.mainSequenceId],
    sectionable: true,
    blockable: true,
    editable: true,
    preview: false
  };

  const [state, setState] = useState(initialState);

  useDeepCompareEffect(() => {
    if (perfHtml && perfHtml.mainSequenceId !== state.sequenceIds[0]) {
      setState((prev) => ({
        ...prev,
        sequenceIds: [perfHtml?.mainSequenceId]
      }));
    }
  }, [perfHtml, state.sequenceIds]);

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
    savePerfHtml,
    undo,
    redo
  };

  return { state: { ...state, perfHtml, canUndo, canRedo }, actions };
}

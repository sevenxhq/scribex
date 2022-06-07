import { useState, useTransition } from "react";
import { useDeepCompareCallback, useDeepCompareEffect, useDeepCompareMemo } from "use-deep-compare";
import isEqual from 'lodash.isequal';
import EpiteletePerfHtml from "epitelete-perf-html";

export default function usePerf({ proskomma, ready, docSetId, bookCode, verbose }) {
  const [isSaving, startSaving] = useTransition();
  const [perfHtml, setPerfHtml] = useState();

  const epiPerfHtml = useDeepCompareMemo(() => (
    ready && new EpiteletePerfHtml({ proskomma, docSetId, options: { historySize: 100 } })
  ), [proskomma, ready, docSetId]);

  useDeepCompareEffect(() => {
    if (epiPerfHtml) {
      epiPerfHtml.readHtml(bookCode).then((_perfHtml) => {
        setPerfHtml(_perfHtml);
      });
    }
  }, [epiPerfHtml, bookCode]);

  const savePerfHtml = useDeepCompareCallback(({ sequenceId, sequenceHtml }) => {
    let _perfHtml = { ...perfHtml };
    _perfHtml.sequencesHtml[sequenceId] = sequenceHtml;

    if (!isEqual(perfHtml, _perfHtml)) setPerfHtml(_perfHtml);
    
    startSaving(async () => {
      const newPerfHtml = await epiPerfHtml?.writeHtml( bookCode, sequenceId, _perfHtml );
      if (verbose) console.log({ info: "Saved sequenceId", bookCode, sequenceId });
  
      if (!isEqual(perfHtml, newPerfHtml)) setPerfHtml(newPerfHtml);
    });
  }, [perfHtml, bookCode]);

  const undo = async () => {
    const newPerfHtml = await epiPerfHtml?.undoHtml(bookCode);
    setPerfHtml(newPerfHtml);
  };

  const redo = async () => {
    const newPerfHtml = await epiPerfHtml?.redoHtml(bookCode);
    setPerfHtml(newPerfHtml);
  };

  const canUndo = epiPerfHtml?.canUndo && epiPerfHtml?.canUndo(bookCode) || false;
  const canRedo = epiPerfHtml?.canRedo && epiPerfHtml?.canRedo(bookCode) || false;

  const state = {
    bookCode,
    perfHtml,
    canUndo,
    canRedo,
    isSaving,
  };

  const actions = {
    savePerfHtml,
    undo,
    redo
  };

  return { state, actions };
}

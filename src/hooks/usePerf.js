import { startTransition, useCallback, useState } from "react";
import { useDeepCompareCallback, useDeepCompareEffect, useDeepCompareMemo } from "use-deep-compare";
import isEqual from 'lodash.isequal';
import EpiteletePerfHtml from "epitelete-perf-html";

export default function usePerf({ proskomma, ready, docSetId, bookCode }) {
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

    startTransition(() => {
      if (!isEqual(perfHtml, _perfHtml)) setPerfHtml(_perfHtml);
    });
    
    startTransition(async () => {
      const newPerfHtml = await epiPerfHtml?.writeHtml( bookCode, sequenceId, _perfHtml );
      console.log({ info: "Saved sequenceId", bookCode, sequenceId });
  
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
    canRedo
  };

  const actions = {
    savePerfHtml,
    undo,
    redo
  };

  return { state, actions };
}

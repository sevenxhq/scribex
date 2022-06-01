import EpiteletePerfHtml from "epitelete-perf-html";
import { useState } from "react";
import { useDeepCompareEffect, useDeepCompareMemo } from "use-deep-compare";

export default function usePerf({ proskomma, ready, docSetId, bookCode }) {
  const [perfHtml, setPerfHtml] = useState();

  const epiPerfHtml = useDeepCompareMemo(
    () =>
      ready && new EpiteletePerfHtml({ proskomma, docSetId, options: { historySize: 100 } }),
    [proskomma, ready, docSetId]
  );

  useDeepCompareEffect(() => {
    if (epiPerfHtml) {
      epiPerfHtml.readHtml(bookCode).then((_perfHtml) => {
        setPerfHtml(_perfHtml);
      });
    }
  }, [epiPerfHtml, bookCode]);

  const savePerfHtml = async ({ sequenceId, perfHtml: _perfHtml }) => {
    const newPerfHtml = await epiPerfHtml?.writeHtml(
      bookCode,
      sequenceId,
      _perfHtml
    );
    console.log({ info: "Saved sequenceId", sequenceId });
    setPerfHtml(newPerfHtml);
  };

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

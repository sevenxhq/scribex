import EpiteletePerfHtml from "epitelete-perf-html";
import { useState } from "react";
import { useDeepCompareEffect, useDeepCompareMemo } from "use-deep-compare";

export default function usePerf({ proskomma, ready }) {
  const [bookCode, setBookCode] = useState("MAT");
  const [perfHtml, setPerfHtml] = useState();

  const epiPerfHtml = useDeepCompareMemo(
    () =>
      ready && new EpiteletePerfHtml({ proskomma, docSetId: "xyz-fra_lsg" }),
    [proskomma, ready]
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

  const canUndo = epiPerfHtml?.canUndo();

  const canRedo = epiPerfHtml?.canRedo();

  console.log({ canUndo, canRedo });

  const state = {
    bookCode,
    perfHtml,
    canUndo,
    canRedo
  };

  const actions = {
    setBookCode,
    savePerfHtml,
    undo,
    redo
  };

  return { state, actions };
}

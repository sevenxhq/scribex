import { useState, useTransition,useCallback } from "react";
import {
  useDeepCompareCallback,
  useDeepCompareEffect,
  useDeepCompareMemo,
} from "use-deep-compare";
import isEqual from "lodash.isequal";
import EpiteleteHtml from "epitelete-html";

export default function usePerf({
  proskomma,
  ready,
  docSetId,
  bookCode,
  verbose,
  htmlMap,
}) {
  const [isSaving, startSaving] = useTransition();
  const [htmlPerf, setHtmlPerf] = useState();
  const [usfmText, setUsfmText] = useState();

  const epiteleteHtml = useDeepCompareMemo(
    () =>
      ready &&
      new EpiteleteHtml({
        proskomma,
        docSetId,
        htmlMap,
        options: { historySize: 100 },
      }),
    [proskomma, ready, docSetId]
  );

  useDeepCompareEffect(() => {
    if (epiteleteHtml) {
      epiteleteHtml.readHtml(bookCode,{safe:true}, htmlMap).then((_htmlPerf) => {
        //remove htmlMap for default classes
        setHtmlPerf(_htmlPerf);
      });
    }
  }, [epiteleteHtml, bookCode]);


  const saveHtmlPerf = useDeepCompareCallback((_htmlPerf, { sequenceId, sequenceHtml }) => {

    if (!isEqual(htmlPerf, _htmlPerf)) setHtmlPerf(_htmlPerf);

    startSaving(async () => {
      const newHtmlPerf = await epiteleteHtml?.writeHtml(
        bookCode,
        sequenceId,
        _htmlPerf
      );
      if (verbose)
        console.log({ info: "Saved sequenceId", bookCode, sequenceId });

      if (!isEqual(htmlPerf, newHtmlPerf)) setHtmlPerf(newHtmlPerf);
    });
  },
    [htmlPerf, bookCode]
  );

  const exportUsfm = useCallback((bookCode) => {
    const write2File = async () => {
      const usfmString = await epiteleteHtml?.readUsfm(bookCode);
      console.log({ usfmString })
      setUsfmText(usfmString);
    }
    write2File();
  }, [bookCode])

  const undo = async () => {
    const newPerfHtml = await epiteleteHtml?.undoHtml(bookCode);
    setHtmlPerf(newPerfHtml);
  };

  const redo = async () => {
    const newPerfHtml = await epiteleteHtml?.redoHtml(bookCode);
    setHtmlPerf(newPerfHtml);
  };

  const canUndo =
    (epiteleteHtml?.canUndo && epiteleteHtml?.canUndo(bookCode)) || false;
  const canRedo =
    (epiteleteHtml?.canRedo && epiteleteHtml?.canRedo(bookCode)) || false;

  const state = {
    bookCode,
    htmlPerf,
    canUndo,
    canRedo,
    isSaving,
    usfmText
  };

  const actions = {
    saveHtmlPerf,
    undo,
    redo,
    exportUsfm
  };

  return { state, actions };
}
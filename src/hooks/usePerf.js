import { useState, useTransition } from "react";
import {
  useDeepCompareCallback,
  useDeepCompareEffect,
  useDeepCompareMemo,
} from "use-deep-compare";
import isEqual from "lodash.isequal";
import EpiteletePerfHtml from "epitelete-perf-html";

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

  const epiteletePerfHtml = useDeepCompareMemo(
    () =>
      ready &&
      new EpiteletePerfHtml({
        proskomma,
        docSetId,
        htmlMap,
        options: { historySize: 100 },
      }),
    [proskomma, ready, docSetId]
  );

  useDeepCompareEffect(() => {
    if (epiteletePerfHtml) {
      epiteletePerfHtml.readHtml(bookCode, htmlMap).then((_htmlPerf) => {
        //remove htmlMap for default classes
        setHtmlPerf(_htmlPerf);
      });
    }
  }, [epiteletePerfHtml, bookCode]);
  console.log('perf from proskomma',htmlPerf);
  

  const saveHtmlPerf = useDeepCompareCallback( (_htmlPerf,{ sequenceId, sequenceHtml }) => {

    // _perfHtml.sequencesHtml[sequenceId] = sequenceHtml;

    if (!isEqual(htmlPerf, _htmlPerf)) setPerfHtml(_htmlPerf);

    startSaving(async () => {
      const newPerfHtml = await epiteletePerfHtml?.writeHtml(
        bookCode,
        sequenceId,
        _perfHtml
      );
      if (verbose)
        console.log({ info: "Saved sequenceId", bookCode, sequenceId });

      if (!isEqual(htmlPerf, newHtmlPerf)) setHtmlPerf(newPerfHtml);
    });
  },
    [htmlPerf, bookCode]
  );

  const undo = async () => {
    const newPerfHtml = await epiteletePerfHtml?.undoHtml(bookCode);
    setHtmlPerf(newPerfHtml);
  };

  const redo = async () => {
    const newPerfHtml = await epiteletePerfHtml?.redoHtml(bookCode);
    setHtmlPerf(newPerfHtml);
  };

  const canUndo =
    (epiteletePerfHtml?.canUndo && epiteletePerfHtml?.canUndo(bookCode)) || false;
  const canRedo =
    (epiteletePerfHtml?.canRedo && epiteletePerfHtml?.canRedo(bookCode)) || false;

  const state = {
    bookCode,
    htmlPerf,
    canUndo,
    canRedo,
    isSaving,
  };

  const actions = {
    saveHtmlPerf,
    undo,
    redo,
  };

  return { state, actions };
}

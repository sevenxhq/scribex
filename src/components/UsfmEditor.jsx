import { HtmlPerfEditor } from "@xelah/type-perf-html";

import RecursiveBlock from './RecursiveBlock';


export default function UsfmEditor(props) {
  const {
    sequenceIds,
    isSaving,
    isLoading,
    htmlPerf,
    sectionable,
    blockable,
    editable,
    preview,
    verbose,
    addSequenceId,
    saveHtmlPerf,
    setGraftSequenceId,
  } = props;
  const sequenceId = sequenceIds.at(-1);
  const style =
    isSaving || isLoading || !sequenceId ? { cursor: "progress" } : {};

  const handlers = {
    onBlockClick: ({ content: _content, element }) => {
      const _sequenceId = element.dataset.target;
      const { tagName } = element;
      const isInline = tagName === "SPAN";
      // if (_sequenceId && !isInline) addSequenceId(_sequenceId);
      // if (_sequenceId) setGraftSequenceId(_sequenceId);
      _sequenceId ? setGraftSequenceId(_sequenceId) : setGraftSequenceId(null);
    },
  };
  let chapterIndex = 3;
  function onReferenceSelected({ bookId, chapter, verse }) {
    console.log({ bookId, chapter, verse })
  }
  
  const _props = {
    htmlPerf: htmlPerf,
    onHtmlPerf: saveHtmlPerf,
    sequenceIds,
    addSequenceId,
    chapterIndex,
    components: {
      block: (__props) => RecursiveBlock({ htmlPerf, onHtmlPerf: saveHtmlPerf, sequenceIds, addSequenceId, onReferenceSelected, ...__props }),
    },
    options: {
      sectionable,
      blockable,
      editable,
      preview,
    },
    decorators: {},
    verbose,
    handlers,
  };

  // const onIntersection = (entries) => {
  //   for (const entry of entries) {
  //     if (entry.isIntersecting) {
  //       console.log(entry.target.dataset.attsNumber);
  //     }
  //   }
  // };
  // const chapters = document.querySelectorAll('.chapter');
  // const observer = new IntersectionObserver(onIntersection);
  // chapters.forEach(chapter=>{
  //   observer.observe(chapter);
  // })
 

  return (
    <div className="editor" style={style}>
      {!sequenceId && <p>loading</p>}
      {sequenceId && <HtmlPerfEditor {..._props} />}
    </div>
  );
}

import { getTarget } from "../core/getTarget";
import PerfEditorWrapper from "./PerfEditorWrapper";

export default function Editor({ state, state: { perfHtml }, actions }) {
  const sequenceId = state.sequenceIds.at(-1);

  let props = {
    state,
    actions,
    sequenceId,
    components: {}
  };

  props.components.block = ({ content, style, ..._props }) => {
    let component;

    let editable = !!content.match(/class="[\w\s]*block[\w\s]*"/);

    if (editable) {
      // const onBlur = (event) => {
      //   let _content;
      //   _content = event.target.innerHTML;
      //   _content = _content.replace(/\s+/g, " ").replace("<br>", "");

      //   _onBlur(_content);
      // };
      component = <div {..._props} />;
    }

    if (!editable) {
      const _sequenceId = getTarget({ content });

      if (_sequenceId && !state.preview) {
        const nestedEditorProps = { ...props, sequenceId: _sequenceId };
        component = <PerfEditorWrapper {...nestedEditorProps} />;
      }

      component ||= <div {..._props} contentEditable={false} />;
    }

    return component;
  };

  return (
    <div className="Editor">
      {sequenceId ? <PerfEditorWrapper {...props} /> : <></>}
    </div>
  );
}

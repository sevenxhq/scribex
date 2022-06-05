import React, { useContext, useEffect } from 'react';

import { AppContext } from '../hooks/App.context';
import { getTarget } from '../core/getTarget';

import PerfEditorWrapper from './PerfEditorWrapper';

export default function Block({ content, style, index, verbose, ...props }) {
  const { state: { preview } } = useContext(AppContext);
  
  useEffect(() => { if (verbose) console.log("Block First Render", index); }, []);

  let component;
  let editable = !!content.match(/class="[\w\s]*block[\w\s]*"/);

  if (editable) component = <div {...props} />;

  if (!editable) {
    const _sequenceId = getTarget({ content });

    if (_sequenceId && !preview) {
      component = <PerfEditorWrapper sequenceId={_sequenceId} />;
    };
    component ||= <div {...props} contentEditable={false} />;
  };
  
  return component;
};
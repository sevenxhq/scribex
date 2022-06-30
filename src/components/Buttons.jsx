/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useMemo } from "react";

import { AppContext } from "../hooks/App.context";
import useLifecycleLog from "../hooks/useLifecycleLog";

export default function Buttons() {
  useLifecycleLog(Buttons);

  const {
    state,
    state: { canUndo, canRedo, sectionable, editable, blockable, preview },
    actions: {
      undo,
      redo,
      setSectionable,
      setBlockable,
      setEditable,
      setPreview,
    },
  } = useContext(AppContext);


  return (
    <div>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={()=>setSectionable(true)}>Sectionable On</button>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"onClick={()=>setSectionable(false)}>Sectionable Off</button>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"onClick={()=>setEditable(true)}>Editable On</button>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"onClick={()=>setEditable(false)}>Editable Off</button>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"onClick={()=>setBlockable(true)}>Blockable On</button>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"onClick={()=>setBlockable(false)}>Blockable Off</button>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"onClick={()=>undo()}>Undo</button>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"onClick={()=>redo()}>Redo</button>
    </div>
  );
}
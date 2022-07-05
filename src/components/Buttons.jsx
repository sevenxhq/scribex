/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useMemo } from "react";

import { AppContext } from "../hooks/App.context";
import useLifecycleLog from "../hooks/useLifecycleLog";

import {
  LockClosedIcon,
  BookmarkIcon,
  CollectionIcon,
  ViewBoardsIcon,
  PencilIcon,
} from "@heroicons/react/outline";

import { ArrowClockwise, ArrowCounterClockwise } from "phosphor-react";

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
    <>
      <CollectionIcon
        aria-label="Collection-Icon"
        className="h-5 w-5 text-white fill-current cursor-pointer"
        aria-hidden="true"
        onClick={() => setSectionable(true)}
      />
      <CollectionIcon
        aria-label="Collection-Icon"
        className="h-5 w-5 text-white cursor-pointer"
        aria-hidden="true"
        onClick={() => setSectionable(false)}
      />

      <PencilIcon
        aria-label="Collection-Icon"
        className="h-5 w-5 text-white fill-current cursor-pointer"
        aria-hidden="true"
        onClick={() => setEditable(true)}
      />
      <PencilIcon
        aria-label="Collection-Icon"
        className="h-5 w-5 text-white cursor-pointer"
        aria-hidden="true"
        onClick={() => setEditable(false)}
      />
      <button
        className="text-blue-700 font-semibold text-primary hover:text-white border border-blue-500 hover:border-transparent rounded"
        onClick={() => setBlockable(true)}
      >
        B On
      </button>
      <button
        className="text-blue-700 font-semibold text-primary hover:text-white border border-blue-500 hover:border-transparent rounded"
        onClick={() => setBlockable(false)}
      >
        B Off
      </button>
      <ArrowCounterClockwise
        aria-label="Collection-Icon"
        className="h-5 w-5 text-white cursor-pointer"
        aria-hidden="true"
        onClick={() => undo()}
      />
      <ArrowClockwise
        aria-label="Collection-Icon"
        className="h-5 w-5 text-white cursor-pointer"
        aria-hidden="true"
        onClick={() => redo()}
      />
    </>
  );
}

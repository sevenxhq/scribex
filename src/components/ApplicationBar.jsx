/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { ScribexContext } from "../hooks/ScribexContext";
import useLifecycleLog from "../hooks/useLifecycleLog";

export default function ApplicationBar({ children }) {
  const {
    state: { title },
  } = useContext(ScribexContext);
  useLifecycleLog(ApplicationBar);

  return <>{children}</>;
}

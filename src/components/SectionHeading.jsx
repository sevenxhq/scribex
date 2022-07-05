import React from "react";
import { useDeepCompareMemo } from "use-deep-compare";
import useLifecycleLog from "../hooks/useLifecycleLog";

export default function SectionHeading({
  type: _type,
  content,
  show,
  index,
  ...props
}) {
  useLifecycleLog(SectionHeading, index);

  let type = index && `Chapter ${index}`;
  type ||= _type === "main" ? "Title & Introduction" : _type;

  const component = useDeepCompareMemo(
    () => (
      <h2 {...props} className="section-heading" variant="h5">
        {type}
      </h2>
    ),
    [props, type]
  );

  return component;
}

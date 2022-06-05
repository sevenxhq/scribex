import { useContext } from "react";

import { AppContext } from "../hooks/App.context";

import ApplicationBar from "./ApplicationBar";
import Trail from "./Trail";
import Buttons from "./Buttons";
import Editor from "./Editor";

export default function Layout() {
  const { verbose } = useContext(AppContext);
  if (verbose) console.log("Layout Render");

  return (
    <div className="Layout">
      <ApplicationBar>
        <Trail />
        <Buttons />
      </ApplicationBar>
      <div id="offset"></div>
      <Editor />
    </div>
  );
}

import ApplicationBar from "./ApplicationBar";
import Editor from "./Editor";
import useLifecycleLog from "../hooks/useLifecycleLog";
import Buttons from "./Buttons";

export default function Layout() {
  useLifecycleLog(Layout);

  return (
    <div className="layout">
      <ApplicationBar>
        <Buttons />
      </ApplicationBar>
      <div id="offset"></div>
      <Editor />
    </div>
  );
}

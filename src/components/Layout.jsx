import ApplicationBar from "./ApplicationBar";
import Trail from "./Trail";
import Buttons from "./Buttons";
import Editor from "./Editor";
import useLifecycleLog from "../hooks/useLifecycleLog";

export default function Layout() {
  useLifecycleLog(Layout);

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

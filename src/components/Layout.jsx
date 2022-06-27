import ApplicationBar from "./ApplicationBar";
import Editor from "./Editor";
import useLifecycleLog from "../hooks/useLifecycleLog";

export default function Layout() {
  useLifecycleLog(Layout);

  return (
    <div className="Layout">
      <ApplicationBar />
      <div id="offset"></div>
      <Editor />
    </div>
  );
}

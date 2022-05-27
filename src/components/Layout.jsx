import Trail from "./Trail";
import Buttons from "./Buttons";
import Editor from "./Editor";
import ApplicationBar from "./ApplicationBar";

export default function Layout({ state, actions }) {
  return (
    <div className="Layout">
      <ApplicationBar title={state.title}>
        <Trail {...{ state, actions }} />
        <Buttons {...{ state, actions }} />
      </ApplicationBar>
      <div id="offset"></div>
      <Editor {...{ state, actions }} />
    </div>
  );
}

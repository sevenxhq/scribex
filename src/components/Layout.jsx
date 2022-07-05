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
      <div className="grid grid-flow-col auto-cols-fr m-3 gap-2">
        <div className="bg-white border-b-2 border-secondary rounded-md shadow h-editor overflow-hidden">
          <div className="flex items-center justify-between bg-secondary">
            <div className="flex">
              <div className="bg-primary text-white py-2 uppercase tracking-wider text-xs font-semibold">
                <span aria-label="editor-bookname" className="px-3">
                  Philemon
                </span>
                <span
                  className="focus:outline-none bg-white py-4 bg-opacity-10"
                  role="button"
                  tabIndex="-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="inline h-4 w-4 mx-1 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span className="px-3">1</span>
                <span
                  className="focus:outline-none bg-white py-4 bg-opacity-10"
                  role="button"
                  tabIndex="-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="inline h-4 w-4 mx-1 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div
              aria-label="editor-pane"
              className="h-4 flex justify-center items-center text-white text-xxs uppercase tracking-wider font-bold leading-3 truncate"
            >
              Editor
            </div>
            <div title="navigation lock/unlock" className="flex items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  aria-label="close-lock"
                  className="h-5 w-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <div
                role="button"
                tabIndex="0"
                title="bookmark"
                className="mx-1 px-2 focus:outline-none border-r-2 border-l-2 border-white border-opacity-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="  h-5 w-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-r-2 border-secondary pb-16 prose-sm max-w-none overflow-y-auto h-full no-scrollbars">
            <Editor />
          </div>
        </div>
      </div>
    </div>
  );
}

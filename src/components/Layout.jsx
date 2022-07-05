import ApplicationBar from "./ApplicationBar";
import Editor from "./Editor";
import useLifecycleLog from "../hooks/useLifecycleLog";
import Buttons from "./Buttons";

import { LockClosedIcon, BookmarkIcon } from "@heroicons/react/outline";

export default function Layout() {
  useLifecycleLog(Layout);

  return (
    <div className="layout">
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
            <div className="flex items-center">
              <ApplicationBar>
                <Buttons />
              </ApplicationBar>
            </div>
            <div title="navigation lock/unlock" className="flex items-center">
              <div>
                <LockClosedIcon
                  aria-label="close-lock"
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </div>
              <div
                role="button"
                tabIndex="0"
                title="bookmark"
                className="mx-1 px-2 focus:outline-none border-r-2 border-l-2 border-white border-opacity-10"
              >
                <BookmarkIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
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

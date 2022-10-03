import { generateCode } from "../utils/useCodeGenerator";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Procedure } from "../pages/generator";

const CodePreview = ({
  routerName,
  procedures,
}: {
  routerName: string;
  procedures: Procedure[];
}) => {
  return (
    <div className="relative mx-2 flex basis-1/2 flex-col items-start justify-start overflow-hidden rounded-md border lg:mr-6">
      <div className="mb-2 w-full bg-slate-700 pt-2 pb-1 text-lg font-bold">
        <h1 className="pl-4">Generated Code</h1>
      </div>
      <SyntaxHighlighter
        language="javascript"
        style={nightOwl}
        wrapLines={true}
        className="mt-2 min-h-[50vh] w-full rounded-md px-4 py-2 text-sm"
      >
        {generateCode({ routerName, procedures })}
      </SyntaxHighlighter>
      <button
        id="copy-button"
        className="absolute top-12 right-12 rounded bg-blue-500/60 px-2 py-1 text-sm text-white"
        onClick={() => {
          navigator.clipboard.writeText(
            generateCode({ routerName, procedures })
          );
          setTimeout(() => {
            document
              .getElementById("copy-button")
              ?.classList.replace("bg-blue-500/60", "bg-green-500/60");
          }, 100);
          setTimeout(() => {
            document
              .getElementById("copy-button")
              ?.classList.replace("bg-green-500/60", "bg-blue-500/60");
          }, 1000);
        }}
      >
        Copy
      </button>
    </div>
  );
};

export default CodePreview;

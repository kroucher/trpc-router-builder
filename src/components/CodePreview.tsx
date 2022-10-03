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
    <div className="relative mx-auto flex basis-1/2 flex-col items-start justify-start rounded-md px-8">
      <h1 className="py-1 text-lg font-bold ">Generated Code</h1>
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
              ?.classList.add("bg-green-500");
          }, 100);
          setTimeout(() => {
            document
              .getElementById("copy-button")
              ?.classList.remove("bg-green-500");
          }, 1000);
        }}
      >
        Copy
      </button>
    </div>
  );
};

export default CodePreview;

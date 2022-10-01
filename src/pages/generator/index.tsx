import { NextPage } from "next";
import { useState } from "react";
import Procedures from "../../components/Procedures/Procedures";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { generateCode } from "../../utils/useCodeGenerator";

export type QueryTypes = "query" | "mutation" | "subscription";
export type Procedure = {
  id: number;
  type: QueryTypes;
  name: string;
  input?: Input[];
  output?: string;
  async: boolean;
};
export type Input = {
  id: number;
  inputObject: InputObject;
  title: string;
  purpose: string;
};

export type InputObject = {
  type: string;
  required?: boolean;
  optional?: boolean;
  typeRequirements?: TypeRequirement[];
};

export type TypeRequirement = {
  name: string;
  option: TypeRequirementOption;
  enabled: boolean;
  value: string;
};

export type TypeRequirementOption =
  | "min"
  | "max"
  | "length"
  | "minDate"
  | "maxDate";

const GeneratorPage: NextPage = () => {
  const [routerName, setRouterName] = useState("myRouter");
  const [procedures, setProcedures] = useState<Procedure[]>([
    {
      id: 0,
      type: "query",
      name: "myProcedure",
      input: [
        {
          id: 0,
          inputObject: {
            type: "string",
            required: true,
          },
          title: "input",
          purpose: "input",
        },
      ],
      output: "z.string()",
      async: false,
    },
  ]);

  const addProcedure = () => {
    setProcedures((prev) => [
      ...prev,
      {
        id: prev.length,
        type: "query",
        name: "myProcedure",
        inputObject: [
          {
            id: 0,
            input: {
              type: "string",
              required: true,
            },
            title: "Input",
            purpose: "input",
          },
        ],
        output: "z.string()",
        async: false,
      },
    ]);
  };

  const updateProcedure = (id: number, procedure: Procedure) => {
    const newProcedures = procedures.map((p) => {
      if (p.id === id) {
        return procedure;
      }
      return p;
    }) as Procedure[];
    setProcedures(newProcedures);
  };

  const removeProcedure = (id: number) => {
    setProcedures((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <main className="flex min-h-screen items-start justify-center bg-slate-900 py-2 text-white ">
      {/* selections */}
      <div className="flex w-full basis-1/2 flex-col items-start justify-start px-6">
        <h1 className="py-1 text-lg font-bold ">Router Name</h1>
        <input
          className="mt-2 w-full rounded bg-white px-4 py-2 text-black"
          value={routerName}
          onChange={(e) => setRouterName(e.target.value)}
        />
        {/* add procedure */}
        <div className="mt-4 flex w-full flex-col items-start justify-start">
          <div className="flex w-full items-center justify-between">
            <h1 className="py-1 text-lg font-bold ">Procedures</h1>
            <button
              className="ml-2 rounded bg-blue-500 px-2 py-1 text-sm text-white"
              onClick={addProcedure}
            >
              Add
            </button>
          </div>
          <Procedures
            procedures={procedures}
            updateProcedure={updateProcedure}
            removeProcedure={removeProcedure}
          />
        </div>
      </div>
      {/* code */}
      <div className="relative mx-auto flex basis-1/2 flex-col items-start justify-start rounded-md px-8">
        <h1 className="py-1 text-lg font-bold ">Generated Code</h1>
        <SyntaxHighlighter
          language="javascript"
          style={nightOwl}
          className="mt-2 h-[90vh] w-full rounded-md px-4 py-2 text-sm"
        >
          {generateCode({ routerName, procedures })}
        </SyntaxHighlighter>
        {/* <textarea
          className="mt-2 h-[90vh] w-full rounded-md bg-white px-4 py-2 text-black"
          value={generateCode({ routerName, procedures })}
          readOnly
        /> */}
        {/* copy to clipboard button */}
        <button
          id="copy-button"
          className="absolute top-16 right-16 rounded bg-blue-500 px-4 py-2 text-white"
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
    </main>
  );
};

export default GeneratorPage;

import { Input, Procedure } from "../../pages/generator";
import ProcedureInputField from "./ProcedureInputField";
import ProcedureSelectInput from "./ProcedureSelectField";
import ProcedureTextInput from "./ProcedureTextField";

const Procedures = ({
  procedures,
  updateProcedure,
  removeProcedure,
}: {
  procedures: Procedure[];
  updateProcedure: (i: number, procedure: Procedure) => void;
  removeProcedure: (id: number) => void;
}) => {
  return (
    <div className="mt-2 flex w-full flex-col items-start justify-start gap-2 space-y-4">
      {procedures.map((procedure, i) => {
        const isUnique =
          procedures
            .map((p) => p.name)
            .filter((name) => name === procedure.name).length === 1;
        return (
          <div
            key={i}
            className="flex w-full flex-col items-start justify-start space-y-3 rounded-md border p-3 pb-6"
          >
            <div className="flex w-full flex-row-reverse items-start justify-between">
              <button
                className="self-start rounded bg-red-500 px-2 py-1 text-white"
                onClick={() => {
                  removeProcedure(i);
                }}
              >
                {/* bin svg */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 011 1v1H3V5zm12 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2V7h10zm-4 2a1 1 0 00-1 1v4a1 1 0 002 0V9a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="flex w-full flex-col">
                <ProcedureTextInput
                  procedure={procedure}
                  i={i}
                  updateProcedure={updateProcedure}
                  title="Procedure Name"
                  purpose="name"
                  isUnique={isUnique}
                />
              </div>
            </div>
            <ProcedureSelectInput
              procedure={procedure}
              i={i}
              updateProcedure={updateProcedure}
              title="Procedure Type"
              purpose="type"
              options={["query", "mutation", "subscription"]}
            />

            <div className="relative flex w-full max-w-sm items-center justify-between space-x-3 pb-2">
              <span className="text-sm">Inputs</span>
              <button
                aria-label="Add Input"
                name="deleteInput"
                title="Add Input"
                className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-300 pb-0.5 text-black`}
                onClick={() => {
                  updateProcedure(procedure.id, {
                    ...procedure,
                    input: [
                      ...(procedure.input || []),
                      {
                        id: procedure.input?.length || 0,
                        inputObject: {
                          type: "string",
                          required: true,
                        },
                        title: "input",
                        purpose: "input",
                      },
                    ],
                  });
                }}
              >
                +
              </button>
            </div>

            {procedure.input?.map((input, i) => {
              return (
                <>
                  <div className="flex w-full max-w-sm flex-col items-start justify-start space-y-2 rounded-md border-y border-dashed border-white px-2 pb-4">
                    <ProcedureInputField
                      key={i}
                      procedure={procedure}
                      i={i}
                      updateProcedure={updateProcedure}
                      options={[
                        "string",
                        "number",
                        "boolean",
                        "array",
                        "object",
                      ]}
                      input={input}
                    />
                    <ProcedureTextInput
                      procedure={procedure}
                      i={i}
                      updateProcedure={updateProcedure}
                      title={`Input Name`}
                      purpose="typeName"
                      isUnique={isUnique}
                    />
                  </div>
                </>
              );
            })}
            <div className="mt-2 flex items-center justify-start">
              <h1 className="py-1 text-sm font-bold ">Async</h1>
              <input
                className="ml-2 h-4 w-4 rounded bg-white text-black"
                type="checkbox"
                checked={procedure.async}
                onChange={(e) =>
                  updateProcedure(i, {
                    ...procedure,
                    async: e.target.checked,
                  })
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Procedures;

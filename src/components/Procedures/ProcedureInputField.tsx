import { Dispatch, SetStateAction } from "react";
import { Input, InputObject, Procedure } from "../../pages/generator";

const ProcedureInputField = ({
  procedure,
  i,
  updateProcedure,
  input,
  options,
}: {
  procedure: Procedure;
  i: number;
  updateProcedure: (i: number, procedure: Procedure) => void;
  input: Input;
  options: string[];
}) => {
  return (
    <div className="relative w-full max-w-sm  pb-4">
      <h1 className="py-1 text-sm font-light">Input #{i + 1}</h1>
      <select
        className="mt-2 w-full max-w-sm rounded bg-white px-2 py-1 text-xs capitalize text-black"
        value={input.inputObject.type}
        onChange={(e) => {
          updateProcedure(procedure.id, {
            ...procedure,
            input: procedure.input?.map((input, j) => {
              if (j === i) {
                return {
                  ...input,
                  inputObject: {
                    ...input.inputObject,
                    type: e.target.value,
                  },
                };
              }
              return input;
            }),
          });
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {input.inputObject.type === "array" ? (
        <div className="flex flex-col">
          <span className="pt-2 text-sm font-light">Array of:</span>
          <div>
            <select
              className="mt-2 w-fit rounded bg-white px-2 py-1 text-xs capitalize text-black"
              value={input.inputObject.arrayOf}
              onChange={(e) => {
                updateProcedure(procedure.id, {
                  ...procedure,
                  input: procedure.input?.map((input, j) => {
                    if (j === i) {
                      return {
                        ...input,
                        inputObject: {
                          ...input.inputObject,
                          arrayOf: e.target.value,
                        },
                      };
                    }
                    return input;
                  }),
                });
              }}
            >
              {options.map((option) => {
                if (option === "array") return null;
                if (option === "object") return null;
                return (
                  <option key={option} value={option}>
                    {option}s
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      ) : null}
      {input.inputObject.type === "object" && (
        <div>
          {/* inputs for key/value */}
          <div className="flex w-full flex-col">
            {input.inputObject.objectEntries?.map((object, j) => {
              const key = object.key;
              const value = object.value;
              return (
                <div
                  key={j}
                  className="relative my-1 flex flex-row rounded-lg border p-1"
                >
                  <div className="flex flex-col">
                    <button
                      name="Delete"
                      title="Delete"
                      className="absolute top-2 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-300 text-xs text-black"
                      onClick={() => {
                        updateProcedure(procedure.id, {
                          ...procedure,
                          input: procedure.input?.map((input, k) => {
                            if (k === i) {
                              return {
                                ...input,
                                inputObject: {
                                  ...input.inputObject,
                                  objectEntries:
                                    input.inputObject.objectEntries?.filter(
                                      (object, l) => l !== j
                                    ),
                                },
                              };
                            }
                            return input;
                          }),
                        });
                      }}
                    >
                      -
                    </button>
                    <span className="pt-2 text-sm font-light">Name:</span>
                    <input
                      className="mt-2 mr-3 w-fit rounded bg-white px-2 py-1 text-xs capitalize text-black"
                      value={key}
                      onChange={(e) => {
                        updateProcedure(procedure.id, {
                          ...procedure,
                          input: procedure.input?.map((input, k) => {
                            if (k === i) {
                              return {
                                ...input,
                                inputObject: {
                                  ...input.inputObject,
                                  objectEntries:
                                    input.inputObject.objectEntries?.map(
                                      (object, l) => {
                                        if (l === j) {
                                          return {
                                            ...object,
                                            key: e.target.value,
                                          };
                                        }
                                        return object;
                                      }
                                    ),
                                },
                              };
                            }
                            return input;
                          }),
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="pt-2 text-sm font-light">Value:</span>
                    <select
                      className="mt-2 w-fit rounded bg-white px-2 py-1 text-xs capitalize text-black"
                      value={value}
                      onChange={(e) => {
                        updateProcedure(procedure.id, {
                          ...procedure,
                          input: procedure.input?.map((input, k) => {
                            if (k === i) {
                              return {
                                ...input,
                                inputObject: {
                                  ...input.inputObject,
                                  objectEntries:
                                    input.inputObject.objectEntries?.map(
                                      (object, l) => {
                                        if (l === j) {
                                          return {
                                            ...object,
                                            value: e.target.value,
                                          };
                                        }
                                        return object;
                                      }
                                    ),
                                },
                              };
                            }
                            return input;
                          }),
                        });
                      }}
                    >
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="mt-2 w-fit rounded bg-white px-2 py-1 text-xs capitalize text-black"
            onClick={() => {
              updateProcedure(procedure.id, {
                ...procedure,
                input: procedure.input?.map((input, j) => {
                  if (j === i) {
                    return {
                      ...input,
                      inputObject: {
                        ...input.inputObject,
                        objectEntries: [
                          ...(input.inputObject.objectEntries ?? []),
                          { key: "", value: "" },
                        ],
                      },
                    };
                  }
                  return input;
                }),
              });
            }}
          >
            Add key/value
          </button>
        </div>
      )}

      <button
        aria-label="Delete input"
        name="deleteInput"
        title="Delete Input"
        className={`absolute -right-2 top-0 mt-2 mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-300 pb-0.5 text-black`}
        onClick={() => {
          updateProcedure(procedure.id, {
            ...procedure,
            input: procedure.input?.filter((_, j) => j !== i),
          });
        }}
      >
        -
      </button>
    </div>
  );
};

export default ProcedureInputField;

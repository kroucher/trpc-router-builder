import { Dispatch, SetStateAction } from "react";
import { Input, InputObject, Procedure } from "../../pages/generator";

const ProcedureInputField = ({
  procedure,
  i,
  updateProcedure,
  title,
  purpose,
  isUnique,
  input,
  options,
}: {
  procedure: Procedure;
  i: number;
  updateProcedure: (i: number, procedure: Procedure) => void;
  title: string;
  purpose: string;
  isUnique?: boolean;
  input: Input;
  options: string[];
}) => {
  return (
    <div className="relative w-full">
      <h1 className="py-1 text-sm font-light">Input #{i + 1}</h1>
      <select
        className="mt-2 w-full max-w-xs rounded bg-white px-2 py-1 text-xs capitalize text-black"
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
      <div className="absolute top-0 right-0">
        <button
          className={`flex h-4 w-4 items-center justify-center rounded-full bg-white text-black`}
          onClick={() => {
            updateProcedure(procedure.id, {
              ...procedure,
              input: procedure.input?.filter((input, j) => j !== i),
            });
          }}
        >
          -
        </button>
      </div>
      <span>Requirements</span>
      <div>
        <h1 className="py-1 text-sm font-light">Required</h1>
        <input
          className="mt-2 h-4 w-4 rounded bg-white text-black"
          type="checkbox"
          checked={input.inputObject.required}
          onChange={(e) => {
            updateProcedure(procedure.id, {
              ...procedure,
              input: procedure.input?.map((input, j) => {
                if (j === i) {
                  return {
                    ...input,
                    inputObject: {
                      ...input.inputObject,
                      required: e.target.checked,
                    },
                  };
                }
                return input;
              }),
            });
          }}
        />
      </div>
      {input.inputObject.typeRequirements?.map((typeRequirement, j) => {
        return (
          <div key={j}>
            <h1 className="py-1 text-sm font-light">{typeRequirement.name}</h1>
            <input
              className="mt-2 h-4 w-4 rounded bg-white text-black"
              type="checkbox"
              checked={typeRequirement.enabled}
              onChange={(e) => {
                updateProcedure(procedure.id, {
                  ...procedure,
                  input: procedure.input?.map((input, k) => {
                    if (k === i) {
                      return {
                        ...input,
                        inputObject: {
                          ...input.inputObject,
                          typeRequirements:
                            input.inputObject.typeRequirements?.map(
                              (typeRequirement, l) => {
                                if (l === j) {
                                  return {
                                    ...typeRequirement,
                                    enabled: e.target.checked,
                                  };
                                }
                                return typeRequirement;
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
        );
      })}
    </div>
  );
};

export default ProcedureInputField;

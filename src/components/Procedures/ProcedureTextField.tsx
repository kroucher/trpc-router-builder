import { Procedure } from "../../pages/generator";

const ProcedureTextInput = ({
  procedure,
  i,
  updateProcedure,
  title,
  purpose,
  isUnique,
}: {
  procedure: Procedure;
  i: number;
  updateProcedure: (i: number, procedure: Procedure) => void;
  title: string;
  purpose: string;
  isUnique?: boolean;
}) => {
  let inputValue = "";
  if (purpose === "name") {
    inputValue = procedure.name;
  } else if (purpose === "input") {
    inputValue = procedure.input?.find((i) => i.title === title)?.inputObject
      .type as string;
  } else if (purpose === "output") {
    inputValue = procedure.output || "";
  } else if (purpose === "typeName") {
    inputValue = procedure.input?.find((i) => i.title === title)
      ?.title as string;
  }

  return (
    <div className="group relative w-full max-w-sm bg-transparent">
      <input
        id={title}
        className={`peer my-2 w-full max-w-sm bg-transparent px-2 py-1 pt-4 text-sm text-white outline-none placeholder:text-transparent ${
          purpose === "name" && !isUnique ? "border-b-2 border-red-500" : ""
        }`}
        value={inputValue}
        onChange={(e) => {
          if (purpose === "name") {
            updateProcedure(i, {
              ...procedure,
              [purpose]: e.target.value,
            });
          } else if (purpose === "typeName") {
            updateProcedure(procedure.id, {
              ...procedure,
              input: procedure.input?.map((input, j) => {
                if (j === i) {
                  return {
                    ...input,
                    title: e.target.value,
                  };
                }
                return input;
              }),
            });
          }
        }}
      />

      <label
        htmlFor={title}
        className={`peer absolute top-0 cursor-text select-none py-1 text-sm font-semibold capitalize antialiased transition-all ease-in peer-placeholder-shown:bottom-0 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-empty:left-0 peer-placeholder-shown:peer-empty:translate-y-4 peer-focus:text-xs peer-focus:text-white peer-focus:opacity-100 peer-focus:peer-empty:peer-placeholder-shown:-translate-y-0.5`}
      >
        {title}
      </label>
      {purpose === "name" && !isUnique && (
        <span className="absolute right-0 bottom-2 text-xs text-red-200">
          Must be unique
        </span>
      )}
      <div className="absolute bottom-1 left-0 h-[1px] w-full bg-white peer-focus:h-[3px]"></div>
    </div>
  );
};

export default ProcedureTextInput;

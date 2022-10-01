import { Procedure } from "../../pages/generator";

const ProcedureSelectInput = ({
  procedure,
  i,
  updateProcedure,
  title,
  purpose,
  options,
}: {
  procedure: Procedure;
  i: number;
  updateProcedure: (i: number, procedure: Procedure) => void;
  title: string;
  purpose: string;
  options: string[];
}) => {
  let inputValue = "";
  if (purpose === "type") {
    inputValue = procedure.type;
  }
  return (
    <>
      <h1 className="py-1 text-sm font-light">{title}</h1>
      <select
        className="mt-2 w-full max-w-xs rounded bg-white px-2 py-1 text-xs capitalize text-black"
        value={inputValue}
        onChange={(e) => {
          updateProcedure(i, {
            ...procedure,
            [purpose]: e.target.value,
          });
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default ProcedureSelectInput;

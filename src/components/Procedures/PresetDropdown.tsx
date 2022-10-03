import { PresetProcedure } from "../../pages/generator";

const PresetDropdown = ({
  presetProcedures,
  setPresetProcedure,
}: {
  presetProcedures: PresetProcedure[];
  setPresetProcedure: (procedure: PresetProcedure) => void;
}) => {
  return (
    <div className="flex max-w-xs flex-col items-end justify-start text-sm lg:basis-1/2 lg:items-center">
      <h1 className="py-1 pr-2 text-xs font-bold lg:pr-4 lg:text-base">
        Preset:
      </h1>
      <select
        className="w-full rounded bg-white px-2 py-1 text-xs text-black lg:text-base"
        onChange={(e) => {
          const procedure = presetProcedures.find(
            (p) => p.name === e.target.value
          );
          if (procedure) {
            setPresetProcedure(procedure);
          }
        }}
      >
        <option value="">Select a preset</option>
        {presetProcedures.map((procedure) => (
          <option
            className="text-sm"
            key={procedure.name}
            value={procedure.name}
          >
            {procedure.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PresetDropdown;

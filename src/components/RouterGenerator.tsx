import { PresetProcedure, Procedure } from "../pages/generator";
import PresetDropdown from "./Procedures/PresetDropdown";
import Procedures from "./Procedures/Procedures";

const RouterGenerator = ({
  routerName,
  setRouterName,
  addProcedure,
  procedures,
  updateProcedure,
  removeProcedure,
  presetProcedures,
  setPresetProcedure,
}: {
  routerName: string;
  setRouterName: (routerName: string) => void;
  addProcedure: () => void;
  procedures: Procedure[];
  updateProcedure: (id: number, procedure: Procedure) => void;
  removeProcedure: (id: number) => void;
  presetProcedures: PresetProcedure[];
  setPresetProcedure: (procedure: PresetProcedure) => void;
}) => {
  return (
    <div className="flex w-full flex-col items-start justify-start px-6 lg:basis-1/2">
      <div className="flex w-full items-end justify-between lg:items-center">
        <h1 className="py-1 text-sm font-bold lg:text-lg ">Router Name</h1>
        <PresetDropdown
          presetProcedures={presetProcedures}
          setPresetProcedure={setPresetProcedure}
        />
      </div>
      <input
        className="mt-2 w-full max-w-sm rounded bg-white px-2 py-1 text-sm text-black"
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
  );
};

export default RouterGenerator;

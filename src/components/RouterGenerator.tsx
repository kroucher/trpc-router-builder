import { Switch } from "@headlessui/react";
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
  middleware,
  setMiddleware,
}: {
  routerName: string;
  setRouterName: (routerName: string) => void;
  addProcedure: () => void;
  procedures: Procedure[];
  updateProcedure: (id: number, procedure: Procedure) => void;
  removeProcedure: (id: number) => void;
  presetProcedures: PresetProcedure[];
  setPresetProcedure: (procedure: PresetProcedure) => void;
  middleware: boolean;
  setMiddleware: (middleware: boolean) => void;
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
      <div className="flex items-center pt-6">
        <span className="mr-3 text-sm">Middleware?</span>
        <Switch
          checked={middleware}
          onChange={setMiddleware}
          className={`${middleware ? "bg-slate-200" : "bg-slate-500"}
          relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${middleware ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-slate-900 shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
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

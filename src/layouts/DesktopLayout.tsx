import { Dispatch, SetStateAction } from "react";
import CodePreview from "../components/CodePreview";
import RouterGenerator from "../components/RouterGenerator";
import { PresetProcedure, Procedure } from "../pages/generator";

const DesktopLayout = ({
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
  setMiddleware: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex min-h-screen w-full items-start justify-between bg-slate-900 py-2 text-white">
      {/* preset dropdown */}

      <RouterGenerator
        routerName={routerName}
        setRouterName={setRouterName}
        addProcedure={addProcedure}
        procedures={procedures}
        updateProcedure={updateProcedure}
        removeProcedure={removeProcedure}
        presetProcedures={presetProcedures}
        setPresetProcedure={setPresetProcedure}
        middleware={middleware}
        setMiddleware={setMiddleware}
      />
      <CodePreview
        routerName={routerName}
        procedures={procedures}
        middleware={middleware}
      />
    </div>
  );
};

export default DesktopLayout;

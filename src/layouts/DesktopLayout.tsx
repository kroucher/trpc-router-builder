import CodePreview from "../components/CodePreview";
import RouterGenerator from "../components/RouterGenerator";
import { Procedure } from "../pages/generator";

const DesktopLayout = ({
  routerName,
  setRouterName,
  addProcedure,
  procedures,
  updateProcedure,
  removeProcedure,
}: {
  routerName: string;
  setRouterName: (routerName: string) => void;
  addProcedure: () => void;
  procedures: Procedure[];
  updateProcedure: (id: number, procedure: Procedure) => void;
  removeProcedure: (id: number) => void;
}) => {
  return (
    <div className="flex min-h-screen w-full items-start justify-between bg-slate-900 py-2 text-white">
      <RouterGenerator
        routerName={routerName}
        setRouterName={setRouterName}
        addProcedure={addProcedure}
        procedures={procedures}
        updateProcedure={updateProcedure}
        removeProcedure={removeProcedure}
      />
      <CodePreview routerName={routerName} procedures={procedures} />
    </div>
  );
};

export default DesktopLayout;

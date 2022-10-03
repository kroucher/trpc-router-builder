import { Procedure } from "../pages/generator";
import Procedures from "./Procedures/Procedures";

const RouterGenerator = ({
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
    <div className="flex w-full flex-col items-start justify-start px-6 lg:basis-1/2">
      <h1 className="py-1 text-lg font-bold ">Router Name</h1>
      <input
        className="mt-2 w-full rounded bg-white px-4 py-2 text-black"
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

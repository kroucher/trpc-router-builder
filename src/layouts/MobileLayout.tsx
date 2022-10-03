import { Tab } from "@headlessui/react";
import { ReactNode } from "react";
import CodePreview from "../components/CodePreview";
import RouterGenerator from "../components/RouterGenerator";
import { Procedure } from "../pages/generator";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MobileLayout = ({
  routerName,
  setRouterName,
  addProcedure,
  procedures,
  updateProcedure,
  removeProcedure,
}: {
  routerName: string;
  setRouterName: (routerName: string) => void;
  procedures: Procedure[];
  addProcedure: () => void;
  updateProcedure: (id: number, procedure: Procedure) => void;
  removeProcedure: (id: number) => void;
}) => {
  return (
    <Tab.Group>
      <Tab.List className="flex items-center p-4">
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          Generate
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              selected
                ? "bg-white shadow"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          Code Preview
        </Tab>
      </Tab.List>
      <Tab.Panels className="w-full">
        <Tab.Panel className="w-full">
          <RouterGenerator
            routerName={routerName}
            procedures={procedures}
            setRouterName={setRouterName}
            addProcedure={addProcedure}
            updateProcedure={updateProcedure}
            removeProcedure={removeProcedure}
          />
        </Tab.Panel>
        <Tab.Panel>
          <CodePreview routerName={routerName} procedures={procedures} />{" "}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default MobileLayout;

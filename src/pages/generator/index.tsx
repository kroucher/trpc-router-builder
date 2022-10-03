import { NextPage } from "next";
import { useState } from "react";
import CodePreview from "../../components/CodePreview";
import RouterGenerator from "../../components/RouterGenerator";
import DesktopLayout from "../../layouts/DesktopLayout";
import MobileLayout from "../../layouts/MobileLayout";

export type QueryTypes = "query" | "mutation" | "subscription";
export type Procedure = {
  id: number;
  type: QueryTypes;
  name: string;
  input?: Input[];
  output?: string;
  async: boolean;
};
export type Input = {
  id: number;
  inputObject: InputObject;
  title: string;
  purpose: string;
};

export type InputObject = {
  type: string;
  required?: boolean;
  optional?: boolean;
  typeRequirements?: TypeRequirement[];
  arrayOf?: string;
};

export type TypeRequirement = {
  name: string;
  option: TypeRequirementOption;
  enabled: boolean;
  value: string;
};

export type TypeRequirementOption =
  | "min"
  | "max"
  | "length"
  | "minDate"
  | "maxDate";

export type PresetProcedure = {
  id: number;
  name: string;
  procedure: Procedure;
};

const GeneratorPage: NextPage = () => {
  const [routerName, setRouterName] = useState("myRouter");
  const [procedures, setProcedures] = useState<Procedure[]>([
    {
      id: 0,
      type: "query",
      name: "myProcedure",
      input: [
        {
          id: 0,
          inputObject: {
            type: "string",
            required: true,
          },
          title: "input",
          purpose: "input",
        },
      ],
      output: "z.string()",
      async: false,
    },
  ]);

  const presetProcedures = [
    {
      id: 0,
      name: "Infinite Query",
      procedure: {
        id: 0,
        type: "query",
        name: "infiniteQuery",
        input: [
          {
            id: 0,
            inputObject: {
              type: "string",
              required: true,
            },
            title: "pageSize",
            purpose: "input",
          },
          {
            id: 1,
            inputObject: {
              type: "string",
              required: false,
            },
            title: "cursor",
            purpose: "input",
          },
        ],
        output: "z.string()",
        async: false,
      } as Procedure,
    },
    {
      id: 1,
      name: "Reset All Procedures",
      procedure: {
        id: 0,
        type: "query",
        name: "input",
        input: [
          {
            id: 0,
            inputObject: {
              type: "string",
              required: true,
            },
            title: "input",
            purpose: "input",
          },
        ],
        output: "z.string()",
        async: false,
      } as Procedure,
    },
  ];

  const setPresetProcedure = (procedure: PresetProcedure) => {
    setProcedures([procedure.procedure]);
  };

  const addProcedure = () => {
    setProcedures((prev) => [
      ...prev,
      {
        id: prev.length,
        type: "query",
        name: "myProcedure",
        inputObject: [
          {
            id: 0,
            input: {
              type: "string",
              required: true,
            },
            title: "Input",
            purpose: "input",
          },
        ],
        output: "z.string()",
        async: false,
      },
    ]);
  };

  const updateProcedure = (id: number, procedure: Procedure) => {
    const newProcedures = procedures.map((p) => {
      if (p.id === id) {
        return procedure;
      }
      return p;
    }) as Procedure[];
    setProcedures(newProcedures);
  };

  const removeProcedure = (id: number) => {
    setProcedures((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <main className="flex min-h-screen items-start justify-center bg-slate-900 py-2 text-white ">
      <div className="w-full lg:hidden">
        <MobileLayout
          routerName={routerName}
          procedures={procedures}
          setRouterName={setRouterName}
          addProcedure={addProcedure}
          updateProcedure={updateProcedure}
          removeProcedure={removeProcedure}
          presetProcedures={presetProcedures}
          setPresetProcedure={setPresetProcedure}
        />
      </div>
      <div className="hidden w-full lg:block">
        <DesktopLayout
          routerName={routerName}
          procedures={procedures}
          addProcedure={addProcedure}
          updateProcedure={updateProcedure}
          removeProcedure={removeProcedure}
          setRouterName={setRouterName}
          presetProcedures={presetProcedures}
          setPresetProcedure={setPresetProcedure}
        />
      </div>
    </main>
  );
};

export default GeneratorPage;

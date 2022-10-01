import { Procedure } from "../pages/generator";

export const generateCode = ({
  routerName,
  procedures,
}: {
  routerName: string;
  procedures: Procedure[];
}) => {
  const code = `export const ${routerName} = t.router({
            ${procedures
              .map(
                (p) => `${p.name}: t.procedure
                .input(
                    z.object({
                      ${
                        p.input
                          ? p.input
                              .map(
                                (i) =>
                                  `${i.title}: ${
                                    i.inputObject.type === "string"
                                      ? `z.string()${
                                          i.inputObject.required
                                            ? ""
                                            : ".nullable()"
                                        }`
                                      : i.inputObject.type === "number"
                                      ? `z.number()${
                                          i.inputObject.required
                                            ? ""
                                            : ".nullable()"
                                        }`
                                      : i.inputObject.type === "boolean"
                                      ? `z.boolean()${
                                          i.inputObject.required
                                            ? ""
                                            : ".nullable()"
                                        }`
                                      : i.inputObject.type === "date"
                                      ? "z.date()"
                                      : "z.string()"
                                  }`
                              )
                              .join(",\n                      ")
                          : ""
                      }
                    }),
                )
                .${p.type.toLowerCase()}(${
                  p.async ? "async " : ""
                }({ input }) => {

                    //Your Code Here

                    return {}
                })`
              )
              .join(",\n           ")}
        })`;
  return code;
};

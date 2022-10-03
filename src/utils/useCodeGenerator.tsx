import { Procedure } from "../pages/generator";

const procedureInput = (
  title: string,
  type: string,
  arrayOf?: string
): { result: string } => {
  switch (type) {
    case "string":
      return {
        result: `z.string()`,
      };
    case "number":
      return {
        result: `z.number()`,
      };
    case "boolean":
      return {
        result: `z.boolean()`,
      };
    case "array":
      if (arrayOf) {
        return {
          result: `z.array(${procedureInput(title, arrayOf).result})`,
        };
      } else {
        return {
          result: `z.array(z.string())`,
        };
      }
    case "object":
      return {
        result: `z.object()`,
      };
    default:
      return {
        result: `z.string()`,
      };
  }
};

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
                                  `${i.title}: ` +
                                  procedureInput(
                                    i.title,
                                    i.inputObject.type,
                                    i.inputObject?.arrayOf
                                  ).result
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

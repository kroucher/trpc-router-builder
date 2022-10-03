import { Procedure } from "../pages/generator";

const procedureInput = (
  title: string,
  type: string,
  arrayOf?: string,
  objectEntries: { key: string; value: string }[] = []
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
        result: `z.object({
                          ${objectEntries
                            .map(
                              (entry) =>
                                `${entry.key}: ${
                                  procedureInput(title, entry.value).result
                                },
                          `
                            )
                            .join("")}})`,
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
  middleware,
}: {
  routerName: string;
  procedures: Procedure[];
  middleware: boolean;
}) => {
  console.log(procedures);
  const precode = `
import { z } from "zod";
import { initTRPC } from '@trpc/server';

export const t = initTRPC.create();
`;

  const middlware = `
const inputSchema = z.object({ userId: z.string() });
  
const isUserIdChecked = t.middleware(async ({ next, rawInput, ctx }) => {
  const result = inputSchema.safeParse(rawInput);
  if (!result.success) {
    throw new TRPCError({ code: 'BAD_REQUEST' });
  }
  const { userId } = result.data;
  // Check user id auth
  return next({
    ctx: { 
      userId,
    },
  });
});

export const userProtectedProcedure = t.procedure.use(isUserIdChecked);

`;

  const code = `export const ${routerName} = t.router({
            ${
              middleware
                ? `userId: userProtectedProcedure
                .input(inputSchema)
                .query(({ ctx }) => ctx.userId),`
                : `${procedures
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
                                    i.inputObject?.arrayOf,
                                    i.inputObject?.objectEntries || []
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
                    .join(",\n           ")}`
            }
        })`;
  return precode + (middleware ? middlware : "") + code;
};

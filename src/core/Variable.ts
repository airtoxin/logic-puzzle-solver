export const createVariable = (v: string | number): Variable =>
  typeof v === "string" ? createBooleanVariable(v) : createNumberVariable(v);

export const createBooleanVariable = (name: string) => ({
  type: "boolean" as const,
  name
});

export const createNumberVariable = (num: number) => ({
  type: "number" as const,
  num
});

export type Variable = ReturnType<
  typeof createBooleanVariable | typeof createNumberVariable
>;

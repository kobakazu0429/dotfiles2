export const os = () => {
  const { os, arch } = Deno.build;
  if (os === "darwin" && arch === "x86_64") return "intel_mac";
  else if (os === "darwin" && arch === "aarch64") return "m1_mac";
  else if (os === "linux" && arch === "x86_64") return "ubuntu";

  throw new Error("Not support os / arch");
};

export type OS = ReturnType<typeof os>;

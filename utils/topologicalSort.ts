import type { Module as ModularModule } from "./modular.ts";
type Module = Pick<ModularModule, "name" | "needs">;

export const topologicalSort = <T extends Module>(inputs: T[]): T[] => {
  type ModName = string;
  const adjacencyList: Record<ModName, ModName[]> = {};

  type InDegreeCount = number;
  const inDegree: Record<ModName, InDegreeCount> = {};

  const _inputs = inputs.toSorted((a, b) => a.name.localeCompare(b.name));

  for (const mod of _inputs) {
    adjacencyList[mod.name] = [];
    inDegree[mod.name] = 0;
  }

  for (const mod of _inputs) {
    for (const need of mod.needs) {
      adjacencyList[need].push(mod.name);
      inDegree[mod.name]++;
    }
  }

  const sortedMods: T[] = [];
  const queue: string[] = [];

  for (const mod of _inputs) {
    if (inDegree[mod.name] === 0) {
      queue.push(mod.name);
    }
  }

  let currentModName: ModName | undefined = undefined;
  while ((currentModName = queue.shift())) {
    const currentMod = _inputs.find((mod) => mod.name === currentModName);
    if (!currentMod) {
      throw new Error(`Mod(name=${currentModName}') not found in inputs.`);
    }

    sortedMods.push(currentMod);

    for (const neighbor of adjacencyList[currentModName]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (sortedMods.length !== _inputs.length) {
    throw new Error("Graph contains cycles!");
  }

  return sortedMods;
};

export const exists = (path: string): boolean => {
  try {
    Deno.statSync(path);
    return true;
  } catch (_e: unknown) {
    return false;
  }
};

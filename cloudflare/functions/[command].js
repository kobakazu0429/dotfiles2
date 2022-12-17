const BASE = "https://kobakazu0429.github.io/dotfiles2/"

const join = (path) => {
  return new URL(path, BASE).toString();
}

const commandMap = {
  "install": join(("install")),
};

export const onRequestGet = async (context) => {
  const { command } = context.params
  const url = commandMap[command];
  if (!url) return new Response("Not Found");
  const res = await fetch(url);
  return new Response(await res.arrayBuffer());
};

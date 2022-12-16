const BASE = "https://raw.githubusercontent.com/kobakazu0429/dotfiles2/master/"

const join = (path) => {
  return new URL(path, BASE).toString();
}

const commandMap = {
  "install": join(("README.md");
};

export const onRequestGet = async (context) => {
  const { command } = context.params
  const url = commandMap[command];
  if (!url) return new Response("Not Found");
  const res = await fetch(url);
  return new Response(await res.arrayBuffer());
};

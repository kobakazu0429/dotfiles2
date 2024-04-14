const FILE_BASE =
  "https://raw.githubusercontent.com/kobakazu0429/dotfiles2/master/";
const BINARY_BASE = "https://kobakazu0429.github.io/dotfiles2/";

const joinBinary = (path) => {
  return new URL(path, BINARY_BASE).toString();
};
const joinFile = (path) => {
  return new URL(path, FILE_BASE).toString();
};

const commandMap = {
  install: joinFile("install"),
  "install_x86_64-apple-darwin": joinBinary("install_x86_64-apple-darwin"),
  "install_aarch64-apple-darwin": joinBinary("install_aarch64-apple-darwin"),
};

export const onRequestGet = async (context) => {
  const { command } = context.params;
  const url = commandMap[command];
  if (!url) return new Response("Not Found");
  const res = await fetch(url);
  return new Response(await res.arrayBuffer());
};

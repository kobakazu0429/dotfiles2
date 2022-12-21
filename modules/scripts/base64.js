const { spawn } = require("child_process")

function pbcopy(data) {
  const { stdin } = spawn("pbcopy");
  stdin.write(data);
  stdin.end();
}
const [, , raw] = process.argv;

try {
  const url = new URL(raw)
  url.searchParams.forEach(param => {
    const decoded = Buffer.from(param, "base64").toString("utf8");
    if (decoded.startsWith("http")) {
      console.log(decoded);
      pbcopy(decoded);
      process.exit(0);
    }
  });
} catch {
  const decoded = Buffer.from(raw, "base64").toString("utf8");
  console.log(decoded);
  pbcopy(decoded);
}

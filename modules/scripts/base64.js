function pbcopy(data) {
  const { stdin } = require("child_process").spawn("pbcopy");
  stdin.write(data);
  stdin.end();
}

const [, , raw] = process.argv;

const url = new URL(raw)
url.searchParams.forEach(param => {
  const decoded = Buffer.from(param, "base64").toString("utf8");
  if (decoded.startsWith("http")) {
    console.log(decoded);
    pbcopy(decoded);
    process.exit(0);
  }
});

const decoded = Buffer.from(raw, "base64").toString("utf8");
console.log(decoded);
pbcopy(decoded);

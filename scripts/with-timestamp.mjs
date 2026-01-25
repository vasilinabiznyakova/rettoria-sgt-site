import readline from "node:readline";

const label = process.argv[2] ?? "";
const reset = "\x1b[0m";

const COLORS = {
  WEB: "\x1b[32m", // green
  STUDIO: "\x1b[34m", // blue
};

const color = COLORS[label.replace(/\[|\]/g, "")] ?? "";

const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
  const ts = new Date()
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d{3}Z$/, "");

  process.stdout.write(`${color}[${ts}] ${label}${reset} ${line}\n`);
});

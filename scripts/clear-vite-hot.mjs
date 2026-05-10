import { existsSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

const hotFile = resolve(process.cwd(), "public/hot");

if (existsSync(hotFile)) {
  unlinkSync(hotFile);
  console.log("Removed stale public/hot so Laravel uses built assets.");
}

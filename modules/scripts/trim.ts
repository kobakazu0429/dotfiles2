#!/usr/bin/env -S deno run

import { TextLineStream } from "jsr:@std/streams";

const lines = Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

for await (const line of lines) {
  console.log(line.trim());
}

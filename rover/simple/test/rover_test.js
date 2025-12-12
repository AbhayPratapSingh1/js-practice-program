import { executeInstructions } from "../src/rover.js";
import { assertEquals } from "@std/assert";

Deno.test("A simple No movement Test", () => {
  assertEquals(executeInstructions("0 0 N", ""), "0 0 N");
});

Deno.test("A simple test", () => {
  assertEquals(executeInstructions("0 0 N", "M"), "0 1 N");
});

Deno.test("rotaion 4 movement", () => {
  assertEquals(executeInstructions("0 0 N", "LLLL"), "0 0 N");
});

Deno.test("rotaion 3 times Left movement", () => {
  assertEquals(executeInstructions("0 0 N", "LLL"), "0 0 E");
});

Deno.test("rotaion 7 times Left movement", () => {
  assertEquals(executeInstructions("0 0 N", "LLLLLLL"), "0 0 E");
});
Deno.test("rotaion 4 R movement", () => {
  assertEquals(executeInstructions("0 0 N", "RRRR"), "0 0 N");
});

Deno.test("rotaion 3 times Right movement", () => {
  assertEquals(executeInstructions("0 0 N", "RRR"), "0 0 W");
});

Deno.test("rotaion 7 times Right movement", () => {
  assertEquals(executeInstructions("0 0 N", "RRRRRRR"), "0 0 W");
});

Deno.test("1 movement ", () => {
  assertEquals(executeInstructions("0 0 N", "LM"), "-1 0 W");
});

Deno.test("2 movement ", () => {
  assertEquals(executeInstructions("0 0 N", "LMM"), "-2 0 W");
});

Deno.test("2,2 movement ", () => {
  assertEquals(executeInstructions("0 0 N", "LMMRMM"), "-2 2 N");
});

Deno.test("2,2,2,2 movement ", () => {
  assertEquals(executeInstructions("0 0 N", "LMMRMMLMMRMM"), "-4 4 N");
});

Deno.test("Given test", () => {
  assertEquals(
    executeInstructions("0 0 E", "LMRMMMR", "LMMRMMLMMRMM"),
    "3 1 S",
  );
});

Deno.test("Move rover Left Move", () => {
  assertEquals(
    moveRover(""),
  );
});

import { createRover } from "../src/rover.js";
import { assertEquals } from "@std/assert";

Deno.test("Create Rover", () => {
  assertEquals(createRover(), { x: 0, y: 0, orientation: "E" });
});

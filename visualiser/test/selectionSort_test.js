import { assertEquals } from "@std/assert";
import { seletionSort } from "../src/selection-sort.js";

Deno.test("Simple sort test", () => {
  assertEquals(seletionSort([4, 3, 5, 6, 7, 2, 1]), [1, 2, 3, 4, 5, 6, 7]);
});

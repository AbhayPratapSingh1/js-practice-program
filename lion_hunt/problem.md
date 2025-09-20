# 🦁🦓 Lion Hunt

## Story

Out on the savannah, lions (`"L"`) are on the lookout for their next meal. Zebras (`"Z"`) graze peacefully, but they know danger could be close!

Your mission is to help the lions decide **which zebra is closest to them**.

We are given a string where:

* `"L"` = a lion
* `"Z"` = a zebra
* `" "` (space) = an empty patch of land

Your task: **find the shortest number of spaces between any lion and any zebra**.

---

## Requirements

1. **Input**: a string made up of `"L"`, `"Z"`, and `" "` characters.
2. **Output**:

   * The **minimum number of spaces** between a lion and a zebra (this represents the zebra most likely to be hunted).
   * If there are no lions or no zebras, return `-1`.

---

## Examples

### Example 1

```js
Input:  "L  ZL Z"
Output: 0
```

Explanation:

* First lion (`L`) sees a zebra (`Z`) two spaces away.
* A zebra next to another lion has **0 spaces** (that zebra is in big trouble!).
* Another lion and zebra are 1 space apart.
  👉 The closest hunt is at a distance of **0**.

---

### Example 2

```js
Input:  "L     Z"
Output: 5
```

Explanation: Only one lion and one zebra → 5 spaces apart. The lion will go after this zebra.

---

### Example 3

```js
Input:  "L     L"
Output: -1
```

Explanation: The lions are looking around… but there are **no zebras to hunt**.

---

### Example 4

```js
Input:  "Z   Z   Z"
Output: -1
```

Explanation: The zebras are safe! No lions around.

---

## Constraints

* The string length will be at most **100 characters**.
* The string only contains `"L"`, `"Z"`, and `" "` (spaces).

  * Use **loops**, **if statements**, and **variables** to solve it.

---

## Test Cases to Try

| Input         | Expected Output |
| ------------- | --------------- |
| `"LZ"`        | 0               |
| `"Z L"`       | 1               |
| `"L     Z"`   | 5               |
| `"L     L"`   | -1              |
| `"Z   Z   Z"` | -1              |
| `"L  ZL Z"`   | 0               |
| `""`          | 0               |
| `"LZ  L Z"`   | 1               |
| `"L  Z  L"`   | 2               |

---

Come up with more test cases  before you solve the problem!

## **Problem: Shortest Distance Between Two Vowels**

Write a program that takes a single word (string) as input and finds the **shortest distance between any two vowels** in the word.

* **Distance** is defined as the absolute difference between the **positions (indices)** of two vowels in the string.
* If the word contains **fewer than two vowels**, print `-1`.
* Consider only lowercase letters (`a, e, i, o, u`) as vowels.
* Indices start from `0` (first character is at position 0).

---

### **Examples**

| Input     | Output | Explanation                                               |
| --------- | ------ | --------------------------------------------------------- |
| hello     | 3      | Vowels: e at index 1, o at index 4 → distance = 4 − 1 = 3 |
| apple     | 4      | Vowels: a at index 0, e at index 4 → distance = 4         |
| strength  | -1     | Only one vowel (`e`) → output -1                          |
| beautiful | 1      | Vowels: e at 1, a at 2 → distance = 1                     |
| abyss     | -1     | Only one vowel (`a`) → output -1                          |

---

### **Constraints**

* Input will be a single word containing only lowercase English letters.
* Word length ≤ 1000 characters.

---

const first = (x) => (y) => y;
const second = (x) => (y) => x;

const not = (f) => f(first)(second);
const or = (f) => (g) => f(f)(g);
const and = (f) => (g) => f(g)(f);

const add = (f) => (f2) => (f3) => (v) => f2(f3)(f(f3)(v));

const zero = (f) => (g) => first(f)(g);
const one = (f) => (v) => first()(f(v));
const two = (f) => (v) => f(one(f)(v));
const three = (f) => (v) => f(two(f)(v));
const four = (f) => (v) => f(three(f)(v));

const toInt = (num) => num((x) => x + 1)(0);
